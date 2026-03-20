"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Pet } from "@/Models/Pet";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function AnimaisFavoritos() {
  const router = useRouter();

  const [favoritos, setFavoritos] = useState<Pet[]>([]);
  const [selecionados, setSelecionados] = useState<number[]>([]);
  const [modoRemover, setModoRemover] = useState(false);

  useEffect(() => {
    const dados = JSON.parse(localStorage.getItem("favoritos") || "[]");
    setFavoritos(dados);
  }, []);

  function selecionarAnimal(index: number) {
    setSelecionados((prev) =>
      prev.includes(index)
        ? prev.filter((i) => i !== index)
        : [...prev, index]
    );
  }

  function confirmarRemocao() {
    const novaLista = favoritos.filter(
      (_, index) => !selecionados.includes(index)
    );

    setFavoritos(novaLista);
    localStorage.setItem("favoritos", JSON.stringify(novaLista));
    setSelecionados([]);
    setModoRemover(false);
  }

  return (
    <>
      <Header />
    
      <main className={styles.main}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            ← voltar
          </button>
          <h1>Meus Favoritos</h1>

          {favoritos.length === 0 && (
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
                        animal.foto ||
                        animal.imagem ||
                        "/placeholder.svg"
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
 
 
 