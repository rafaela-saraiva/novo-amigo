"use client";

import { useState } from "react";
import Header from "@/components/Header";
import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Footer from "@/components/Footer";
 
export default function FaleConosco() {

  const [nomeInteiro, setNomeInteiro] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [comentario, setComentario] = useState("");
 
  function botaoCadastrarOnClick(e: React.FormEvent) {
    e.preventDefault();

    alert(`${nomeInteiro}\n${email}\n${telefone}\n${comentario}`);

    // limpa os campos depois de enviar
    setNomeInteiro("");
    setEmail("");
    setTelefone("");
    setComentario("");
  }
 
  function handleNomeChange(texto: string) {
    setNomeInteiro(texto);
  }
 
  function handleEmailChange(texto: string) {
    setEmail(texto);
  }
 
  function handleTelefoneChange(texto: string) {
    setTelefone(texto);
  }
 
  function handleComentarioChange(texto: string){
    setComentario(texto);
  }

 
  return (
    <>
      <Header />

      <div className={styles.container}>

        {/* TEXTO + FORM */}
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

          <form onSubmit={botaoCadastrarOnClick}>
            <TextField label="Nome Completo" type="text" onChange={handleNomeChange} />
            <TextField label="E-mail" type="email" onChange={handleEmailChange} />
            <TextField label="Telefone" type="text" onChange={handleTelefoneChange} />

            <textarea
              placeholder="Comentário"
              value={comentario}
              onChange={(e) => handleComentarioChange(e.target.value)}
              className={styles.textarea}
            />

            <button type="submit">Enviar mensagem →</button>
          </form>
        </div>

        

      </div>

      <Footer />
    </>
  );
}