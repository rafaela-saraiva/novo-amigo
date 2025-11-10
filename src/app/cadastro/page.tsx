'use client';

import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function Cadastrar() {
  const router = useRouter();

  const [tipo, setTipo] = useState<'usuario' | 'ong'>('usuario');
  const [nomeInteiro, setNomeInteiro] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  // 🌸 Controle dos modais
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  async function botaoCadastrarOnClick(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      setErrorMessage("As senhas não coincidem! Por favor, verifique.");
      setShowErrorModal(true);
      return;
    }

    const dados: any = {
      name: nomeInteiro,
      email,
      pass: senha,
      phone: telefone,
      endereco,
    };

    if (tipo === "usuario") {
      dados.cpf = cpf;
    } else {
      dados.cnpj = cnpj;
    }

    try {
      const response = await api.post(`/users`, dados);
      console.log("Resposta:", response.data);

      // ✅ Exibe o modal de sucesso
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      setErrorMessage(
        error.response?.data?.message ||
        "Ocorreu um erro ao cadastrar. Tente novamente."
      );
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
            alt="Logo Novo Amigo"
            className={styles.sideLeft}
          />
        </div>

        <div className={styles.formContainer}>
          <h1 className={styles.titulo}>Crie sua conta</h1>
          <p className={styles.subtitulo}>Preencha os campos abaixo para se cadastrar</p>

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
              label="E-mail"
              type="email"
              text={email}
              onChange={setEmail}
              required
            />

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

            {tipo === 'usuario' ? (
              <TextField
                label="CPF"
                type="text"
                text={cpf}
                onChange={(valor) => setCpf(valor.replace(/[^0-9]/g, ''))}
                required
              />
            ) : (
              <>
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
                <TextField
                  label="Endereço"
                  type="text"
                  text={endereco}
                  onChange={setEndereco}
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
              <a href="/login">← Voltar ao login</a>
            </p>

            <p className={styles.termos}>
              Ao se cadastrar, você concorda com nossos{" "}
              <a href="#">Termos de Uso</a> e{" "}
              <a href="#">Política de Privacidade</a>.
            </p>
          </form>
        </div>
      </div>

      {/* ✅ Modal de sucesso */}
      {showSuccessModal && (
        <div className={styles.modalOverlay}>
          <div className={`${styles.modalContainer} ${styles.modalSuccess}`}>
            <h3>Cadastro realizado com sucesso!</h3>
            <p>Sua conta foi criada com sucesso. Faça login para continuar.</p>
            <button
              onClick={() => router.push('/login')}
              className={styles.modalButton}
            >
              Ir para o Login
            </button>
          </div>
        </div>
      )}

      {/* ❌ Modal de erro */}
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

      <Footer />
    </>
  );
}
