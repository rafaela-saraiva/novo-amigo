'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Message {
  id: number;
  mensagem: string;
  resposta?: string;
  createdAt: string;
}

export default function MinhasMensagens() {
  const { token } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (token) fetchMessages();
  }, [token]);

  async function fetchMessages() {
  try {
    const res = await api.get("/messages", {
      headers: { Authorization: `Bearer ${token}` }
    });

    setMessages(res.data);
  } catch (err) {
    console.error(err); // 👈 coloca isso pra debug
    alert("Erro ao carregar mensagens");
  }
}
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1 className={styles.title}>Minhas mensagens</h1>

        {messages.length === 0 && <p>Você ainda não enviou mensagens.</p>}

        {messages.map((m) => (
          <div key={m.id} className={styles.card}>
            <p><strong>Você:</strong> {m.mensagem}</p>

            {m.resposta ? (
              <div className={styles.response}>
                <strong>Admin:</strong>
                <p>{m.resposta}</p>
              </div>
            ) : (
              <p className={styles.pending}>Aguardando resposta...</p>
            )}

            <span className={styles.date}>
              {new Date(m.createdAt).toLocaleString()}
            </span>
          </div>
        ))}
      </main>

      <Footer />
    </div>
  );
}