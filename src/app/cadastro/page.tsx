'use client'
 
import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Header from "@/components/Header";
 
 
 
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
    <Header/>
    <div className={styles.pageContainer}>
    <div className={styles.sideLeft}>
      <img
        src="https://i.postimg.cc/PfCv1nfx/AQNdkv-Jru-Ftg-mr8-Wjeo-SCDw-YCyn3-FA3kr-Yjaa9n-BBSplt-T-14-Qc-Sk-IZL1jv-Fs-2q-w-Pd-LJ9m-Be-Uexk1l-KW3whxkc-Pen-Rqdf45-M.jpg"
        alt="Logo Novo Amigo"
        className={styles.sideLeft}
      />
      
    </div>

    <div className={styles.formContainer}>
      <h1 className={styles.titulo}>Crie sua conta</h1>
      <p className={styles.subtitulo}>
        Preencha os campos abaixo para se cadastrar
      </p>

      <form className={styles.formCadastrar} onSubmit={botaoCadastrarOnClick}>
        <TextField label="Nome completo" type="text" onChange={handleNomeChange} />
        <TextField label="E-mail" type="email" onChange={handleEmailChange} />
        <TextField label="CPF" type="text" onChange={handleCpfChange} />
        <TextField label="Senha" type="text" onChange={handleSenhaChange}/>
        <TextField label="Confirmar senha" type="text" onChange={handleConfirmarSenhaChange} />

        <button type="submit" className={styles.botaoCadastrar}>Cadastrar</button>

        <p className={styles.voltarLogin}><a href="/login">← Voltar ao login</a></p>
        <p className={styles.termos}>
          Ao se cadastrar, você concorda com nossos <a href="#">Termos de Uso</a> e <a href="#">Política de Privacidade</a>.
        </p>
      </form>
    </div>
  </div>
  </>
  );
}

