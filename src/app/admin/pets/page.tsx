'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import api from "@/services/api";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

export default function AdminPets() {
  const { token } = useAuth();
 
  const [loading, setLoading] = useState(true);

  type Pet = {
  id: number;
  nome: string;
  foto?: string;
  raca?: string;
};

const [pets, setPets] = useState<Pet[]>([]);

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

  async function deletarPet(id) {
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

  useEffect(() => {
    buscarPets();
  }, []);

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <div className={styles.container}>
          <h1 className={styles.title}>Gerenciar Pets 🐶</h1>

          {loading ? (
            <p>Carregando...</p>
          ) : pets.length === 0 ? (
            <p>Nenhum pet encontrado.</p>
          ) : (
            <div className={styles.grid}>
              {pets.map((pet) => (
                <div key={pet.id} className={styles.card}>
                  
                  <img
                    src={
                      pet.foto && pet.foto.startsWith("http")
                        ? pet.foto
                        : "https://placedog.net/400"
                    }
                    alt={pet.nome}
                    className={styles.image}
                  />

                  <h3>{pet.nome}</h3>
                  <p>{pet.raca || "Sem raça"}</p>

                  <div className={styles.actions}>
                    <button
                      className={styles.deleteBtn}
                      onClick={() => deletarPet(pet.id)}
                    >
                      Deletar 🗑️
                    </button>
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}