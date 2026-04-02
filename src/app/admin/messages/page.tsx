'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Message {
  id: number;
  nome: string;
  email: string;
  mensagem: string;
  resposta?: string;
  createdAt: string;
}

export default function AdminMessages() {
  const { token } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [selected, setSelected] = useState<Message | null>(null);
  const [reply, setReply] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  async function fetchMessages() {
    try {
      const res = await api.get("/messages", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(res.data);
    } catch {
      alert("Erro ao carregar mensagens");
    }
  }

  async function sendReply() {
    if (!selected) return;

    try {
      setLoading(true);

      await api.put(
        `/messages/${selected.id}/reply`,
        { resposta: reply },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Resposta enviada 💬");

      setSelected(null);
      setReply("");
      fetchMessages();

    } catch {
      alert("Erro ao responder");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.top}>
          <h1>Mensagens</h1>
        </div>

        <div className={styles.table}>
          {messages.map((m) => (
            <div
              key={m.id}
              className={styles.row}
              onClick={() => setSelected(m)}
            >
              <div className={styles.info}>
                <strong>{m.nome}</strong>
                <p>{m.email}</p>

                <span className={m.resposta ? styles.answered : styles.pending}>
                  {m.resposta ? "Respondido" : "Pendente"}
                </span>
              </div>

              <span className={styles.date}>
                {new Date(m.createdAt).toLocaleString()}
              </span>
            </div>
          ))}
        </div>
      </main>

      {/* MODAL */}
      {selected && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <h2>{selected.nome}</h2>

            <p className={styles.message}>
              {selected.mensagem}
            </p>

            <textarea
              placeholder="Digite sua resposta..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />

            <div className={styles.modalActions}>
              <button onClick={sendReply} disabled={loading}>
                {loading ? "Enviando..." : "Responder"}
              </button>

              <button onClick={() => setSelected(null)}>
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}