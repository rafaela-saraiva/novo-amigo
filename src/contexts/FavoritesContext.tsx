'use client';

import { useAuth } from '@/hooks/useAuth';
import api from '@/services/api';
import { createContext, useCallback, useContext, useEffect, useState } from 'react';

interface FavoritesContextType {
  favoritedIds: Set<number>;
  loading: boolean;
  isFavorited: (animalId: number) => boolean;
  toggleFavorite: (animalId: number) => Promise<boolean>;
  refreshFavorites: () => Promise<void>;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { user, token } = useAuth();
  const [favoritedIds, setFavoritedIds] = useState<Set<number>>(new Set());
  const [loading, setLoading] = useState(false);

  const refreshFavorites = useCallback(async () => {
    if (!user || !token) {
      setFavoritedIds(new Set());
      return;
    }

    try {
      setLoading(true);
      const res = await api.get('/favorites');
      const ids = (res.data as { animalId: number }[]).map((f) => f.animalId);
      setFavoritedIds(new Set(ids));
    } catch {
      setFavoritedIds(new Set());
    } finally {
      setLoading(false);
    }
  }, [user, token]);

  useEffect(() => {
    refreshFavorites();
  }, [refreshFavorites]);

  const isFavorited = useCallback(
    (animalId: number) => favoritedIds.has(animalId),
    [favoritedIds],
  );

  const toggleFavorite = useCallback(
    async (animalId: number): Promise<boolean> => {
      if (!user || !token) return false;

      const wasFavorited = favoritedIds.has(animalId);

      // Optimistic update
      setFavoritedIds((prev) => {
        const next = new Set(prev);
        if (wasFavorited) {
          next.delete(animalId);
        } else {
          next.add(animalId);
        }
        return next;
      });

      try {
        if (wasFavorited) {
          await api.delete(`/favorites/${animalId}`);
        } else {
          await api.post('/favorites', { animalId });
        }
        return !wasFavorited;
      } catch {
        // Revert on failure
        setFavoritedIds((prev) => {
          const next = new Set(prev);
          if (wasFavorited) {
            next.add(animalId);
          } else {
            next.delete(animalId);
          }
          return next;
        });
        return wasFavorited;
      }
    },
    [user, token, favoritedIds],
  );

  return (
    <FavoritesContext.Provider value={{ favoritedIds, loading, isFavorited, toggleFavorite, refreshFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext);
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider');
  return ctx;
}
