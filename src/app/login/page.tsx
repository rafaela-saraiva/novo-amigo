'use client'

import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Header from "@/components/Header";

export default function Login() {
  let email = "";
  let pass = "";

  function botaoCadastrarOnClick(e: React.FormEvent) {
    e.preventDefault();
    alert(`${email}\n${pass}`);
  }

  function handleEmailChange(texto: string) {
    email = texto;
  }

  function handlePassChange(texto: string) {
    pass = texto;
  }

  return (
    <>
      <Header />
      <div className={styles.pageContainer}>
        <h1 className={styles.titulo}>Login</h1>
        <form className={styles.formCadastrar} onSubmit={botaoCadastrarOnClick}>
          <TextField label="E-mail" type="text" onChange={handleEmailChange} />
          <TextField label="Senha" type="text" onChange={handlePassChange} />
          
          <button type="submit">Entrar</button>
          
          <div className={styles.cadastroLink}>
            Não tem conta? <span><a href="/cadastro">Cadastre aqui</a></span>
          </div>
        
        </form>
      </div>
    </>
  );
}
