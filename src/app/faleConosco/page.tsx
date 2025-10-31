"use client"

import Header from "@/components/Header";
import TextField from "@/components/TextField";
import styles from './styles.module.css';
 
export default function FaleConosco() {
  let nomeInteiro = "";
  let email = "";
  let telefone = "";
  let comentario = "";
  
  
 
  function botaoCadastrarOnClick() {
    alert(`${nomeInteiro}\n${email}\n${telefone}\n${comentario}`);
  
  }
 
  function handleNomeChange(texto: string) {
    nomeInteiro = texto;
  }
 
  function handleEmailChange(texto: string) {
    email = texto;
  }
 
  function handleTelefoneChange(texto: string) {
    telefone = texto;
  }
 
  function handleComentarioChange(texto: string){
    comentario = texto;
  }

 
  return (
    <>
      <Header/>
        <div className={styles.pageContainer}>
        <div className={styles.sideLeft}>
      <img
      src="https://i.postimg.cc/TPkhWCZW/AQM7-Zwx-Do-Exc-R1qqbs42-Oefj-Yt-Ql0-Rph38y-OD15-X4-qgwp2sx-TO00gu-Rok-Ip59-Q-rmf-Wfag-X0n-Pic-FUQLqnkr-PLidma5y-Fu-WOxi.jpg"
      alt="Logo Novo Amigo"
      className={styles.sideLeft}
    />
    </div>
    <div className={styles.formContainer}>  
      <h1 className={styles.titulo}>Fale Conosco</h1>
      <form className={styles.formCadastrar} onSubmit={botaoCadastrarOnClick}>
        <TextField label="Nome Completo" type="text" onChange={handleNomeChange} />
        <TextField label="E-mail" type="email" onChange={handleEmailChange}  />
        <TextField label= "Telefone" type="text" onChange={handleTelefoneChange} />
        <TextField label="Comentário" type="text" onChange={handleComentarioChange} />
 
        <button type="submit" className={styles.botaoCadastrar}>Enviar</button>
      </form>
    </div>
  </div>
    </>
  );
}


