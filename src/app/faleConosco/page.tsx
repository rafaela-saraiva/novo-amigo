"use client"

import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Header from "@/components/Header";
 
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
      <h1 className={styles.titulo}>Fale Conosco</h1>
      <form className={styles.formCadastrar} onSubmit={botaoCadastrarOnClick}>
        <TextField label="Nome Completo" type="text" onChange={handleNomeChange} />
        <TextField label="E-mail" type="email" onChange={handleEmailChange}  />
        <TextField label= "Telefone" type="text" onChange={handleTelefoneChange} />
        <TextField label="Comentário" type="text" onChange={handleComentarioChange} />
 
        <button onClick={botaoCadastrarOnClick}>Enviar</button>
      </form>
    </div>
    </>
  );
}

