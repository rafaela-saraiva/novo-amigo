'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function Configuracoes() {
  const { user, token, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const isOng = user?.role === 'ONG'; // ou o campo que você tiver
  const isAdmin = user?.email === 'admin@pet.com'; // ⭐ NOVO

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
      await api.put(`/users/${user?.id}/desativar`);
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
      await api.delete(`/users/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` }
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
                  <span>Telefone: (***) *****</span>
                  <span>CPF: ***.***.***-**</span>
                </div>
              </div>
            </div>

            <button className={styles.editBtn} onClick={() => setModalAberto(true)}>
              Alterar Dados ✏️
            </button>
          </div>

          {/* APARÊNCIA */}
          <div className={styles.themeSection}>
            <h2>Aparência</h2>
            <div className={styles.themeToggle}>
              <div className={styles.themeInfo}>
                <span className="material-symbols-outlined">
                  {theme === 'dark' ? 'dark_mode' : 'light_mode'}
                </span>
                <span>{theme === 'dark' ? 'Modo Escuro' : 'Modo Claro'}</span>
              </div>
              <button className={styles.toggleBtn} onClick={toggleTheme}>
                <span className={`${styles.toggleThumb} ${theme === 'dark' ? styles.toggleActive : ''}`} />
              </button>
            </div>
          </div>

          {/* AÇÕES */}
          <div className={styles.actionSection}>
            <h2>Ações da Conta</h2>

          {/* 👑 ADMIN */}
          {isAdmin && (
          <>
          <button
             className={styles.adminBtn}
              onClick={() => router.push('/admin/users')}
           >
            Gerenciar Usuários 👥
        </button>

          <button
            className={styles.adminBtn}
            onClick={() => router.push('/admin/pets')}
          >
          Gerenciar Pets 🐶
        </button>

        <button
        className={styles.adminBtn}
        onClick={() => router.push('/admin/ong')}
        >
        Gerenciar ONG 🏠
      </button>
      </>
)}

      

  <button className={styles.logoutBtn} onClick={encerrarSessao}>
    Sair da Conta
  </button>

  {!isAdmin && (
    <>
      <button className={styles.desativarBtn}>
        Desativar Conta
      </button>

      <button className={styles.deletarBtn}>
        Deletar Conta
      </button>
    </>
  )}
</div>
        </div>
      </main>

      {/* MODAL EDITAR */}
      {modalAberto && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Editar dados</h2>

            <input value={nome} onChange={(e) => setNome(e.target.value)} />
            <input value={email} onChange={(e) => setEmail(e.target.value)} />
            <input value={telefone} onChange={(e) => setTelefone(e.target.value)} />
            <input value={cpf} onChange={(e) => setCpf(e.target.value)} />

            <input type="password" placeholder="Nova senha" value={pass} onChange={(e) => setPass(e.target.value)} />
            <input type="password" placeholder="Confirmar senha" value={confirmarPass} onChange={(e) => setConfirmarPass(e.target.value)} />

            <button onClick={atualizarDados}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>
            <button onClick={() => setModalAberto(false)}>Cancelar</button>
          </div>
        </div>
      )}

      {/* MODAL DESATIVAR (só aparece se não for admin) */}
      {modalDesativar && !isAdmin && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Desativar Conta</h2>
            <button onClick={desativarConta}>Confirmar</button>
          </div>
        </div>
      )}

      {/* MODAL DELETAR (só aparece se não for admin) */}
      {modalDeletar && !isAdmin && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Deletar Conta</h2>
            <button onClick={deletarConta}>Confirmar</button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}