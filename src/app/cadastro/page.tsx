'use client'

import TextField from "@/components/TextField";
import styles from './styles.module.css';
import Header from "@/components/Header";
import { useState } from "react";
import axios from "axios";

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

  function botaoCadastrarOnClick(e: React.FormEvent) {
    e.preventDefault();

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem! Por favor, verifique.");
      return;
    }

    const dados: any = {
      name: nomeInteiro,
      email,
      pass: senha,
    };

    if (tipo === "usuario") {
      dados.cpf = cpf;
      dados.endereco = endereco;
      dados.phone = telefone;
    } else if (tipo === "ong") {
      dados.cnpj = cnpj;
      dados.endereco = endereco;
      dados.phone = telefone;
    }

    axios.post("postgresql://neondb_owner:npg_NI2wQ1TvCDzi@ep-bold-flower-adt7zbe3-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require", dados, {
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((resposta) => {
      alert("Cadastro realizado com sucesso!");
      console.log(resposta.data);
    })
    .catch((erro) => {
      console.error(erro);
      alert("Ocorreu um erro ao cadastrar. Tente novamente.");
    })
    .finally(() => {
      console.log("Requisição finalizada");
    });
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
              label={tipo === 'usuario' ? "Nome completo" : "Nome da ONG"}
              type="text"
              onChange={(texto) => setNomeInteiro(texto)}
            />

            <TextField
              label="E-mail"
              type="email"
              onChange={(texto) => setEmail(texto)}
            />

            <TextField
              label="Telefone"
              type="text"
              onChange={(texto) => setTelefone(texto)}
            />

            {tipo === 'usuario' ? (
              <TextField
                label="CPF"
                type="text"
                onChange={(texto) => setCpf(texto)}
              />
            ) : (
              <TextField
                label="CNPJ"
                type="text"
                onChange={(texto) => setCnpj(texto)}
              />
            )}

            <TextField
              label="Endereço"
              type="text"
              onChange={(texto) => setEndereco(texto)}
            />

            <TextField
              label="Senha"
              type="password"
              onChange={(texto) => setSenha(texto)}
            />

            <TextField
              label="Confirmar senha"
              type="password"
              onChange={(texto) => setConfirmarSenha(texto)}
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
    </>
  );
}
