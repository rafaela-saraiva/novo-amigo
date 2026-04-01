'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import api from "@/services/api";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface AnimalItem {
  id: number;
  nome: string;
  especie: string;
  foto: string[];
  disponivel: boolean;
}

export default function Configuracoes() {
  const { user, token, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();

  const isAdmin = user?.email === 'admin@pet.com';
  const isONG = user?.tipo === 'shelter';

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDesativar, setModalDesativar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const [pass, setPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [acaoExecutando, setAcaoExecutando] = useState(false);

  const [meusAnimais, setMeusAnimais] = useState<AnimalItem[]>([]);
  const [loadingAnimais, setLoadingAnimais] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (user) {
      setNome(user.nome);
      setEmail(user.email);
    }

    if (user?.tipo === 'shelter') {
      carregarMeusAnimais();
    }
  }, [user, loading, router]);

  async function carregarMeusAnimais() {
    try {
      setLoadingAnimais(true);
      const res = await api.get(`/animals?shelterId=${user?.id}`);
      setMeusAnimais(res.data);
    } catch {
      // silencioso
    } finally {
      setLoadingAnimais(false);
    }
  }

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

          {/* MEUS ANIMAIS — só para ONG */}
          {isONG && (
            <div className={styles.actionSection}>
              <h2>Meus Animais Cadastrados</h2>

              {loadingAnimais && <p>Carregando...</p>}

              {!loadingAnimais && meusAnimais.length === 0 && (
                <p style={{ opacity: 0.6 }}>Nenhum animal cadastrado ainda.</p>
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', marginTop: '12px' }}>
                {meusAnimais.map((a) => (
                  <Link
                    key={a.id}
                    href={`/animal/${a.id}`}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      border: '1px solid var(--border, #ddd)',
                      background: 'var(--card-bg, #f9f9f9)',
                      textDecoration: 'none',
                      color: 'inherit',
                      minWidth: '180px'
                    }}
                  >
                    {a.foto?.[0] && (
                      <img
                        src={a.foto[0]}
                        alt={a.nome}
                        style={{ width: 40, height: 40, borderRadius: '50%', objectFit: 'cover' }}
                      />
                    )}
                    <div>
                      <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem' }}>{a.nome}</p>
                      <p style={{ margin: 0, fontSize: '0.75rem', opacity: 0.6 }}>{a.especie} • {a.disponivel ? 'Disponível' : 'Adotado'}</p>
                    </div>
                  </Link>
                ))}
              </div>

              <Link
                href="/nossos-animais"
                style={{ display: 'inline-block', marginTop: '16px', fontSize: '0.85rem', opacity: 0.7 }}
              >
                Ver todos os animais →
              </Link>
            </div>
          )}

          {/* AÇÕES */}
          <div className={styles.actionSection}>
            <h2>Ações da Conta</h2>

            <button className={styles.logoutBtn} onClick={encerrarSessao}>
              Sair da Conta
            </button>

            {!isAdmin && (
              <>
                <button 
                  className={styles.desativarBtn}
                  onClick={() => setModalDesativar(true)}
                >
                  Desativar Conta
                </button>

                <button 
                  className={styles.deletarBtn}
                  onClick={() => setModalDeletar(true)}
                >
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

            <input 
              placeholder="Nome"
              value={nome} 
              onChange={(e) => setNome(e.target.value)} 
            />

            <input 
              placeholder="Email"
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />

            <input 
              type="password" 
              placeholder="Nova senha" 
              value={pass} 
              onChange={(e) => setPass(e.target.value)} 
            />

            <input 
              type="password" 
              placeholder="Confirmar senha" 
              value={confirmarPass} 
              onChange={(e) => setConfirmarPass(e.target.value)} 
            />

            <button onClick={atualizarDados}>
              {salvando ? "Salvando..." : "Salvar"}
            </button>

            <button onClick={() => setModalAberto(false)}>
              Cancelar
            </button>
          </div>
        </div>
      )}

      {/* MODAIS só para usuário comum */}
      {!isAdmin && modalDesativar && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Desativar Conta</h2>
            <button onClick={desativarConta}>
              {acaoExecutando ? "Processando..." : "Confirmar"}
            </button>
          </div>
        </div>
      )}

      {!isAdmin && modalDeletar && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Deletar Conta</h2>
            <button onClick={deletarConta}>
              {acaoExecutando ? "Processando..." : "Confirmar"}
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}