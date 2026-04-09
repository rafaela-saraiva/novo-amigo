'use client';

import AnimalCard from "@/components/AnimalCard";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import { Pet } from "@/Models/Pet";
import api from "@/services/api";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

type Shelter = {
  id: number;
  nome: string;
  responsavel?: string | null;
  urlImage?: string[] | null;
};

export default function OngProfilePage() {
  const params = useParams();
  const idRaw = params?.id as string | undefined;
  const shelterId = useMemo(() => Number(idRaw), [idRaw]);

  const [loading, setLoading] = useState(true);
  const [shelter, setShelter] = useState<Shelter | null>(null);
  const [pets, setPets] = useState<Pet[]>([]);

  useEffect(() => {
    if (!Number.isFinite(shelterId) || shelterId <= 0) return;

    async function load() {
      try {
        setLoading(true);

        let shelterData: Shelter | null = null;
        try {
          const res = await api.get(`/shelters/${shelterId}`);
          shelterData = res.data as Shelter;
        } catch (err: unknown) {
          const axiosLike = err as { response?: { status?: number } };
          if (axiosLike?.response?.status === 401) {
            shelterData = null;
          } else if (axiosLike?.response?.status !== 404) {
            throw err;
          }

          if (!shelterData) {
            // tenta obter via lista (pode ser protegida também)
            try {
              const list = await api.get("/shelters");
              const found = (Array.isArray(list.data) ? list.data : []).find((s: unknown) => {
                const rec = s as Partial<{ id: unknown }>;
                return Number(rec?.id) === shelterId;
              });
              shelterData = found ? (found as Shelter) : null;
            } catch {
              shelterData = null;
            }
          }
        }

        if (shelterData) {
          shelterData = {
            ...shelterData,
            responsavel: shelterData.responsavel ?? null,
            urlImage: shelterData.urlImage ?? null,
          };
        }

        setShelter(shelterData);

        const petsRes = await api.get(`/animals?shelterId=${shelterId}`).catch(() => ({ data: [] }));
        const petList = Array.isArray(petsRes.data) ? (petsRes.data as Pet[]) : [];
        setPets(petList);

        // se /shelters for protegido, deriva nome/fotos/descrição do payload do animal
        if (!shelterData && petList.length > 0) {
          const first = petList[0] as unknown as Partial<{
            shelter: { nome?: string; urlImage?: string[]; responsavel?: string };
            ong: { nome?: string; urlImage?: string[]; responsavel?: string };
          }>;
          setShelter({
            id: shelterId,
            nome: first.shelter?.nome || first.ong?.nome || `ONG #${shelterId}`,
            responsavel: first.shelter?.responsavel || first.ong?.responsavel || null,
            urlImage: first.shelter?.urlImage || first.ong?.urlImage || null,
          });
        }
      } catch (err) {
        console.error(err);
        setShelter(null);
        setPets([]);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [shelterId]);

  if (!Number.isFinite(shelterId) || shelterId <= 0) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <p className={styles.muted}>ONG inválida.</p>
        </main>
        <Footer />
      </div>
    );
  }

  const photos = Array.isArray(shelter?.urlImage) ? shelter!.urlImage!.filter(Boolean).slice(0, 5) : [];
  const desc = (shelter?.responsavel || "").trim();

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        {loading ? (
          <LoadingState title="Carregando ONG..." subtitle="Buscando os dados da organização" />
        ) : !shelter ? (
          <p className={styles.muted}>ONG não encontrada.</p>
        ) : (
          <>
            <section className={styles.hero}>
              <div className={styles.heroLeft}>
                <h1 className={styles.title}>{shelter.nome}</h1>
                <p className={styles.desc}>{desc || "Sem descrição."}</p>
              </div>

              <div className={styles.heroRight}>
                {photos.length > 0 ? (
                  <div className={styles.photoGrid}>
                    {photos.map((p, i) => (
                      <div key={`${p}-${i}`} className={styles.photoItem}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img src={p} alt={`foto ${i + 1}`} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className={styles.heroPlaceholder}>
                    <span className="material-symbols-outlined">pets</span>
                    <span>Sem fotos</span>
                  </div>
                )}
              </div>
            </section>

            <section className={styles.petsSection}>
              <h2 className={styles.sectionTitle}>Pets cadastrados</h2>

              {pets.length === 0 ? (
                <p className={styles.muted}>Nenhum pet cadastrado por esta ONG.</p>
              ) : (
                <div className={styles.petsGrid}>
                  {pets.map((p) => (
                    <AnimalCard key={String(p.id)} animal={p} />
                  ))}
                </div>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
