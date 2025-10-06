'use client'
 
import TextField from "@/components/TextField";
 
 
 
export default function Cadastrar() {
  let nomeInteiro = "";
  let email = "";
  let cpf = "";
  let senha = "";
  let confirmarSenha = "";
  
 
  function botaoCadastrarOnClick() {
    alert(`${nomeInteiro}\n${email}\n${senha}\n${cpf}`);

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem! Por favor, verifique.");
      return;
    }
  
  }
 
  function handleNomeChange(texto: string) {
    nomeInteiro = texto;
  }
 
  function handleEmailChange(texto: string) {
    email = texto;
  }
 
  function handleSenhaChange(texto: string) {
    senha = texto;
  }
 
  function handleCpfChange(texto: string){
    cpf = texto;
  }

  function handleConfirmarSenhaChange(texto: string){
    confirmarSenha = texto;
  }
 
  return (
    <>
      <h1>Cadastro</h1>
      <form className="formCadastrar">
        <TextField label="Nome Completo" type="text" onChange={handleNomeChange} />
        <TextField label="E-mail" type="email" onChange={handleEmailChange}  />
        <TextField label= "CPF" type="text" onChange={handleCpfChange} />
        <TextField label="Senha" type="text" onChange={handleSenhaChange} />
        <TextField label= "Confirmar senha" type="text" onChange={handleConfirmarSenhaChange} />
 
        <button onClick={botaoCadastrarOnClick}>Salvar</button>
      </form>
    </>
  );
}
