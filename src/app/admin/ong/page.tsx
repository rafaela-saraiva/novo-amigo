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
  const [filteredShelters, setFilteredShelters] = useState<Shelter[]>([]);
  const [loadingShelters, setLoadingShelters] = useState(false);

  // filtros
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  useEffect(() => {
    if (!loading && !user) router.push("/");
    if (!loading && user && !isAdmin) router.push("/");

    if (user && isAdmin) fetchShelters();
  }, [user, loading]);

  useEffect(() => {
    applyFilters();
  }, [search, status, shelters]);

  function applyFilters() {
    let data = [...shelters];

    if (search) {
      data = data.filter((s) =>
        s.nome.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "all") {
      data = data.filter((s) =>
        status === "active" ? s.isActive : !s.isActive
      );
    }

    setFilteredShelters(data);
  }

  async function fetchShelters() {
    try {
      setLoadingShelters(true);

      const res = await api.get("/shelters", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setShelters(res.data);
    } catch {
      alert("Erro ao carregar ONGs.");
    } finally {
      setLoadingShelters(false);
    }
  }

  async function toggleShelterStatus(id: number, isActive?: boolean) {
  try {
    await api.put(`/shelters/${id}`, {
  isActive: !isActive
});

    fetchShelters();
  } catch (err: any) {
    console.error(err);
    alert(err?.response?.data?.error || "Erro ao atualizar status.");
  }
}

  async function deleteShelter(id: number) {
    if (!confirm("Deseja realmente deletar esta ONG?")) return;

    try {
      await api.delete(`/shelters/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
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
        <div className={styles.top}>
          <h1> Gerenciar ONGs</h1>

          
        </div>

        {/* 🔎 FILTROS */}
        <div className={styles.filters}>
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="active">Ativos</option>
            <option value="inactive">Inativos</option>
          </select>
        </div>

        {loadingShelters && <p>Carregando...</p>}

        {/* 📋 LISTA */}
        <div className={styles.table}>
          {filteredShelters.map((s) => (
            <div key={s.id} className={styles.row}>
              <div className={styles.info}>
                <strong>{s.nome}</strong>
                <p>{s.email || "Sem email"}</p>

                <span
                  className={
                    s.isActive ? styles.active : styles.inactive
                  }
                >
                  {s.isActive ? "Ativa" : "Inativa"}
                </span>
              </div>

              <div className={styles.actions}>
                <button
                  className={styles.toggle}
                  onClick={() => toggleShelterStatus(s.id, s.isActive)}
                >
                  {s.isActive ? "Desativar" : "Ativar"}
                </button>

                <button
                  className={styles.delete}
                  onClick={() => deleteShelter(s.id)}
                >
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