'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.css";

interface User {
  id: number;
  nome: string;
  email: string;
  phone?: string;
  cpf?: string;
  isActive: boolean;
}

export default function AdminUsers() {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  const isAdmin = user?.email === "admin@pet.com";

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }

    if (!loading && user && !isAdmin) {
      router.push("/");
    }

    if (user && isAdmin) {
      fetchUsers();
    }
  }, [user, loading]);

  async function fetchUsers() {
    try {
      setLoadingUsers(true);

      const res = await api.get("/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar usuários.");
    } finally {
      setLoadingUsers(false);
    }
  }

  async function toggleUserStatus(id: number, isActive: boolean) {
    try {
      await api.put(`/users/${id}/status`, {
        isActive: !isActive,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch {
      alert("Erro ao atualizar status.");
    }
  }

  async function deleteUser(id: number) {
    if (!confirm("Deseja realmente deletar este usuário?")) return;

    try {
      await api.delete(`/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      fetchUsers();
    } catch {
      alert("Erro ao deletar usuário.");
    }
  }

  if (loading || !user || !isAdmin) return null;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1>👥 Gerenciar Usuários</h1>

        {loadingUsers && <p>Carregando...</p>}

        <div className={styles.table}>
          {users.map((u) => (
            <div key={u.id} className={styles.row}>
              <div>
                <strong>{u.nome}</strong>
                <p>{u.email}</p>
              </div>

              <div className={styles.actions}>
                <button
                  onClick={() => toggleUserStatus(u.id, u.isActive)}
                >
                  {u.isActive ? "Desativar" : "Ativar"}
                </button>

                <button onClick={() => deleteUser(u.id)}>
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