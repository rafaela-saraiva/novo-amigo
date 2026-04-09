'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import LoadingState from "@/components/LoadingState";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

type Pet = {
  id: number;
  nome: string;
  foto?: any;
  raca?: string;
  especie?: string;
  disponivel?: boolean;
  ong?: {
    nome: string;
  };
};

export default function AdminPets() {
  const { token } = useAuth();

  const [loading, setLoading] = useState(true);
  const [pets, setPets] = useState<Pet[]>([]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [petSelecionado, setPetSelecionado] = useState<Pet | null>(null);

  const [form, setForm] = useState({
    nome: "",
    raca: "",
    especie: ""
  });

  async function buscarPets() {
    try {
      const res = await api.get("/animals", {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPets(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao buscar pets");
    } finally {
      setLoading(false);
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

  // ✅ CORRIGIDO
  async function toggleStatus(pet: Pet) {
    try {
      const novoStatus = !pet.disponivel;

      await api.put(`/animals/${pet.id}`, {
        nome: pet.nome,
        especie: pet.especie,
        raca: pet.raca,
        disponivel: novoStatus
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setPets((prev: Pet[]) =>
        prev.map((p) =>
          p.id === pet.id
            ? { ...p, disponivel: novoStatus }
            : p
        )
      );

    } catch (err: any) {
      console.error(err.response?.data || err);
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
        prev.map((p) =>
          p.id === petSelecionado.id ? { ...p, ...form } : p
        )
      );

      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar pet");
    }
  }

  useEffect(() => {
    if (token) buscarPets();
  }, [token]);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Gerenciar Pets </h1>

          {loading ? (
            <LoadingState title="Carregando pets..." subtitle="Buscando todos os animais cadastrados" variant="inline" />
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
                  <th>ONG</th>
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

                    {/* ✅ CORRIGIDO */}
                    <td>
                      {pet.disponivel ? (
                        <span className={styles.active}>Ativo</span>
                      ) : (
                        <span className={styles.inactive}>Inativo</span>
                      )}
                    </td>

                    <td>{pet.ong?.nome || "—"}</td>

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

      {/* MODAL */}
      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Editar Pet 🐾</h2>

            <div className={styles.field}>
              <label>Nome</label>
              <input
                value={form.nome}
                onChange={(e) =>
                  setForm({ ...form, nome: e.target.value })
                }
              />
            </div>

            <div className={styles.field}>
              <label>Espécie</label>
              <input
                value={form.especie}
                onChange={(e) =>
                  setForm({ ...form, especie: e.target.value })
                }
              />
            </div>

            <div className={styles.field}>
              <label>Raça</label>
              <input
                value={form.raca}
                onChange={(e) =>
                  setForm({ ...form, raca: e.target.value })
                }
              />
            </div>

            <div className={styles.modalActions}>
              <button onClick={atualizarPet}>Salvar</button>
              <button onClick={() => setIsModalOpen(false)}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
