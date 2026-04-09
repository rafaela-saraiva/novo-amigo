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
  id: string;
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

type ShelterMessagePayload = {
  id?: string | number;
  type?: string;
  status?: "PENDING" | "ACCEPTED" | "REJECTED";
  createdAt?: string;
  shelterId?: number | string;
  animalId?: number | string;
  animalNome?: string;
  userId?: number | string;
  userNome?: string;
  userEmail?: string;
  userTelefone?: string;
};

type ShelterResponse = {
  id: number | string;
  mensages?: string[] | null;
};

function readNumber(...values: unknown[]): number | null {
  for (const value of values) {
    const parsed = Number(value);
    if (Number.isFinite(parsed) && parsed > 0) return parsed;
  }
  return null;
}

function readString(...values: unknown[]): string {
  for (const value of values) {
    if (typeof value === "string" && value.trim()) return value.trim();
  }
  return "";
}

function parseShelterMessage(raw: string, shelterIdFallback: number): AdoptionRequest | null {
  try {
    const parsed = JSON.parse(raw) as ShelterMessagePayload;
    if (!parsed || parsed.type !== "adoption_request") return null;

    const shelterId = readNumber(parsed.shelterId, shelterIdFallback);
    const petId = readNumber(parsed.animalId);
    const userId = readString(parsed.userId);
    if (!shelterId || !petId || !userId) return null;

    return {
      id: String(parsed.id ?? `${shelterId}-${petId}-${userId}`),
      createdAt: readString(parsed.createdAt),
      shelterId,
      petId,
      petNome: readString(parsed.animalNome),
      userId,
      userNome: readString(parsed.userNome),
      userEmail: readString(parsed.userEmail),
      userTelefone: readString(parsed.userTelefone),
      status: parsed.status ?? "PENDING",
    };
  } catch {
    return null;
  }
}

function serializeShelterMessage(existingRaw: string, nextStatus: "PENDING" | "ACCEPTED" | "REJECTED") {
  try {
    const parsed = JSON.parse(existingRaw) as ShelterMessagePayload;
    if (!parsed || parsed.type !== "adoption_request") return existingRaw;
    return JSON.stringify({ ...parsed, status: nextStatus });
  } catch {
    return existingRaw;
  }
}

export default function OngMessages() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const isONG = user?.tipo === "shelter";
  const myShelterId = useMemo(() => Number(user?.id), [user?.id]);

  const [requests, setRequests] = useState<AdoptionRequest[]>([]);
  const [rawMessages, setRawMessages] = useState<string[]>([]);
  const [busyId, setBusyId] = useState<string | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user || !isONG) router.push("/");
  }, [user, loading, isONG, router]);

  const fetchRequests = useCallback(async () => {
    if (!token) return;
    if (!Number.isFinite(myShelterId) || myShelterId <= 0) return;

    try {
      const res = await api.get(`/shelters/${myShelterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const shelter = res.data as ShelterResponse | null;
      const mensages = Array.isArray(shelter?.mensages) ? shelter.mensages : [];
      setRawMessages(mensages);

      const mapped = mensages
        .map((item) => parseShelterMessage(item, myShelterId))
        .filter(Boolean) as AdoptionRequest[];

      setRequests(mapped.filter((r) => r.status === "PENDING" && r.shelterId === myShelterId));
      return;
    } catch (err: unknown) {
      const axiosLike = err as { response?: { status?: number } };
      if (axiosLike?.response?.status === 404) {
        setRequests([]);
        setRawMessages([]);
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

  async function atualizarStatusMensagem(req: AdoptionRequest, status: "ACCEPTED" | "REJECTED") {
    const nextMessages = rawMessages.map((item) => {
      const parsed = parseShelterMessage(item, myShelterId);
      if (!parsed || parsed.id !== req.id) return item;
      return serializeShelterMessage(item, status);
    });

    await api.put(`/shelters/${myShelterId}`, {
      mensages: nextMessages,
    }, {
      headers: { Authorization: `Bearer ${token}` }
    });
  }

  async function aceitarSolicitacao(req: AdoptionRequest) {
    if (!confirm(`Aceitar solicitação para o pet "${req.petNome || req.petId}"?`)) return;

    try {
      setBusyId(req.id);

      await api.put(`/animals/${req.petId}`, {
        disponivel: false,
      }, {
        headers: { Authorization: `Bearer ${token}` }
      }).catch(() => null);

      await atualizarStatusMensagem(req, "ACCEPTED");
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
      await atualizarStatusMensagem(req, "REJECTED");
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
                <div key={`${r.shelterId}:${r.id}`} className={styles.card}>
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
