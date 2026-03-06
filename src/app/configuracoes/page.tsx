"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./styles.module.css";
import api from "@/services/api";

export default function Configuracoes() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDesativar, setModalDesativar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [cpf, setCpf] = useState("");

  const [pass, setPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [acaoExecutando, setAcaoExecutando] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      setTelefone(user.phone || "");
      setCpf(user.cpf || "");
    }
  }, [user, loading, router]);

  async function atualizarDados() {
    if (pass && pass !== confirmarPass) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      setSalvando(true);

      await api.put(`/users/${user?.id}`, {
        name: nome,
        email: email,
        phone: telefone,
        cpf: cpf,
        pass: pass || undefined
      });

      setModalAberto(false);
      alert("Dados atualizados com sucesso!");
    } catch {
      alert("Erro ao atualizar.");
    } finally {
      setSalvando(false);
    }
  }

  async function desativarConta() {
    try {
      setAcaoExecutando(true);
      await api.put(`/users/${user.id}/desativar`);
      setModalDesativar(false);
      alert("Conta desativada. Você será deslogado.");
      logout?.();
      router.push("/");
    } catch {
      alert("Erro ao desativar conta.");
    } finally {
      setAcaoExecutando(false);
    }
  }

  async function deletarConta() {
  try {
    setAcaoExecutando(true);
    await api.delete(`/users/${user.id}`, {
      headers: { Authorization: `Bearer ${user.token}` }
    });
    setModalDeletar(false);
    alert("Conta deletada com sucesso.");
    logout?.();
    router.push("/");
  } catch (err) {
    console.error(err);
    alert("Erro ao deletar conta.");
  } finally {
    setAcaoExecutando(false);
  }
}

  function encerrarSessao() {
    logout?.();
    router.push("/");
  }

  if (loading || !user) return null;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>

          <p className={styles.subtitle}>Sua conta</p>
          <h1 className={styles.title}>Dados Pessoais</h1>

          <div className={styles.userCard}>
            <div className={styles.userLeft}>
              <div className={styles.userInfo}>
                <p className={styles.userName}>{nome}</p>
                <div className={styles.dataGrid}>
                  <span>E-mail: {email}</span>
                  <span>Telefone: {telefone ? "(***) *****" : "(***) *****"}</span>
                  <span>CPF: {cpf ? "***.***.***-**" : "***.***.***-**"}</span>
                </div>
              </div>
            </div>

            <button className={styles.editBtn} onClick={() => setModalAberto(true)}>
              Alterar Dados ✏️
            </button>
          </div>

          {/* SEÇÃO DE AÇÕES */}
          <div className={styles.actionSection}>
            <h2>Ações da Conta</h2>
            <button className={styles.logoutBtn} onClick={() => setModalAberto(false) || encerrarSessao()}>
              Sair da Conta
            </button>
            <button className={styles.desativarBtn} onClick={() => setModalDesativar(true)}>
              Desativar Conta
            </button>
            <button className={styles.deletarBtn} onClick={() => setModalDeletar(true)}>
              Deletar Conta
            </button>
          </div>
        </div>
      </main>

      {/* MODAL DE EDITAR DADOS */}
      {modalAberto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2 className={styles.modalTitle}>Editar dados pessoais</h2>

            <div className={styles.formGrid}>
              <div>
                <label>Nome</label>
                <input
                  className={styles.input}
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>
              <div>
                <label>Email</label>
                <input
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label>Telefone</label>
                <input
                  className={styles.input}
                  value={telefone}
                  onChange={(e) => setTelefone(e.target.value)}
                />
              </div>
              <div>
                <label>CPF</label>
                <input
                  className={styles.input}
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                />
              </div>
              <div>
                <label>Nova senha</label>
                <input
                  type="password"
                  className={styles.input}
                  value={pass}
                  onChange={(e) => setPass(e.target.value)}
                />
              </div>
              <div>
                <label>Confirmar senha</label>
                <input
                  type="password"
                  className={styles.input}
                  value={confirmarPass}
                  onChange={(e) => setConfirmarPass(e.target.value)}
                />
              </div>
            </div>

            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={() => setModalAberto(false)}>Cancelar</button>
              <button
                className={styles.confirmBtn}
                onClick={atualizarDados}
                disabled={salvando}
              >
                {salvando ? "Salvando..." : "Confirmar dados"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DESATIVAR */}
      {modalDesativar && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Desativar Conta</h2>
            <p>Tem certeza que deseja desativar sua conta temporariamente?</p>
            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={() => setModalDesativar(false)}>Cancelar</button>
              <button className={styles.desativarBtn} onClick={desativarConta} disabled={acaoExecutando}>
                {acaoExecutando ? "Processando..." : "Desativar"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL DE DELETAR */}
      {modalDeletar && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Deletar Conta</h2>
            <p>Essa ação é irreversível! Tem certeza que deseja deletar sua conta?</p>
            <div className={styles.actions}>
              <button className={styles.cancelBtn} onClick={() => setModalDeletar(false)}>Cancelar</button>
              <button className={styles.deletarBtn} onClick={deletarConta} disabled={acaoExecutando}>
                {acaoExecutando ? "Processando..." : "Deletar"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}