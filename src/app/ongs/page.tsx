'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import api from "@/services/api";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

type Shelter = {
  id: number;
  nome: string;
  responsavel?: string | null;
  endereco?: string | null;
  telefone?: string | null;
  urlImage?: string[] | null;
  animals?: { id: number }[];
};

export default function OngsPage() {
  const [loading, setLoading] = useState(true);
  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);

        try {
          const res = await api.get("/shelters");
          setShelters(Array.isArray(res.data) ? (res.data as Shelter[]) : []);
          return;
        } catch (err: unknown) {
          const axiosLike = err as { response?: { status?: number } };
          if (axiosLike?.response?.status !== 401) throw err;
        }

        const animalsRes = await api.get("/animals").catch(() => ({ data: [] }));
        const animals = Array.isArray(animalsRes.data) ? animalsRes.data : [];

        const map = new Map<number, Shelter>();
        for (const a of animals) {
          const rec = a as Partial<{
            shelterId: number;
            shelter: { nome?: string; urlImage?: string[]; responsavel?: string; endereco?: string };
            ong: { nome?: string; urlImage?: string[]; responsavel?: string; endereco?: string };
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
          const endereco = rec.shelter?.endereco || rec.ong?.endereco || null;

          map.set(sid, { id: sid, nome, urlImage, responsavel, endereco });
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
    return [...shelters]
      .filter(
        (s) =>
          !search ||
          String(s.nome || "").toLowerCase().includes(search.toLowerCase()) ||
          String(s.responsavel || "").toLowerCase().includes(search.toLowerCase())
      )
      .sort((a, b) =>
        String(a.nome || "").localeCompare(String(b.nome || ""), "pt-BR", { sensitivity: "base" })
      );
  }, [shelters, search]);

  return (
    <div className={styles.page}>
      <Header />

      <section className={styles.hero}>
        <div className={styles.heroInner}>
          <div className={styles.heroBadge}>
            <span className="material-symbols-outlined">volunteer_activism</span>
            Nossas ONGs
          </div>
          <h1 className={styles.heroTitle}>ONGs Parceiras</h1>
          <p className={styles.heroSubtitle}>
            Conheça as organizações que cuidam e resgatam animais em busca de um lar
          </p>

          <div className={styles.searchWrap}>
            <span className="material-symbols-outlined">search</span>
            <input
              className={styles.searchInput}
              type="text"
              placeholder="Buscar pelo nome da ONG ou responsável..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className={styles.searchClear} onClick={() => setSearch("")} aria-label="Limpar busca">
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>
        </div>

        <div className={styles.heroWave}>
          <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="var(--surface-secondary)" />
          </svg>
        </div>
      </section>

      <main className={styles.main}>
        {!loading && (
          <p className={styles.resultsInfo}>
            <span className="material-symbols-outlined">group</span>
            {sorted.length} {sorted.length === 1 ? "ONG encontrada" : "ONGs encontradas"}
            {search && <> para &quot;{search}&quot;</>}
          </p>
        )}

        {loading ? (
          <div className={styles.loadingWrap}>
            <div className={styles.loadingSpinner}>
              <span className="material-symbols-outlined">sync</span>
            </div>
            <p className={styles.loadingTitle}>Carregando ONGs...</p>
            <p className={styles.loadingSubtitle}>Buscando as organizações parceiras no banco de dados</p>
            <div className={styles.grid} style={{ marginTop: 28 }}>
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className={styles.skeleton} />
              ))}
            </div>
          </div>
        ) : sorted.length === 0 ? (
          <div className={styles.empty}>
            <span className="material-symbols-outlined">search_off</span>
            <p>Nenhuma ONG encontrada{search ? ` para "${search}"` : ""}.</p>
            {search && (
              <button className={styles.emptyBtn} onClick={() => setSearch("")}>
                Limpar busca
              </button>
            )}
          </div>
        ) : (
          <div className={styles.grid}>
            {sorted.map((s) => {
              const photos = Array.isArray(s.urlImage) ? s.urlImage : [];
              const firstPhoto = photos.find(Boolean) || null;
              const animaisCount = s.animals?.length ?? 0;
              const endereco = (s.endereco || "").trim();

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
                    <div className={styles.photoOverlay} />
                    {animaisCount > 0 && (
                      <span className={styles.animaisBadge}>
                        <span className="material-symbols-outlined">pets</span>
                        {animaisCount} {animaisCount === 1 ? "animal" : "animais"}
                      </span>
                    )}
                  </div>

                  <div className={styles.cardBody}>
                    <h3 className={styles.cardTitle}>{s.nome}</h3>

                    <div className={styles.cardMeta}>
                      {s.responsavel && (
                        <div className={styles.cardMetaRow}>
                          <span className="material-symbols-outlined">person</span>
                          <span>{s.responsavel}</span>
                        </div>
                      )}
                      {endereco && (
                        <div className={styles.cardMetaRow}>
                          <span className="material-symbols-outlined">location_on</span>
                          <span>{endereco.length > 45 ? `${endereco.slice(0, 45)}...` : endereco}</span>
                        </div>
                      )}
                      {s.telefone && (
                        <div className={styles.cardMetaRow}>
                          <span className="material-symbols-outlined">call</span>
                          <span>{s.telefone}</span>
                        </div>
                      )}
                    </div>

                    <div className={styles.cardFooter}>
                      <span className={styles.cardLink}>
                        Ver perfil
                        <span className="material-symbols-outlined">arrow_forward</span>
                      </span>
                    </div>
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
