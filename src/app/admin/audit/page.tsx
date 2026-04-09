'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Log {
  id: number;
  action: string;
  entity: string;
  entityId: number;
  userEmail?: string;
  createdAt: string;
}

export default function AdminAudit() {
  const { token } = useAuth();

  const [logs, setLogs] = useState<Log[]>([]);
  const [loadingLogs, setLoadingLogs] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetchLogs();
  }, [token]);

  async function fetchLogs() {
    try {
      setLoadingLogs(true);

      const res = await api.get("/audit", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setLogs(res.data);
    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Erro ao carregar auditoria");
    } finally {
      setLoadingLogs(false);
    }
  }

  // 🔥 traduz ação
  function formatAction(log: Log) {
    if (log.action === "CREATE") return "Criou";
    if (log.action === "DELETE") return "Deletou";
    if (log.action === "UPDATE") return "Editou";
    if (log.action === "ACTIVATE") return "Ativou";
    if (log.action === "DEACTIVATE") return "Desativou";
    return log.action;
  }

  // 🔥 traduz entidade
  function translateEntity(entity: string) {
    if (entity === "USER") return "usuário";
    if (entity === "SHELTER") return "ONG";
    if (entity === "ANIMAL") return "animal";
    return entity;
  }

  // 🔥 cor do badge
  function getBadgeClass(action: string) {
    switch (action) {
      case "CREATE":
        return styles.create;
      case "DELETE":
        return styles.delete;
      case "ACTIVATE":
        return styles.activate;
      case "DEACTIVATE":
        return styles.deactivate;
      default:
        return styles.update;
    }
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.top}>
          <h1>Gerenciar Auditoria</h1>
        </div>

        {loadingLogs && <LoadingState title="Carregando registros..." subtitle="Buscando logs de auditoria" variant="inline" />}

        <div className={styles.table}>
          {logs.length === 0 && !loadingLogs && (
            <p>Nenhuma ação registrada ainda.</p>
          )}

          {logs.map((log) => (
            <div key={log.id} className={styles.row}>

              {/* INFO ESQUERDA */}
              <div className={styles.info}>
                <strong>{log.userEmail || "Sistema"}</strong>

                <p className={styles.description}>
                  {formatAction(log)} {translateEntity(log.entity)} #{log.entityId}
                </p>

                <span className={`${styles.badge} ${getBadgeClass(log.action)}`}>
                  {formatAction(log)}
                </span>
              </div>

              {/* DIREITA (DATA) */}
              <div className={styles.actions}>
                <span className={styles.date}>
                  {new Date(log.createdAt).toLocaleString()}
                </span>
              </div>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}