'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface Shelter {
  id: number;
  nome: string;
  email?: string;
  isActive?: boolean;
}

export default function AdminShelters() {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  const isAdmin = user?.email === "admin@pet.com";

  const [shelters, setShelters] = useState<Shelter[]>([]);
  const [loadingShelters, setLoadingShelters] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (!loading && user && !isAdmin) {
      router.push("/");
    }

    if (user && isAdmin) {
      fetchShelters();
    }
  }, [user, loading]);

  async function fetchShelters() {
    try {
      setLoadingShelters(true);

      const res = await api.get("/shelters", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setShelters(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar ONGs.");
    } finally {
      setLoadingShelters(false);
    }
  }

  async function toggleShelterStatus(id: number, isActive?: boolean) {
    try {
      await api.put(`/shelters/${id}/status`, {
        isActive: !isActive,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchShelters();
    } catch {
      alert("Erro ao atualizar status.");
    }
  }

  async function deleteShelter(id: number) {
    if (!confirm("Deseja realmente deletar esta ONG?")) return;

    try {
      await api.delete(`/shelters/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchShelters();
    } catch {
      alert("Erro ao deletar ONG.");
    }
  }

  if (loading || !user || !isAdmin) return null;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1>🏠 Gerenciar ONGs</h1>

        {loadingShelters && <p>Carregando...</p>}

        <div className={styles.table}>
          {shelters.map((s) => (
            <div key={s.id} className={styles.row}>
              <div>
                <strong>{s.nome}</strong>
                <p>{s.email || "Sem email"}</p>
              </div>

              <div className={styles.actions}>
                <button
                  onClick={() => toggleShelterStatus(s.id, s.isActive)}
                >
                  {s.isActive ? "Desativar" : "Ativar"}
                </button>

                <button onClick={() => deleteShelter(s.id)}>
                  Deletar
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}