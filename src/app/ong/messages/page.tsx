'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { toWhatsAppLink } from "@/utils/whatsapp";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

type AdoptionRequest = {
  id: number | string;
  createdAt: string;
  shelterId: number;
  petId: number;
  petNome: string;
  userId: string;
  userNome: string;
  userEmail: string;
  userTelefone: string;
  status: "PENDING" | "ACCEPTED" | "REJECTED";
};

function asRecord(value: unknown): Record<string, unknown> | null {
  if (!value || typeof value !== "object") return null;
  return value as Record<string, unknown>;
}

export default function OngMessages() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const isONG = user?.tipo === "shelter";
  const myShelterId = useMemo(() => Number(user?.id), [user?.id]);

  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [busyId, setBusyId] = useState<number | string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user || !isONG) router.push("/");
  }, [user, loading, isONG, router]);

  const fetchRequests = useCallback(async () => {
    if (!token) return;
    if (!Number.isFinite(myShelterId) || myShelterId <= 0) return;

    try {
      const res = await api.get(`/adoption-requests?shelterId=${myShelterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = res.data as unknown;
      if (!Array.isArray(data)) {
        setRequests([]);
        return;
      }

      const mapped = data
        .map((item): AdoptionRequest | null => {
          const rec = asRecord(item);
          if (!rec) return null;

          const shelterId = Number(rec.shelterId);
          const petId = Number(rec.petId ?? rec.animalId);
          const petNome = String(rec.petNome ?? rec.animalNome ?? "");
          const userId = String(rec.userId ?? "");
          const userNome = String(rec.userNome ?? "");
          const userEmail = String(rec.userEmail ?? "");
          const userTelefone = String(rec.userTelefone ?? "");
          const status = String(rec.status ?? "PENDING") as AdoptionRequest["status"];
          const createdAt = String(rec.createdAt ?? "");
          const id = (rec.id ?? "") as AdoptionRequest["id"];

          if (!id) return null;
          if (!Number.isFinite(shelterId) || shelterId <= 0) return null;
          if (!Number.isFinite(petId) || petId <= 0) return null;
          if (!userId) return null;

          return {
            id,
            createdAt,
            shelterId,
            petId,
            petNome,
            userId,
            userNome,
            userEmail,
            userTelefone,
            status,
          };
        })
        .filter(Boolean) as AdoptionRequest[];

      setRequests(mapped.filter((r) => r.status === "PENDING" && r.shelterId === myShelterId));
      return;
    } catch (err: unknown) {
      const axiosLike = err as { response?: { status?: number } };
      if (axiosLike?.response?.status === 404) {
        setRequests([]);
        alert("Seu backend não possui o endpoint /adoption-requests ainda.");
        return;
      }
      console.error(err);
      alert("Erro ao carregar solicitações.");
      return;
    }
  }, [token, myShelterId]);

  useEffect(() => {
    if (!loading && user && isONG) fetchRequests();
  }, [fetchRequests, loading, user, isONG]);

  async function aceitarSolicitacao(req: AdoptionRequest) {
    if (!confirm(`Aceitar solicitação para o pet "${req.petNome || req.petId}"?`)) return;

    try {
      setBusyId(req.id);

      await api.post(`/adoption-requests/${req.id}/accept`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // Garante o status do pet mesmo se o backend não atualizar automaticamente
      await api.put(`/animals/${req.petId}`, {
        disponivel: false,
        adotanteId: req.userId,
        adotadoPorId: req.userId,
        adoptedById: req.userId,
        adopterId: req.userId,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => null);

      await fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Erro ao aceitar solicitação.");
    } finally {
      setBusyId(null);
    }
  }

  async function recusarSolicitacao(req: AdoptionRequest) {
    if (!confirm("Recusar esta solicitação?")) return;

    try {
      setBusyId(req.id);

      await api.post(`/adoption-requests/${req.id}/reject`, {}, {
        headers: { Authorization: `Bearer ${token}` }
      });

      await fetchRequests();
    } catch (err) {
      console.error(err);
      alert("Erro ao recusar solicitação.");
    } finally {
      setBusyId(null);
    }
  }

  if (loading || !user || !isONG) return null;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Solicitações de Adoção</h1>

        {requests.length === 0 ? (
          <p className={styles.empty}>Nenhuma solicitação pendente.</p>
        ) : (
          <div className={styles.table}>
            {requests.map((r) => {
              const wa = r.userTelefone ? toWhatsAppLink(r.userTelefone) : null;
              const disabled = busyId === r.id;

              return (
                <div key={`${r.source}:${r.id}`} className={styles.card}>
                  <div className={styles.rowTop}>
                    <div>
                      <strong className={styles.name}>{r.userNome || "Solicitante"}</strong>
                      {r.userEmail ? <p className={styles.email}>{r.userEmail}</p> : null}
                    </div>
                    <span className={styles.petBadge}>
                      Pet: {r.petNome ? r.petNome : `#${r.petId}`}
                    </span>
                  </div>

                  <div className={styles.infoRow}>
                    <span className={styles.infoLabel}>Contato:</span>
                    {wa ? (
                      <a className={styles.waLink} href={wa} target="_blank" rel="noreferrer">
                        {r.userTelefone} (WhatsApp)
                      </a>
                    ) : (
                      <span className={styles.muted}>Não informado</span>
                    )}
                  </div>

                  <div className={styles.actionsRow}>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => aceitarSolicitacao(r)}
                      disabled={disabled}
                    >
                      {disabled ? "Processando..." : "Aceitar"}
                    </button>
                    <button
                      className={styles.rejectBtn}
                      onClick={() => recusarSolicitacao(r)}
                      disabled={disabled}
                    >
                      Recusar
                    </button>
                  </div>

                  <span className={styles.date}>
                    {r.createdAt ? new Date(r.createdAt).toLocaleString() : ""}
                  </span>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
