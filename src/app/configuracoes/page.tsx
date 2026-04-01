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
  raca: string;
  porte: string | null;
  sexo: string | null;
  idade: number | null;
  descricao: string | null;
  foto: string[];
  disponivel: boolean;
  vacinado: boolean;
  castrado: boolean;
  tags: string[];
  comoAdotar: string | null;
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
  const [editAnimal, setEditAnimal] = useState<AnimalItem | null>(null);
  const [editForm, setEditForm] = useState({
    nome: '', especie: '', raca: '', porte: '', sexo: '', idade: '',
    descricao: '', vacinado: false, castrado: false, comoAdotar: ''
  });
  const [salvandoAnimal, setSalvandoAnimal] = useState(false);

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

  function abrirEditAnimal(a: AnimalItem) {
    setEditAnimal(a);
    setEditForm({
      nome: a.nome || '',
      especie: a.especie || '',
      raca: a.raca || '',
      porte: a.porte || '',
      sexo: a.sexo || '',
      idade: a.idade != null ? String(a.idade) : '',
      descricao: a.descricao || '',
      vacinado: a.vacinado,
      castrado: a.castrado,
      comoAdotar: a.comoAdotar || '',
    });
  }

  async function salvarEditAnimal() {
    if (!editAnimal) return;
    try {
      setSalvandoAnimal(true);
      await api.put(`/animals/${editAnimal.id}`, {
        nome: editForm.nome,
        especie: editForm.especie,
        raca: editForm.raca,
        porte: editForm.porte || null,
        sexo: editForm.sexo || null,
        idade: editForm.idade ? Number(editForm.idade) : null,
        descricao: editForm.descricao || null,
        vacinado: editForm.vacinado,
        castrado: editForm.castrado,
        comoAdotar: editForm.comoAdotar || null,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setEditAnimal(null);
      carregarMeusAnimais();
    } catch {
      alert("Erro ao atualizar animal.");
    } finally {
      setSalvandoAnimal(false);
    }
  }

  async function toggleAdotado(a: AnimalItem) {
    const novoStatus = !a.disponivel;
    const msg = novoStatus
      ? `Marcar "${a.nome}" como disponível novamente?`
      : `Marcar "${a.nome}" como adotado?`;
    if (!confirm(msg)) return;

    try {
      await api.put(`/animals/${a.id}`, {
        disponivel: novoStatus,
      }, { headers: { Authorization: `Bearer ${token}` } });
      carregarMeusAnimais();
    } catch {
      alert("Erro ao atualizar status.");
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
            <div className={styles.actionSection} style={{ textAlign: 'left' }}>
              <h2 style={{ textAlign: 'center' }}>Meus Animais Cadastrados</h2>

              {loadingAnimais && <p style={{ textAlign: 'center' }}>Carregando...</p>}

              {!loadingAnimais && meusAnimais.length === 0 && (
                <p style={{ opacity: 0.6, textAlign: 'center' }}>Nenhum animal cadastrado ainda.</p>
              )}

              <div className={styles.animaisGrid}>
                {meusAnimais.map((a) => (
                  <div key={a.id} className={styles.animalCard}>
                    <div className={styles.animalCardImage}>
                      {a.foto?.[0] ? (
                        <img src={a.foto[0]} alt={a.nome} />
                      ) : (
                        <div className={styles.animalCardPlaceholder}>🐾</div>
                      )}
                      <span className={`${styles.animalBadge} ${a.disponivel ? styles.badgeDisponivel : styles.badgeAdotado}`}>
                        {a.disponivel ? 'Disponível' : 'Adotado'}
                      </span>
                    </div>

                    <div className={styles.animalCardBody}>
                      <h3 className={styles.animalCardNome}>{a.nome}</h3>
                      <p className={styles.animalCardInfo}>
                        {a.especie}{a.raca ? ` • ${a.raca}` : ''}{a.idade != null ? ` • ${a.idade} ${a.idade === 1 ? 'ano' : 'anos'}` : ''}
                      </p>

                      <div className={styles.animalCardTags}>
                        {a.vacinado && <span className={styles.tagVacinado}>Vacinado</span>}
                        {a.castrado && <span className={styles.tagCastrado}>Castrado</span>}
                        {a.porte && <span className={styles.tagPorte}>{a.porte}</span>}
                      </div>

                      <div className={styles.animalCardActions}>
                        <button
                          className={styles.btnEditar}
                          onClick={() => abrirEditAnimal(a)}
                        >
                          ✏️ Editar
                        </button>
                        <button
                          className={a.disponivel ? styles.btnAdotado : styles.btnDisponivel}
                          onClick={() => toggleAdotado(a)}
                        >
                          {a.disponivel ? '🏠 Marcar Adotado' : '↩️ Marcar Disponível'}
                        </button>
                        <Link href={`/animal/${a.id}`} className={styles.btnVer}>
                          Ver →
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {meusAnimais.length > 0 && (
                <div style={{ textAlign: 'center', marginTop: '20px' }}>
                  <Link href="/nossos-animais" className={styles.verTodosLink}>
                    + Cadastrar mais animais
                  </Link>
                </div>
              )}
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

      {/* MODAL EDITAR ANIMAL */}
      {editAnimal && (
        <div className={styles.overlay}>
          <div className={styles.modal}>
            <h2>Editar Animal — {editAnimal.nome}</h2>

            <div className={styles.editAnimalGrid}>
              <div>
                <label className={styles.editLabel}>Nome</label>
                <input className={styles.input} value={editForm.nome}
                  onChange={(e) => setEditForm(p => ({ ...p, nome: e.target.value }))} />
              </div>
              <div>
                <label className={styles.editLabel}>Espécie</label>
                <select className={styles.input} value={editForm.especie}
                  onChange={(e) => setEditForm(p => ({ ...p, especie: e.target.value }))}>
                  <option value="cachorro">Cachorro</option>
                  <option value="gato">Gato</option>
                  <option value="passaro">Pássaro</option>
                  <option value="coelho">Coelho</option>
                  <option value="hamster">Hamster</option>
                  <option value="fazenda">Fazenda</option>
                  <option value="exotico">Exótico</option>
                </select>
              </div>
              <div>
                <label className={styles.editLabel}>Raça</label>
                <input className={styles.input} value={editForm.raca}
                  onChange={(e) => setEditForm(p => ({ ...p, raca: e.target.value }))} />
              </div>
              <div>
                <label className={styles.editLabel}>Porte</label>
                <select className={styles.input} value={editForm.porte}
                  onChange={(e) => setEditForm(p => ({ ...p, porte: e.target.value }))}>
                  <option value="">—</option>
                  <option value="pequeno">Pequeno</option>
                  <option value="medio">Médio</option>
                  <option value="grande">Grande</option>
                </select>
              </div>
              <div>
                <label className={styles.editLabel}>Sexo</label>
                <select className={styles.input} value={editForm.sexo}
                  onChange={(e) => setEditForm(p => ({ ...p, sexo: e.target.value }))}>
                  <option value="">—</option>
                  <option value="macho">Macho</option>
                  <option value="femea">Fêmea</option>
                </select>
              </div>
              <div>
                <label className={styles.editLabel}>Idade</label>
                <input className={styles.input} type="number" value={editForm.idade}
                  onChange={(e) => setEditForm(p => ({ ...p, idade: e.target.value }))} />
              </div>
            </div>

            <div style={{ marginTop: '16px' }}>
              <label className={styles.editLabel}>Descrição</label>
              <textarea className={styles.input} style={{ height: 80, padding: '10px', resize: 'vertical' }}
                value={editForm.descricao}
                onChange={(e) => setEditForm(p => ({ ...p, descricao: e.target.value }))} />
            </div>

            <div style={{ marginTop: '16px' }}>
              <label className={styles.editLabel}>Como adotar</label>
              <textarea className={styles.input} style={{ height: 60, padding: '10px', resize: 'vertical' }}
                value={editForm.comoAdotar}
                onChange={(e) => setEditForm(p => ({ ...p, comoAdotar: e.target.value }))} />
            </div>

            <div style={{ display: 'flex', gap: '20px', marginTop: '16px' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={editForm.vacinado}
                  onChange={(e) => setEditForm(p => ({ ...p, vacinado: e.target.checked }))} />
                Vacinado
              </label>
              <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                <input type="checkbox" checked={editForm.castrado}
                  onChange={(e) => setEditForm(p => ({ ...p, castrado: e.target.checked }))} />
                Castrado
              </label>
            </div>

            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '24px' }}>
              <button className={styles.cancelBtn} onClick={() => setEditAnimal(null)}>
                Cancelar
              </button>
              <button className={styles.confirmBtn} onClick={salvarEditAnimal} disabled={salvandoAnimal}>
                {salvandoAnimal ? "Salvando..." : "Salvar Alterações"}
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}