'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import TextField from "@/components/TextField";
import api from "@/services/api";
import { useState } from "react";
import styles from './styles.module.css';

export default function Cadastrar() {
  const [tipo, setTipo] = useState<'usuario' | 'ong'>('usuario');
  const [nomeInteiro, setNomeInteiro] = useState("");
  const [email, setEmail] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  function getForcaSenha(senha: string) {
    if (senha.length < 6) return "fraca";

    const temEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(senha);

    if (senha.length >= 6 && !temEspecial) return "media";
    if (senha.length >= 6 && temEspecial) return "forte";

    return "fraca";
  }

  const forcaSenha = getForcaSenha(senha);

  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [openLoginModal, setOpenLoginModal] = useState(false);

  async function botaoCadastrarOnClick(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem!");
      setShowErrorModal(true);
      return;
    }

    if (senha.length < 6 || !/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      setErrorMessage("Senha deve ter no mínimo 6 caracteres e um especial");
      setShowErrorModal(true);
      return;
    }

    try {
      if (tipo === "usuario") {
        await api.post("/users", {
          nome: nomeInteiro,
          email,
          senha,
        });
      } else {
        await api.post("/shelters", {
          nome: nomeInteiro,
          email,
          senha,
          telefone,
          cnpj,
        });
      }

      setShowSuccessModal(true);

    } catch (error: any) {
      setErrorMessage(error.response?.data?.error || "Erro ao cadastrar");
      setShowErrorModal(true);
    }
  }

  return (
    <>
      <Header />

      <div className={styles.pageContainer}>
        <div className={styles.sideLeft}>
          <img
            src="https://i.postimg.cc/PfCv1nfx/AQNdkv-Jru-Ftg-mr8-Wjeo-SCDw-YCyn3-FA3kr-Yjaa9n-BBSplt-T-14-Qc-Sk-IZL1jv-Fs-2q-w-Pd-LJ9m-Be-Uexk1l-KW3whxkc-Pen-Rqdf45-M.jpg"
            alt="Logo"
            className={styles.sideLeft}
          />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.titulo}>Crie sua conta</h1>
          <p className={styles.subtitulo}>Preencha os campos abaixo</p>

          <div className={styles.toggleContainer}>
            <button
              type="button"
              onClick={() => setTipo("usuario")}
              className={`${styles.toggleButton} ${tipo === 'usuario' ? styles.active : ''}`}
            >
              Usuário
            </button>
            <button
              type="button"
              onClick={() => setTipo("ong")}
              className={`${styles.toggleButton} ${tipo === 'ong' ? styles.active : ''}`}
            >
              ONG
            </button>
          </div>

          <form className={styles.formCadastrar} onSubmit={botaoCadastrarOnClick}>

            <TextField
              label={tipo === 'usuario' ? 'Nome completo' : 'Nome da ONG'}
              type="text"
              text={nomeInteiro}
              onChange={setNomeInteiro}
              required
            />

            <TextField
              label="Email"
              type="email"
              text={email}
              onChange={setEmail}
              required
            />

            {tipo === 'ong' && (
              <>
                <TextField
                  label="Telefone"
                  type="text"
                  text={telefone}
                  onChange={(valor) => {
                    const numeros = valor.replace(/[^0-9]/g, '');
                    if (numeros.length <= 11) setTelefone(numeros);
                  }}
                  required
                />

                <TextField
                  label="CNPJ"
                  type="text"
                  text={cnpj}
                  onChange={(valor) => {
                    const numeros = valor.replace(/[^0-9]/g, '');
                    if (numeros.length <= 14) setCnpj(numeros);
                  }}
                  required
                />

                
              </>
            )}

            <TextField
              label="Senha"
              type="password"
              text={senha}
              onChange={setSenha}
              required
            />

            <div className={styles.senhaContainer}>
              <div className={`${styles.barra} ${styles[forcaSenha]}`}></div>
              <span className={styles.textoSenha}>
                Senha {forcaSenha}
              </span>
            </div>

            <TextField
              label="Confirmar senha"
              type="password"
              text={confirmarSenha}
              onChange={setConfirmarSenha}
              required
            />

            <button type="submit" className={styles.botaoCadastrar}>
              Cadastrar
            </button>

            <p className={styles.voltarLogin}>
              <button
                type="button"
                onClick={() => setOpenLoginModal(true)}
                className={styles.voltarLoginButton}
              >
                ← Voltar ao login
              </button>
            </p>

            <p className={styles.termos}>
              Ao se cadastrar, você concorda com nossos{" "}
              <a href="#">Termos de Uso</a> e{" "}
              <a href="#">Política de Privacidade</a>.
            </p>

          </form>
        </div>
      </div>

      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContainer} ${styles.modalSuccess}`}>
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Sua conta foi criada com sucesso. Faça login para continuar.</p>
            <button
              onClick={() => setOpenLoginModal(true)}
              className={styles.modalButton}
            >
              Ir para o Login
            </button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContainer} ${styles.modalError}`}>
            <h3>Erro ao cadastrar!</h3>
            <p>{errorMessage}</p>
            <button
              onClick={() => setShowErrorModal(false)}
              className={styles.modalButton}
            >
              Fechar
            </button>
          </div>
        </div>
      )}

      <LoginModal open={openLoginModal} onClose={() => setOpenLoginModal(false)} />

      <Footer />
    </>
  );
}