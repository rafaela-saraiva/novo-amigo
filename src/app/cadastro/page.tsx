'use client'

import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Header from "@/components/Header";
import { useState } from "react";
import api from "@/services/api";
import Footer from "@/components/Footer";

export default function Cadastrar() {
  const [tipo, setTipo] = useState<'usuario' | 'ong'>('usuario');
  const [nomeInteiro, setNomeInteiro] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [endereco, setEndereco] = useState("");
  const [telefone, setTelefone] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  async function botaoCadastrarOnClick(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem! Por favor, verifique.");
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
      // ✅ Chamada correta pro backend usando seu service api
      const response = await api.post(`/users`, dados);

      alert("Cadastro realizado com sucesso!");
      console.log("Resposta:", response.data);
    } catch (error: any) {
      console.error("Erro ao cadastrar:", error);
      alert(
        error.response?.data?.message ||
        "Ocorreu um erro ao cadastrar. Tente novamente."
      );
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
          <p className={styles.subtitulo}>
            Preencha os campos abaixo para se cadastrar
          </p>

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
              autoComplete={tipo === 'usuario' ? 'name' : 'organization'}
            />

            <TextField
              label="E-mail"
              type="email"
              text={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />

            <TextField
              label="Telefone"
              type="text"
              text={telefone}
              onChange={(valor) => {
              const somenteNumeros = valor.replace(/[^0-9]/g, '');
               if (somenteNumeros.length <= 11) { // limita a 11 dígitos
                setTelefone(somenteNumeros);
                  }
               }}
              required
              autoComplete="tel"
            />
              
          
            

            {tipo === 'usuario' ? (
              <TextField
                label="CPF"
                type="text"
                text={cpf}
                onChange={(valor) => setCpf(valor.replace(/[^0-9]/g, ''))}
                required
                autoComplete="cpf"
              />
            ) : (
              <>
                <TextField
                  label="CNPJ"
                  type="text"
                  text={cnpj}
                  onChange={(valor) => {
                    const somenteNumeros = valor.replace(/[^0-9]/g, '');
                     if (somenteNumeros.length <= 14) { // limita a 14 dígitos
                      setCnpj(somenteNumeros);
                        }
                     }}
                  required
                  autoComplete="cnpj"
                />
                <TextField
                  label="Endereço"
                  type="text"
                  text={endereco}
                  onChange={setEndereco}
                  required
                  autoComplete="address-line1"
                />
              </>
            )}

            <TextField
              label="Senha"
              type="password"
              text={senha}
              onChange={setSenha}
              required
              autoComplete="new-password"
            />

            <TextField
              label="Confirmar senha"
              type="password"
              text={confirmarSenha}
              onChange={setConfirmarSenha}
              required
              autoComplete="new-password"
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
      <Footer />
    </>
  );
}
