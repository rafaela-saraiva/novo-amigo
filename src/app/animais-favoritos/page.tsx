"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useFavorites } from "@/contexts/FavoritesContext";
import { useAuth } from "@/hooks/useAuth";
import { Pet } from "@/Models/Pet";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function AnimaisFavoritos() {
  const router = useRouter();
  const { user } = useAuth();
  const { favoritedIds, toggleFavorite, refreshFavorites } = useFavorites();

  const [favoritos, setFavoritos] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [modoRemover, setModoRemover] = useState(false);

  useEffect(() => {
    async function carregarFavoritos() {
      if (!user) {
        setFavoritos([]);
        setLoading(false);
        return;
      }
      try {
        const res = await api.get('/favorites');
        const animais = (res.data as { animal: Pet }[]).map((f) => f.animal);
        setFavoritos(animais);
      } catch {
        setFavoritos([]);
      } finally {
        setLoading(false);
      }
    }
    carregarFavoritos();
  }, [user, favoritedIds]);

  async function confirmarRemocao() {
    const idsParaRemover = selecionados.map((idx) => Number(favoritos[idx]?.id)).filter(Boolean);

    for (const animalId of idsParaRemover) {
      await toggleFavorite(animalId);
    }

    await refreshFavorites();
    setSelecionados([]);
    setModoRemover(false);
  }

  function selecionarAnimal(index: number) {
    setSelecionados((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }

  return (
    <>
      <Header />
    
      <main className={styles.main}>
        <div className={styles.container}>
          
          <h1>Meus Favoritos</h1>

          {!user && (
            <p>Faça login para ver seus animais favoritos.</p>
          )}

          {user && loading && (
            <p>Carregando favoritos...</p>
          )}

          {user && !loading && favoritos.length === 0 && (
            <p>Você ainda não tem animais favoritos.</p>
          )}

          {favoritos.length > 0 && (
            <>
              {!modoRemover ? (
                <button
                  className={styles.topBtn}
                  onClick={() => setModoRemover(true)}
                >
                  Remover
                </button>
              ) : (
                <button
                  className={styles.topBtn}
                  onClick={confirmarRemocao}
                >
                  Confirmar remoção
                </button>
              )}

              {/* GRID DE CARDS */}
              <div className={styles.grid}>
                {favoritos.map((animal, index) => (
                  <article key={index} className={styles.card}>
                    
                    {modoRemover && (
                      <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={selecionados.includes(index)}
                        onChange={() => selecionarAnimal(index)}
                      />
                    )}

                    <img
                      src={
                      Array.isArray(animal.foto)
                      ? animal.foto[0]
                      : Array.isArray(animal.imagem)
                      ? animal.imagem[0]
                      : animal.foto || animal.imagem || "/placeholder.svg"
                    }
                     alt={animal.nome}
                    className={styles.cardImage}
                    />

                    <div className={styles.cardContent}>
                      <h2>{animal.nome}</h2>

                      <div className={styles.tags}>
                        <span className={styles.tag}>
                          {animal.especie}
                        </span>
                        <span className={styles.tag}>
                          {animal.porte}
                        </span>
                      </div>

                      

                      {animal.disponivel && (
                        <span className={styles.badge}>
                          Disponível
                        </span>
                      )}

                      {!modoRemover && animal.id && (
                        <button
                          className={styles.btn}
                          onClick={() =>
                            router.push(`/animal/${animal.id}`)
                          }
                          
                        >
                          Ver detalhes
                        </button>
                        
                      )}
                    </div>
                    
                  </article>
                  
                ))}
              </div>
            </>
            
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
 
 
 