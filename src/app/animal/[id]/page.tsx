"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Pet } from '@/Models/Pet';
import api from "@/services/api";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function AnimalProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [animal, setAnimal] = useState<Pet | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    async function load() {
      try {
        setLoading(true);
        const res = await api.get(`/animals/${id}`);
        setAnimal(res.data);
      } catch (err) {
        console.error(err);
        setError("Erro ao carregar o perfil do animal.");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [id]);

  return (
    <>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <button className={styles.backBtn} onClick={() => router.back()}>
            ← voltar
          </button>

          {loading && <p>Carregando perfil...</p>}

          {error && <p className={styles.error}>{error}</p>}

          {!loading && !error && animal && (
            <article className={styles.profile}>
              <header className={styles.header}>
                <h1>{animal.nome}</h1>
                <div className={styles.meta}>
                  <span className={styles.tag}>{animal.especie}</span>
                  {animal.raca && <span className={styles.tag}>{animal.raca}</span>}
                  <span className={styles.tag}>{animal.porte}</span>
                </div>
              </header>

              <div className={styles.top}> 
                <div className={styles.imageWrap}>
                  <img
                    src={animal.foto || animal.imagem || '/placeholder.svg'}
                    alt={animal.nome}
                    className={styles.image}
                  />
                </div>

                <div className={styles.info}>
                  <p><strong>Idade:</strong> {animal.idade}</p>
                  <p><strong>Sexo:</strong> {animal.sexo}</p>
                  <p><strong>Cidade:</strong> {animal.cidade || animal.donoEndereco || '—'}</p>
                  <p><strong>Disponível:</strong> {animal.disponivel ? 'Sim' : 'Não'}</p>
                  {animal.vacinado && <p>✅ Vacinado</p>}
                  {animal.castrado && <p>✅ Castrado</p>}
                </div>
              </div>

              {animal.descricao && (
                <section className={styles.description}>
                  <h2>Sobre</h2>
                  <p>{animal.descricao}</p>
                </section>
              )}

              <footer className={styles.footerActions}>
                <a href={`mailto:${animal.donoNome || ''}`} className={styles.contactBtn}>
                  Entrar em contato
                </a>
              </footer>
            </article>
          )}
        </div>
      </main>

      <Footer />
    </>
  );
}
