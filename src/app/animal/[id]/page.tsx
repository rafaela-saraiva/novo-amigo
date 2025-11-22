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
              <div className={styles.profileHeader}>
                <div className={styles.titleSection}>
                  <h1 className={styles.animalName}>{animal.nome}</h1>
                  <div className={styles.tags}>
                    <span className={`${styles.tag} ${styles.tagEspecie}`}>{animal.especie}</span>
                    {animal.raca && <span className={styles.tag}>{animal.raca}</span>}
                    <span className={styles.tag}>{animal.porte}</span>
                  </div>
                </div>
                {animal.disponivel && (
                  <div className={styles.statusBadge}>
                    <span className={styles.statusIcon}>✓</span>
                    Disponível
                  </div>
                )}
              </div>

              <div className={styles.content}>
                <div className={styles.imageSection}>
                  <div className={styles.imageWrap}>
                    <img
                      src={animal.foto || animal.imagem || '/placeholder.svg'}
                      alt={animal.nome}
                      className={styles.image}
                    />
                  </div>
                </div>

                <div className={styles.infoSection}>
                  <h2 className={styles.sectionTitle}>Informações</h2>
                  <div className={styles.infoGrid}>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Idade</span>
                      <span className={styles.infoValue}>{animal.idade}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Sexo</span>
                      <span className={styles.infoValue}>{animal.sexo}</span>
                    </div>
                    <div className={styles.infoItem}>
                      <span className={styles.infoLabel}>Cidade</span>
                      <span className={styles.infoValue}>{animal.cidade || animal.donoEndereco || '—'}</span>
                    </div>
                  </div>
                  
                  {(animal.vacinado || animal.castrado) && (
                    <div className={styles.features}>
                      {animal.vacinado && (
                        <div className={styles.feature}>
                          <span className={styles.featureIcon}>💉</span>
                          <span>Vacinado</span>
                        </div>
                      )}
                      {animal.castrado && (
                        <div className={styles.feature}>
                          <span className={styles.featureIcon}>✂️</span>
                          <span>Castrado</span>
                        </div>
                      )}
                    </div>
                  )}
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
