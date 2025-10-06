'use client'

import TextField from "@/components/TextField";
import styles from './style.module.css'


export default function login() {
  let email = "";
  let pass = "";
 

  function botaoCadastrarOnClick() {
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
      <h1>Login</h1>
      <form className="formCadastrar">
        <TextField label="E-mail" type="text" onChange={handleEmailChange} />
        <TextField label="Senha" type="text" onChange={handlePassChange}  />
        

        <button onClick={botaoCadastrarOnClick}>Entrar</button>
      </form>
    </>
  );
}