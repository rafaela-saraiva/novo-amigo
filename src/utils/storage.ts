'use client'
import { Animal } from '@/Models/Pet';

const STORAGE_KEY = 'novo_amigo_animais';

export const storageUtils = {
  // Salvar animais no localStorage
  saveAnimals: (animals: Animal[]): void => {
    try {
      if (typeof window !== 'undefined') {
        const serialized = JSON.stringify(animals);
        localStorage.setItem(STORAGE_KEY, serialized);
        console.log('Animais salvos no localStorage:', animals.length);
      }
    } catch (error) {
      console.error('Erro ao salvar animais no localStorage:', error);
      // Fallback para cookies se localStorage falhar
      try {
        const serialized = encodeURIComponent(JSON.stringify(animals));
        const expires = new Date();
        expires.setDate(expires.getDate() + 30); // 30 dias
        document.cookie = `${STORAGE_KEY}=${serialized}; path=/; expires=${expires.toUTCString()}; SameSite=Lax; Secure`;
      } catch (cookieError) {
        console.error('Erro ao salvar no cookie também:', cookieError);
      }
    }
  },

  // Carregar animais do localStorage
  loadAnimals: (): Animal[] => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed)) {
            console.log('Animais carregados do localStorage:', parsed.length);
            return parsed;
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar do localStorage:', error);
    }

    // Fallback para cookies se localStorage falhar
    try {
      if (typeof document !== 'undefined') {
        const match = document.cookie.split('; ').find((c) => c.startsWith(`${STORAGE_KEY}=`));
        if (match) {
          const raw = match.split('=')[1];
          const parsed = JSON.parse(decodeURIComponent(raw));
          if (Array.isArray(parsed)) {
            console.log('Animais carregados do cookie (fallback):', parsed.length);
            // Migrar para localStorage
            storageUtils.saveAnimals(parsed);
            return parsed;
          }
        }
      }
    } catch (error) {
      console.error('Erro ao carregar do cookie:', error);
    }

    return [];
  },

  // Adicionar um animal
  addAnimal: (animal: Animal): Animal[] => {
    const currentAnimals = storageUtils.loadAnimals();
    const newAnimals = [...currentAnimals, animal];
    storageUtils.saveAnimals(newAnimals);
    return newAnimals;
  },

  // Remover um animal
  removeAnimal: (animalId: number): Animal[] => {
    const currentAnimals = storageUtils.loadAnimals();
    const filteredAnimals = currentAnimals.filter(animal => animal.id !== animalId);
    storageUtils.saveAnimals(filteredAnimals);
    return filteredAnimals;
  },

  // Atualizar um animal
  updateAnimal: (updatedAnimal: Animal): Animal[] => {
    const currentAnimals = storageUtils.loadAnimals();
    const updatedAnimals = currentAnimals.map(animal => 
      animal.id === updatedAnimal.id ? updatedAnimal : animal
    );
    storageUtils.saveAnimals(updatedAnimals);
    return updatedAnimals;
  },

  // Limpar todos os dados
  clearAnimals: (): void => {
    try {
      if (typeof window !== 'undefined') {
        localStorage.removeItem(STORAGE_KEY);
      }
      if (typeof document !== 'undefined') {
        document.cookie = `${STORAGE_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
      }
      console.log('Dados limpos');
    } catch (error) {
      console.error('Erro ao limpar dados:', error);
    }
  },

  // Verificar se há dados salvos
  hasStoredData: (): boolean => {
    const animals = storageUtils.loadAnimals();
    return animals.length > 0;
  }
};