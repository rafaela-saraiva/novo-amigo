'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import api from "@/services/api";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";
import styles from "./styles.module.css";

type FeedbackVariant = "success" | "error" | "warning";

interface FeedbackModalState {
  title: string;
  message: string;
  variant: FeedbackVariant;
  onClose?: () => void;
}

export default function Configuracoes() {
  return (
    <Suspense fallback={null}>
      <ConfiguracoesInner />
    </Suspense>
  );
}

function ConfiguracoesInner() {
  const { user, token, loading, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const searchParams = useSearchParams();

  const isAdmin = user?.email === "admin@pet.com";
  const isONG = user?.tipo === "shelter";

  const [modalAberto, setModalAberto] = useState(false);
  const [modalDesativar, setModalDesativar] = useState(false);
  const [modalDeletar, setModalDeletar] = useState(false);
  const [feedbackModal, setFeedbackModal] = useState<FeedbackModalState | null>(null);

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefoneUser, setTelefoneUser] = useState("");

  const [pass, setPass] = useState("");
  const [confirmarPass, setConfirmarPass] = useState("");

  const [salvando, setSalvando] = useState(false);
  const [acaoExecutando, setAcaoExecutando] = useState(false);

  const [ongDescricao, setOngDescricao] = useState("");
  const [ongFotos, setOngFotos] = useState<string[]>([]);
  const [salvandoPerfilOng, setSalvandoPerfilOng] = useState(false);

  const requirePhone = searchParams?.get("requirePhone") === "1";
  const nextPath = searchParams?.get("next") || "";

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (user) {
      setNome(user.nome);
      setEmail(user.email);
      const phone =
        (user as unknown as { phone?: string }).phone ||
        (user as unknown as { telefone?: string }).telefone ||
        "";
      setTelefoneUser(phone);
    }

    if (user?.tipo === "shelter") {
      const shelterUser = user as unknown as { descricao?: string; fotos?: string[] };
      setOngDescricao(shelterUser.descricao || "");
      setOngFotos(Array.isArray(shelterUser.fotos) ? shelterUser.fotos.slice(0, 5) : []);
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (!user) return;
    if (user.tipo === "shelter") return;
    if (!requirePhone) return;
    if (telefoneUser && telefoneUser.trim()) return;
    setModalAberto(true);
  }, [user, requirePhone, telefoneUser]);

  function openFeedback(
    variant: FeedbackVariant,
    title: string,
    message: string,
    onClose?: () => void
  ) {
    setFeedbackModal({ variant, title, message, onClose });
  }

  function closeFeedback() {
    const onClose = feedbackModal?.onClose;
    setFeedbackModal(null);
    onClose?.();
  }

  async function handleAddOngFotos(files: FileList | null) {
    if (!files) return;
    const remaining = 5 - ongFotos.length;
    if (remaining <= 0) return;

    const picked = Array.from(files).slice(0, remaining);

    const readAsDataUrl = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
        reader.readAsDataURL(file);
      });

    try {
      const urls = await Promise.all(picked.map(readAsDataUrl));
      const filtered = urls.filter((u) => u && u.startsWith("data:image/"));
      setOngFotos((prev) => [...prev, ...filtered].slice(0, 5));
    } catch {
      openFeedback(
        "error",
        "Falha ao carregar fotos",
        "Nao conseguimos processar essas imagens agora. Tente novamente com arquivos PNG ou JPG."
      );
    }
  }

  function removerOngFoto(index: number) {
    setOngFotos((prev) => prev.filter((_, i) => i !== index));
  }

  async function salvarPerfilOng() {
    if (!user?.id) return;

    try {
      setSalvandoPerfilOng(true);

      const payload = {
        responsavel: ongDescricao,
        urlImage: ongFotos.slice(0, 5),
      };

      await api.put(`/shelters/${user.id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      }).catch(() => null);

      openFeedback("success", "Perfil atualizado", "As informacoes da ONG foram salvas com sucesso.");
    } catch {
      openFeedback("error", "Erro ao salvar perfil", "Nao foi possivel atualizar o perfil da ONG agora.");
    } finally {
      setSalvandoPerfilOng(false);
    }
  }

  async function atualizarDados() {
    if (pass && pass !== confirmarPass) {
      openFeedback("warning", "Senhas diferentes", "A nova senha e a confirmacao precisam ser iguais.");
      return;
    }

    if (requirePhone && user?.tipo !== "shelter" && !telefoneUser.trim()) {
      openFeedback("warning", "Telefone obrigatorio", "Adicione seu telefone para continuar e facilitar o contato.");
      return;
    }

    try {
      setSalvando(true);

      await api.put(`/users/${user?.id}`, {
        name: nome,
        email,
        pass: pass || undefined,
        phone: telefoneUser.trim() || undefined,
      });

      setModalAberto(false);
      const safeNext = nextPath && nextPath.startsWith("/animal/") ? nextPath : "";

      openFeedback(
        "success",
        "Dados atualizados",
        "Suas informacoes foram salvas com sucesso.",
        requirePhone && safeNext ? () => router.push(safeNext) : undefined
      );
    } catch {
      openFeedback("error", "Erro ao atualizar", "Nao foi possivel salvar suas alteracoes agora.");
    } finally {
      setSalvando(false);
    }
  }

  async function desativarConta() {
    try {
      setAcaoExecutando(true);
      await api.put(`/users/${user?.id}/desativar`);
      setModalDesativar(false);
      openFeedback(
        "success",
        "Conta desativada",
        "Sua conta foi desativada e voce sera desconectado em seguida.",
        () => {
          logout?.();
          router.push("/");
        }
      );
    } catch {
      openFeedback("error", "Erro ao desativar conta", "Nao conseguimos desativar sua conta neste momento.");
    } finally {
      setAcaoExecutando(false);
    }
  }

  async function deletarConta() {
    try {
      setAcaoExecutando(true);
      await api.delete(`/users/${user?.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setModalDeletar(false);
      openFeedback(
        "success",
        "Conta deletada",
        "Sua conta foi removida com sucesso.",
        () => {
          logout?.();
          router.push("/");
        }
      );
    } catch (err) {
      console.error(err);
      openFeedback("error", "Erro ao deletar conta", "Nao foi possivel deletar sua conta agora.");
    } finally {
      setAcaoExecutando(false);
    }
  }

  function encerrarSessao() {
    logout?.();
    router.push("/");
  }

  if (loading || !user) return null;

  const feedbackIcon =
    feedbackModal?.variant === "success"
      ? "check_circle"
      : feedbackModal?.variant === "warning"
        ? "warning"
        : "error";

  const feedbackVariantClass =
    feedbackModal?.variant === "success"
      ? styles.feedbackSuccess
      : feedbackModal?.variant === "warning"
        ? styles.feedbackWarning
        : styles.feedbackError;

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
              Alterar Dados
            </button>
          </div>

          <div className={styles.themeSection}>
            <h2>Aparencia</h2>
            <div className={styles.themeToggle}>
              <div className={styles.themeInfo}>
                <span className="material-symbols-outlined">
                  {theme === "dark" ? "dark_mode" : "light_mode"}
                </span>
                <span>{theme === "dark" ? "Modo Escuro" : "Modo Claro"}</span>
              </div>
              <button className={styles.toggleBtn} onClick={toggleTheme}>
                <span className={`${styles.toggleThumb} ${theme === "dark" ? styles.toggleActive : ""}`} />
              </button>
            </div>
          </div>

          {isONG && (
            <section className={styles.ongSection}>
              <div className={styles.sectionHeaderRow}>
                <div>
                  <h2 className={styles.sectionTitle}>Perfil da ONG</h2>
                  <p className={styles.sectionSubtitle}>
                    Essas informacoes aparecem no seu perfil publico e ajudam adotantes a confiar no processo.
                  </p>
                </div>

                <button
                  className={styles.ongViewBtn}
                  onClick={() => router.push(`/ongs/${user?.id}`)}
                  type="button"
                >
                  Ver perfil publico
                </button>
              </div>

              <div className={styles.ongFormGrid}>
                <div className={styles.ongCard}>
                  <div className={styles.ongCardHeader}>
                    <span className={styles.ongCardTitle}>Descricao</span>
                    <span className={styles.ongCardHint}>{ongDescricao.length}/600</span>
                  </div>
                  <textarea
                    className={styles.ongTextarea}
                    value={ongDescricao}
                    maxLength={600}
                    onChange={(e) => setOngDescricao(e.target.value)}
                    placeholder="Conte um pouco sobre a ONG, a missao e como funcionam as adocoes..."
                  />
                </div>

                <div className={styles.ongCard}>
                  <div className={styles.ongCardHeader}>
                    <span className={styles.ongCardTitle}>Fotos</span>
                    <span className={styles.ongCardHint}>{ongFotos.length}/5</span>
                  </div>

                  <div className={styles.ongUploadRow}>
                    <label className={styles.ongUploadBtn}>
                      Adicionar fotos
                      <input
                        className={styles.ongUploadInput}
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={(e) => handleAddOngFotos(e.target.files)}
                        disabled={ongFotos.length >= 5}
                      />
                    </label>
                    <span className={styles.ongUploadHint}>PNG/JPG ate 5 imagens</span>
                  </div>

                  {ongFotos.length > 0 ? (
                    <div className={styles.ongPhotosGrid}>
                      {ongFotos.map((src, idx) => (
                        <div key={`${src}-${idx}`} className={styles.ongPhotoItem}>
                          <img src={src} alt={`foto ${idx + 1}`} />
                          <button
                            type="button"
                            className={styles.ongPhotoRemove}
                            onClick={() => removerOngFoto(idx)}
                            aria-label="Remover foto"
                          >
                            x
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className={styles.ongEmptyPhotos}>
                      <span className="material-symbols-outlined">imagesmode</span>
                      <span>Adicione fotos para deixar sua ONG mais confiavel.</span>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.ongActionsRow}>
                <button
                  className={styles.ongSaveBtn}
                  onClick={salvarPerfilOng}
                  disabled={salvandoPerfilOng}
                >
                  {salvandoPerfilOng ? "Salvando..." : "Salvar alteracoes"}
                </button>
              </div>
            </section>
          )}

          <div className={styles.actionSection}>
            <h2>Acoes da Conta</h2>

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

            {!isONG && (
              <input
                type="tel"
                placeholder={requirePhone ? "Telefone (obrigatorio)" : "Telefone"}
                value={telefoneUser}
                onChange={(e) => setTelefoneUser(e.target.value)}
              />
            )}

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

      {feedbackModal && (
        <div className={styles.overlay} onClick={closeFeedback}>
          <div
            className={`${styles.feedbackModal} ${feedbackVariantClass}`}
            onClick={(e) => e.stopPropagation()}
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="feedback-modal-title"
          >
            <div className={styles.feedbackIconWrap}>
              <span className={`material-symbols-outlined ${styles.feedbackIcon}`}>{feedbackIcon}</span>
            </div>

            <div className={styles.feedbackContent}>
              <h3 id="feedback-modal-title" className={styles.feedbackTitle}>
                {feedbackModal.title}
              </h3>
              <p className={styles.feedbackMessage}>{feedbackModal.message}</p>
            </div>

            <button className={styles.feedbackButton} onClick={closeFeedback}>
              Entendi
            </button>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
