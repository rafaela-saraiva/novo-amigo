'use client';

import { useState } from "react";
import Header from "@/components/Header";
import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Footer from "@/components/Footer";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";

export default function FaleConosco() {

  const [nomeInteiro, setNomeInteiro] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [comentario, setComentario] = useState("");

  const [loading, setLoading] = useState(false);

  // 🔥 HANDLERS (FALTAVAM)
  function handleNomeChange(valor: string) {
    setNomeInteiro(valor);
  }

  function handleEmailChange(valor: string) {
    setEmail(valor);
  }

  function handleTelefoneChange(valor: string) {
    setTelefone(valor);
  }

  function handleComentarioChange(valor: string) {
    setComentario(valor);
  }

 const { token } = useAuth();

async function botaoCadastrarOnClick(e: React.FormEvent) {
  e.preventDefault();

  try {
    setLoading(true);

    await api.post(
      "/messages",
      {
        nome: nomeInteiro,
        email,
        mensagem: comentario
      },
      {
        headers: {
          Authorization: `Bearer ${token}` // 🔥 ESSENCIAL
        }
      }
    );

    alert("Mensagem enviada com sucesso 💖");

    setNomeInteiro("");
    setEmail("");
    setTelefone("");
    setComentario("");

  } catch (err: any) {
    console.error(err);
    alert(err?.response?.data?.error || "Erro ao enviar mensagem");
  } finally {
    setLoading(false);
  }
}

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.content}>
          <span className={styles.badge}>💌 CONTATO</span>

          <h1>
            Fale com a gente. <br />
            <span>Estamos aqui pra ajudar.</span>
          </h1>

          <p>
            Tem dúvidas, sugestões ou quer ajudar? Entre em contato com a gente e
            faça parte dessa rede de amor pelos animais 🐾
          </p>

          <form onSubmit={botaoCadastrarOnClick} className={styles.form}>
  <TextField label="Nome Completo" type="text" onChange={handleNomeChange} />
  <TextField label="E-mail" type="email" onChange={handleEmailChange} />
  <TextField label="Telefone" type="text" onChange={handleTelefoneChange} />

  <textarea
    placeholder="Comentário"
    value={comentario}
    onChange={(e) => handleComentarioChange(e.target.value)}
    className={styles.textarea}
  />

  <button type="submit" disabled={loading} className={styles.button}>
    {loading ? "Enviando..." : "Enviar mensagem →"}
  </button>
</form>
        </div>
      </div>

      <Footer />
    </>
  );
}