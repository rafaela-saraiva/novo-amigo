'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Message {
  id: number;
  nome: string;
  email: string;
  mensagem: string;
  createdAt: string;
}

export default function AdminMessages() {
  const { token } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);

  const fetchMessages = useCallback(async () => {
    if (!token) return;

    try {
      const res = await api.get("/messages", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setMessages(res.data);
    } catch {
      alert("Erro ao carregar mensagens");
    }
  }, [token]);

  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);

  async function deleteMessage(id: number) {
    const confirmDelete = confirm("Tem certeza que deseja excluir?");
    if (!confirmDelete) return;

    try {
      await api.delete(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      alert("Mensagem deletada ");
      fetchMessages();

    } catch {
      alert("Erro ao deletar");
    }
  }

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Mensagens</h1>

        <div className={styles.table}>
          {messages.map((m) => (
            <div key={m.id} className={styles.card}>

              <strong className={styles.name}>{m.nome}</strong>
              <p className={styles.email}>{m.email}</p>

              <p className={styles.message}>{m.mensagem}</p>

              <button
                className={styles.deleteBtn}
                onClick={() => deleteMessage(m.id)}
              >
                Deletar
              </button>

              <span className={styles.date}>
                {new Date(m.createdAt).toLocaleString()}
              </span>

            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
