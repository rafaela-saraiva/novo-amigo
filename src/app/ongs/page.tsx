'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import api from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import styles from "./styles.module.css";

type Shelter = {
  id: number;
  nome: string;
  responsavel?: string | null;
  urlImage?: string[] | null;
};

export default function OngsPage() {
  const [loading, setLoading] = useState(true);
  const [shelters, setShelters] = useState<Shelter[]>([]);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        // tenta via /shelters (pode ser protegido)
        try {
          const res = await api.get("/shelters");
          setShelters(Array.isArray(res.data) ? (res.data as Shelter[]) : []);
          return;
        } catch (err: unknown) {
          const axiosLike = err as { response?: { status?: number } };
          if (axiosLike?.response?.status !== 401) throw err;
        }

        // fallback público: deriva ONGs a partir dos animais
        const animalsRes = await api.get("/animals").catch(() => ({ data: [] }));
        const animals = Array.isArray(animalsRes.data) ? animalsRes.data : [];

        const map = new Map<number, Shelter>();
        for (const a of animals) {
          const rec = a as Partial<{
            shelterId: number;
            shelter: { nome?: string; urlImage?: string[]; responsavel?: string };
            ong: { nome?: string; urlImage?: string[]; responsavel?: string };
            donoId: string | number;
            donoTipo: string;
          }>;

          const sid =
            typeof rec.shelterId === "number"
              ? rec.shelterId
              : rec.donoTipo === "ong"
                ? Number(rec.donoId)
                : NaN;

          if (!Number.isFinite(sid) || sid <= 0) continue;
          if (map.has(sid)) continue;

          const nome = rec.shelter?.nome || rec.ong?.nome || `ONG #${sid}`;
          const urlImage = rec.shelter?.urlImage || rec.ong?.urlImage || null;
          const responsavel = rec.shelter?.responsavel || rec.ong?.responsavel || null;

          map.set(sid, { id: sid, nome, urlImage, responsavel });
        }

        setShelters(Array.from(map.values()));
      } catch (err) {
        console.error(err);
        setShelters([]);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const sorted = useMemo(() => {
    return [...shelters].sort((a, b) =>
      String(a.nome || "").localeCompare(String(b.nome || ""), "pt-BR", { sensitivity: "base" })
    );
  }, [shelters]);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>ONGs</h1>
        <p className={styles.subtitle}>Conheça as ONGs parceiras e os pets cadastrados.</p>

        {loading ? (
          <p className={styles.muted}>Carregando...</p>
        ) : sorted.length === 0 ? (
          <p className={styles.muted}>Nenhuma ONG encontrada.</p>
        ) : (
          <div className={styles.grid}>
            {sorted.map((s) => {
              const photos = Array.isArray(s.urlImage) ? s.urlImage : [];
              const firstPhoto = photos.find(Boolean) || null;
              const desc = (s.responsavel || "").trim();

              return (
                <Link key={s.id} href={`/ongs/${s.id}`} className={styles.card}>
                  <div className={styles.photoWrap}>
                    {firstPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={firstPhoto} alt={s.nome} />
                    ) : (
                      <div className={styles.photoPlaceholder}>
                        <span className="material-symbols-outlined">pets</span>
                      </div>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{s.nome}</h3>
                    <p className={styles.cardDesc}>
                      {desc ? (desc.length > 110 ? `${desc.slice(0, 110)}...` : desc) : "Sem descrição."}
                    </p>
                    <span className={styles.cardLink}>Ver perfil →</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
