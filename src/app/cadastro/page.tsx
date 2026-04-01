"use client";

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoginModal from "@/components/LoginModal";
import TextField from "@/components/TextField";
import api from "@/services/api";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import styles from "./styles.module.css";

export default function Cadastrar() {
  const [tipo, setTipo] = useState<"usuario" | "ong">("usuario");
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

  const closeFeedbackModals = useCallback(() => {
    setShowSuccessModal(false);
    setShowErrorModal(false);
  }, []);

  useEffect(() => {
    if (!showSuccessModal && !showErrorModal) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") closeFeedbackModals();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [closeFeedbackModals, showSuccessModal, showErrorModal]);

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

    } catch (error: unknown) {
      const err = error as { response?: { data?: { error?: string } } };
      setErrorMessage(err.response?.data?.error || "Erro ao cadastrar");
      setShowErrorModal(true);
    }
  }

  return (
    <>
      <Header />

      <main className={styles.mainContainer}>
        {/* Left Column: Visual/Emotional */}
        <section className={styles.leftSection}>
          <div className={styles.leftContent}>
            <div className={styles.branding}>
              <span className={styles.logoText}>Novo Amigo</span>
            </div>
            <div className={styles.badge}>
              <span>Cada cadastro é um passo para uma adoção ❤️</span>
            </div>
            <h1 className={styles.headline}>
              Crie sua conta e comece a <span className={styles.highlight}>mudar vidas.</span>
            </h1>
            <p className={styles.subtext}>
              Junte-se a nós para ajudar milhares de animais a encontrar um novo lar e uma família cheia de amor.
            </p>
            <div className={styles.imageContainer}>
              <Image
                alt="Friendly golden retriever"
                className={styles.heroImage}
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQKo2XO4NuljtkSLKwgYYCYTTmCaLQClk1-1Fh4Yr-CCiVhE3IloWDf5DGFsAKuSOp_9C4DsvcRKqngmNABzwsn6Fdz_NxriEsBkCW9cmRnIVrInsifQq_CmKFB17ZpY6EBT6FH7s-zYqpR6DU2HeOJpF_Hsr_aUn1ccvm_Vx4GN4JGYi4EbGI9R6hhZ_afNIh1L9nlZlPdski-KHHfRahwKGsih7j4c2KNfJWGm5hDMaJoDCrVTblQ5xO0IFPL36Eqo8VEO14q19d%22"
                fill
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
          <div className={styles.texture}></div>
        </section>

        {/* Right Column: Form */}
        <section className={styles.rightSection}>
          <div className={styles.rightBackground} aria-hidden="true">
            <Image
              alt=""
              src="https://i.postimg.cc/PfCv1nfx/AQNdkv-Jru-Ftg-mr8-Wjeo-SCDw-YCyn3-FA3kr-Yjaa9n-BBSplt-T-14-Qc-Sk-IZL1jv-Fs-2q-w-Pd-LJ9m-Be-Uexk1l-KW3whxkc-Pen-Rqdf45-M.jpg"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div className={styles.formWrapper}>
            <header className={styles.formHeader}>
              <h2 className={styles.formTitle}>Junte-se ao Novo Amigo</h2>
              <p className={styles.formSubtitle}>Preencha os dados abaixo para começar</p>
            </header>

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

            <form className={styles.form} onSubmit={botaoCadastrarOnClick}>
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

              <div className={styles.passwordStrength}>
                <div className={`${styles.strengthBar} ${styles[forcaSenha]}`}></div>
                <span className={styles.strengthText}>Senha {forcaSenha}</span>
              </div>

              <TextField
                label="Confirmar senha"
                type="password"
                text={confirmarSenha}
                onChange={setConfirmarSenha}
                required
              />

              <button type="submit" className={styles.submitButton}>
                Criar minha conta
              </button>
            </form>

            <footer className={styles.formFooter}>
              <p>
                Já tem uma conta? 
                <button
                  onClick={() => setOpenLoginModal(true)}
                  className={styles.loginLink}
                >
                  Entrar
                </button>
              </p>
            </footer>
          </div>
        </section>
      </main>

      {showSuccessModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeFeedbackModals();
          }}
        >
          <div className={`${styles.modalContainer} ${styles.modalSuccess}`}>
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Sua conta foi criada com sucesso. Faça login para continuar.</p>
            <button
              onClick={() => {
                closeFeedbackModals();
                setOpenLoginModal(true);
              }}
              className={styles.modalButton}
            >
              Ir para o Login
            </button>
          </div>
        </div>
      )}

      {showErrorModal && (
        <div
          className={styles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) closeFeedbackModals();
          }}
        >
          <div className={`${styles.modalContainer} ${styles.modalError}`}>
            <h3>Erro ao cadastrar!</h3>
            <p>{errorMessage}</p>
            <button
              onClick={closeFeedbackModals}
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
