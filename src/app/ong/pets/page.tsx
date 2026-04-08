'use client';

import Footer from "@/components/Footer";
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
  disponivel?: boolean;
  shelterId?: number;
  donoId?: string | number;
  donoTipo?: "usuario" | "ong";
};

export default function OngPets() {
  const router = useRouter();
  const { user, token, loading } = useAuth();

  const isONG = user?.tipo === "shelter";
  const myShelterId = useMemo(() => Number(user?.id), [user?.id]);

  const [busy, setBusy] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

  const [form, setForm] = useState({
    nome: "",
    raca: "",
    especie: ""
  });

  useEffect(() => {
    if (loading) return;
    if (!user || !isONG) router.push("/");
  }, [user, loading, isONG, router]);

  async function buscarPets() {
    if (!token || !Number.isFinite(myShelterId)) return;

    try {
      setBusy(true);
      const res = await api.get(`/animals?shelterId=${myShelterId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const data = Array.isArray(res.data) ? (res.data as Pet[]) : [];
      const filtered = data.filter((p) => {
        if (!Number.isFinite(myShelterId)) return false;
        if (typeof p.shelterId === "number") return p.shelterId === myShelterId;
        if (p.donoTipo === "ong" && p.donoId != null) return Number(p.donoId) === myShelterId;
        return true; // backend já filtrou
      });

      setPets(filtered);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar seus pets");
    } finally {
      setBusy(false);
    }
  }

  async function deletarPet(id: number) {
    if (!confirm("Tem certeza que deseja deletar esse pet?")) return;

    try {
      await api.delete(`/animals/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPets((prev) => prev.filter((pet) => pet.id !== id));
    } catch (err) {
      console.error(err);
      alert("Erro ao deletar pet");
    }
  }

  async function toggleStatus(pet: Pet) {
    try {
      const novoStatus = !pet.disponivel;

      await api.put(`/animals/${pet.id}`, {
        disponivel: novoStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPets((prev) =>
        prev.map((p) => (p.id === pet.id ? { ...p, disponivel: novoStatus } : p))
      );
    } catch (err: unknown) {
      const axiosLike = err as { response?: { data?: unknown } };
      console.error(axiosLike?.response?.data ?? err);
      alert("Erro ao atualizar status");
    }
  }

  function abrirModal(pet: Pet) {
    setPetSelecionado(pet);
    setForm({
      nome: pet.nome || "",
      raca: pet.raca || "",
      especie: pet.especie || ""
    });
    setIsModalOpen(true);
  }

  async function atualizarPet() {
    if (!petSelecionado) return;

    try {
      await api.put(`/animals/${petSelecionado.id}`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPets((prev) =>
        prev.map((p) => (p.id === petSelecionado.id ? { ...p, ...form } : p))
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar pet");
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
                  <th>Espécie</th>
                  <th>Raça</th>
                  <th>Status</th>
                  <th>Ações</th>
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
                    <td>{pet.especie || "—"}</td>
                    <td>{pet.raca || "—"}</td>

                    <td>
                      {pet.disponivel ? (
                        <span className={styles.active}>Ativo</span>
                      ) : (
                        <span className={styles.inactive}>Inativo</span>
                      )}
                    </td>

                    <td className={styles.actionsCell}>
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
            <h2>Editar Pet</h2>

            <div className={styles.field}>
              <label>Nome</label>
              <input
                value={form.nome}
                onChange={(e) => setForm({ ...form, nome: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>Espécie</label>
              <input
                value={form.especie}
                onChange={(e) => setForm({ ...form, especie: e.target.value })}
              />
            </div>

            <div className={styles.field}>
              <label>Raça</label>
              <input
                value={form.raca}
                onChange={(e) => setForm({ ...form, raca: e.target.value })}
              />
            </div>

            <div className={styles.modalActions}>
              <button onClick={atualizarPet}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>Cancelar</button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
