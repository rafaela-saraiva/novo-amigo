"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./styles.module.css";
import api from "@/services/api";

export default function Configuracoes() {
  const { user, loading } = useAuth();
  const router = useRouter();

  const [modalAberto, setModalAberto] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");

  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }
  }, [user, loading, router]);

  async function atualizarDados() {
    if (pass && pass !== confirmarPass) {
      alert("As senhas não coincidem.");
      return;
    }

    try {
      setSalvando(true);

      const body: any = {
        name: nome,
        email: email
      };

      if (pass) {
        body.pass = pass;
      }

      await api.put(`/users/${user?.id}`, body);

      alert("Dados atualizados com sucesso!");

      setPass("");
      setConfirmarPass("");
      setModalAberto(false);

    } catch (err: any) {
      console.error(err);
      alert(err?.response?.data?.error || "Erro ao atualizar.");
    } finally {
      setSalvando(false);
    }
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
                  <span>Telefone: (***) *****</span>
                  <span>Aniversário: --/--/----</span>
                  <span>CPF: ***.***.***-**</span>
                </div>
              </div>
            </div>

            <button
              className={styles.editBtn}
              onClick={() => setModalAberto(true)}
            >
              Alterar Dados ✏️
            </button>
          </div>

        </div>
      </main>

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

              <button
                className={styles.cancelBtn}
                onClick={() => setModalAberto(false)}
              >
                Cancelar
              </button>

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

      <Footer />

    </div>
  );
}