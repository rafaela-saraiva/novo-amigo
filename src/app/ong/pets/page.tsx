'use client';

import Footer from "@/components/Footer";
import FeedbackPopup, { type FeedbackPopupState } from "@/components/FeedbackPopup";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

type Pet = {
  id: number;
  nome: string;
  foto?: string | string[] | null;
  raca?: string;
  especie?: string;
  idade?: number | string | null;
  descricao?: string | null;
  comoAdotar?: string | null;
  disponivel?: boolean;
  shelterId?: number;
  donoId?: string | number;
  donoNome?: string | null;
  donoTipo?: "usuario" | "ong";
};

type PetFormState = {
  nome: string;
  raca: string;
  especie: string;
  idade: string;
  descricao: string;
  comoAdotar: string;
  fotos: string[];
};

export default function OngPets() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const isONG = user?.tipo === "shelter";
  const myShelterId = useMemo(() => Number(user?.id), [user?.id]);

  const [busy, setBusy] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);
  const [feedbackPopup, setFeedbackPopup] = useState<FeedbackPopupState | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

  const [form, setForm] = useState<PetFormState>({
    nome: "",
    raca: "",
    especie: "",
    idade: "",
    descricao: "",
    comoAdotar: "",
    fotos: [],
  });

  function openFeedback(popup: FeedbackPopupState) {
    setFeedbackPopup(popup);
  }

  function closeFeedback() {
    setFeedbackPopup(null);
  }

  function isPetAdopted(pet: Pet) {
    const ownerId = Number(pet.donoId);
    if (!Number.isFinite(ownerId) || ownerId <= 0) return false;
    if (pet.donoTipo === "ong" && ownerId === myShelterId) return false;
    return true;
  }

  function getPetPhotos(pet: Pet) {
    if (Array.isArray(pet.foto)) return pet.foto.filter(Boolean);
    if (typeof pet.foto === "string" && pet.foto.trim()) return [pet.foto];
    return [];
  }

  useEffect(() => {
    if (loading) return;
    if (!user || !isONG) router.push("/");
  }, [user, loading, isONG, router]);

  async function buscarPets() {
    if (!token || !Number.isFinite(myShelterId)) return;

    try {
      setBusy(true);
      const res = await api.get(`/animals?shelterId=${myShelterId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const data = Array.isArray(res.data) ? (res.data as Pet[]) : [];
      const filtered = data.filter((p) => {
        if (!Number.isFinite(myShelterId)) return false;
        if (typeof p.shelterId === "number") return p.shelterId === myShelterId;
        if (p.donoTipo === "ong" && p.donoId != null) return Number(p.donoId) === myShelterId;
        return true;
      });

      setPets(filtered);
    } catch (err) {
      console.error(err);
      openFeedback({
        title: "Erro ao carregar pets",
        message: "Nao foi possivel buscar os pets da ONG agora.",
        variant: "error",
      });
    } finally {
      setBusy(false);
    }
  }

  async function handleAddFotos(files: FileList | null) {
    if (!files) return;

    const readAsDataUrl = (file: File) =>
      new Promise<string>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(String(reader.result || ""));
        reader.onerror = () => reject(new Error("Falha ao ler arquivo"));
        reader.readAsDataURL(file);
      });

    try {
      const urls = await Promise.all(Array.from(files).map(readAsDataUrl));
      const fotosValidas = urls.filter((item) => item.startsWith("data:image/"));
      setForm((prev) => ({ ...prev, fotos: [...prev.fotos, ...fotosValidas] }));
    } catch (err) {
      console.error(err);
      openFeedback({
        title: "Erro ao adicionar fotos",
        message: "Nao foi possivel carregar novas fotos agora.",
        variant: "error",
      });
    }
  }

  function removerFoto(index: number) {
    setForm((prev) => ({
      ...prev,
      fotos: prev.fotos.filter((_, idx) => idx !== index),
    }));
  }

  async function deletarPet(id: number) {
    openFeedback({
      mode: "confirm",
      title: "Deletar pet",
      message: "Tem certeza que deseja deletar esse pet? Essa acao nao pode ser desfeita.",
      variant: "warning",
      confirmLabel: "Deletar",
      cancelLabel: "Cancelar",
      onConfirm: () => confirmarDeletePet(id),
    });
  }

  async function confirmarDeletePet(id: number) {
    try {
      await api.delete(`/animals/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error(err);
      openFeedback({
        title: "Erro ao deletar pet",
        message: "Nao foi possivel remover esse pet agora.",
        variant: "error",
      });
    }
  }

  function removerAdocao(pet: Pet) {
    openFeedback({
      mode: "confirm",
      title: "Remover adocao",
      message: `Deseja remover o dono vinculado de "${pet.nome}" e deixar o pet disponivel novamente?`,
      variant: "warning",
      confirmLabel: "Remover dono",
      cancelLabel: "Cancelar",
      onConfirm: () => confirmarRemoverAdocao(pet),
    });
  }

  async function confirmarRemoverAdocao(pet: Pet) {
    try {
      await api.put(
        `/animals/${pet.id}`,
        {
          disponivel: true,
          donoId: null,
          donoNome: null,
          donoTipo: "ong",
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPets((prev) =>
        prev.map((p) =>
          p.id === pet.id
            ? { ...p, disponivel: true, donoId: undefined, donoNome: null, donoTipo: "ong" }
            : p
        )
      );
    } catch (err) {
      console.error(err);
      openFeedback({
        title: "Erro ao remover adocao",
        message: "Nao foi possivel remover o dono vinculado deste pet agora.",
        variant: "error",
      });
    }
  }

  async function toggleStatus(pet: Pet) {
    if (isPetAdopted(pet)) {
      openFeedback({
        title: "Pet adotado",
        message: "Este pet ja possui um dono vinculado e permanece indisponivel.",
        variant: "warning",
      });
      return;
    }

    try {
      const novoStatus = !pet.disponivel;

      await api.put(
        `/animals/${pet.id}`,
        {
          disponivel: novoStatus,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPets((prev) =>
        prev.map((p) => (p.id === pet.id ? { ...p, disponivel: novoStatus } : p))
      );
    } catch (err: unknown) {
      const axiosLike = err as { response?: { data?: unknown } };
      console.error(axiosLike?.response?.data ?? err);
      openFeedback({
        title: "Erro ao atualizar status",
        message: "Nao foi possivel alterar o status desse pet.",
        variant: "error",
      });
    }
  }

  function abrirModal(pet: Pet) {
    setPetSelecionado(pet);
    setForm({
      nome: pet.nome || "",
      raca: pet.raca || "",
      especie: pet.especie || "",
      idade: pet.idade != null ? String(pet.idade) : "",
      descricao: pet.descricao || "",
      comoAdotar: pet.comoAdotar || "",
      fotos: getPetPhotos(pet),
    });
    setIsModalOpen(true);
  }

  async function atualizarPet() {
    if (!petSelecionado) return;

    try {
      await api.put(
        `/animals/${petSelecionado.id}`,
        {
          nome: form.nome,
          raca: form.raca,
          especie: form.especie,
          idade: form.idade ? Number(form.idade) : null,
          descricao: form.descricao.trim() || null,
          comoAdotar: form.comoAdotar.trim() || null,
          foto: form.fotos,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setPets((prev) =>
        prev.map((p) =>
          p.id === petSelecionado.id
            ? {
                ...p,
                nome: form.nome,
                raca: form.raca,
                especie: form.especie,
                idade: form.idade ? Number(form.idade) : null,
                descricao: form.descricao.trim() || null,
                comoAdotar: form.comoAdotar.trim() || null,
                foto: form.fotos,
              }
            : p
        )
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      openFeedback({
        title: "Erro ao atualizar pet",
        message: "As alteracoes do pet nao puderam ser salvas agora.",
        variant: "error",
      });
    }
  }

  useEffect(() => {
    if (!loading && user && isONG && token) buscarPets();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, loading, user, isONG]);

  if (loading || !user || !isONG) return null;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Meus Pets</h1>

          {busy ? (
            <p>Carregando...</p>
          ) : pets.length === 0 ? (
            <p>Nenhum pet encontrado.</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Foto</th>
                  <th>Nome</th>
                  <th>Especie</th>
                  <th>Raca</th>
                  <th>Status</th>
                  <th>Acoes</th>
                </tr>
              </thead>

              <tbody>
                {pets.map((pet) => (
                  <tr key={pet.id}>
                    <td>
                      <img
                        src={
                          pet.foto
                            ? Array.isArray(pet.foto)
                              ? pet.foto[0]
                              : `http://localhost:4000/uploads/${pet.foto}`
                            : "https://placedog.net/100"
                        }
                        alt={pet.nome}
                        className={styles.image}
                      />
                    </td>

                    <td>{pet.nome}</td>
                    <td>{pet.especie || "-"}</td>
                    <td>{pet.raca || "-"}</td>

                    <td>
                      {isPetAdopted(pet) ? (
                        <span className={styles.inactive}>Adotado</span>
                      ) : pet.disponivel ? (
                        <span className={styles.active}>Ativo</span>
                      ) : (
                        <span className={styles.inactive}>Inativo</span>
                      )}
                    </td>

                    <td className={styles.actionsCell}>
                      {isPetAdopted(pet) ? (
                        <div className={styles.adoptedActions}>
                          <div className={styles.adoptedBox}>Adotado ❤</div>
                          <button
                            className={styles.releaseBtn}
                            onClick={() => removerAdocao(pet)}
                          >
                            Remover dono
                          </button>
                        </div>
                      ) : (
                        <div className={styles.actions}>
                          <button
                            className={styles.toggleBtn}
                            onClick={() => toggleStatus(pet)}
                          >
                            {pet.disponivel ? "Desativar" : "Ativar"}
                          </button>

                          <button
                            className={styles.editBtn}
                            onClick={() => abrirModal(pet)}
                          >
                            Editar
                          </button>

                          <button
                            className={styles.deleteBtn}
                            onClick={() => deletarPet(pet.id)}
                          >
                            Deletar
                          </button>
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {isModalOpen && (
  <div className={styles.modalOverlay}>
    <div className={styles.modal}>
      
      <div className={styles.modalHeader}>
        Editar Pet
      </div>

      <div className={styles.modalContent}>

        <div className={styles.field}>
          <label>Nome</label>
          <input
            value={form.nome}
            onChange={(e) => setForm({ ...form, nome: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Especie</label>
          <input
            value={form.especie}
            onChange={(e) => setForm({ ...form, especie: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Raca</label>
          <input
            value={form.raca}
            onChange={(e) => setForm({ ...form, raca: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Idade</label>
          <input
            type="number"
            min="0"
            value={form.idade}
            onChange={(e) => setForm({ ...form, idade: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Descricao</label>
          <textarea
            value={form.descricao}
            onChange={(e) => setForm({ ...form, descricao: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Como adotar</label>
          <textarea
            value={form.comoAdotar}
            onChange={(e) => setForm({ ...form, comoAdotar: e.target.value })}
          />
        </div>

        <div className={styles.field}>
          <label>Fotos</label>

          <label className={styles.uploadBtn}>
            Adicionar fotos
            <input
              className={styles.uploadInput}
              type="file"
              accept="image/*"
              multiple
              onChange={(e) => handleAddFotos(e.target.files)}
            />
          </label>

          {form.fotos.length > 0 ? (
            <div className={styles.photoGrid}>
              {form.fotos.map((foto, index) => (
                <div key={`${foto}-${index}`} className={styles.photoItem}>
                  <img
                    src={foto}
                    alt={`Foto ${index + 1}`}
                    className={styles.photoThumb}
                  />
                  <button
                    type="button"
                    className={styles.removePhotoBtn}
                    onClick={() => removerFoto(index)}
                  >
                    Remover
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p className={styles.photoEmpty}>Nenhuma foto adicionada.</p>
          )}
        </div>

      </div>

      <div className={styles.modalActions}>
        <button onClick={atualizarPet}>Salvar</button>
        <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
      </div>

    </div>
  </div>
)}

      <Footer />
      <FeedbackPopup popup={feedbackPopup} onClose={closeFeedback} />
    </div>
  );
}
