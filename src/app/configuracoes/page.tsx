"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import TextField from "@/components/TextField";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./styles.module.css";
import api from "@/services/api";

export default function Configuracoes() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  const [nome, setNome] = useState("");
  const [salvando, setSalvando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (user) {
      setNome(user.nome);
    }
  }, [user, loading, router]);

  async function atualizarNome() {
    try {
      setSalvando(true);
      await api.put(`/users/${user?.id}`, { nome });
      setSucesso(true);

      setTimeout(() => {
        setSucesso(false);
      }, 2000);

    } catch (err) {
      alert("Erro ao atualizar.");
    } finally {
      setSalvando(false);
    }
  }

  if (loading) return null;
  if (!user) return null;

  return (
    <>
      <Header />

      <div className={styles.container}>
        <div className={styles.card}>
          <h1 className={styles.title}>⚙️ Configurações</h1>

          <div className={styles.infoBox}>
            <p><strong>Email:</strong> {user.email}</p>
            <p>
              <strong>Tipo:</strong>{" "}
              {user.role === "ADMIN" ? "ONG 🐾" : "Usuário"}
            </p>
          </div>

          <TextField
            label="Nome"
            type="text"
            text={nome}
            onChange={setNome}
          />

          <button
            className={styles.saveBtn}
            onClick={atualizarNome}
            disabled={salvando}
          >
            {salvando ? "Salvando..." : "Salvar Alterações"}
          </button>

          {sucesso && (
            <p className={styles.success}>Alterado com sucesso 💖</p>
          )}

          <button
            className={styles.logoutBtn}
            onClick={() => {
              logout();
              router.push("/");
            }}
          >
            Sair da conta
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
}