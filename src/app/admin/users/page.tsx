'use client';

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import api from "@/services/api";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import styles from "./styles.module.css";

interface User {
  id: number;
  nome?: string;
  name?: string;
  email?: string;
  status?: boolean | number | string;
}

export default function AdminUsers() {
  const { user, token, loading } = useAuth();
  const router = useRouter();

  // ✅ ADMINS (mantendo emails)
  const ADMINS = ["admin@pet.com", "john4@gmail.com"];
  const isAdmin = ADMINS.includes(user?.email || "");

  const [users, setUsers] = useState<User[]>([]);
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'ALL' | 'ACTIVE' | 'INACTIVE'>('ALL');

  useEffect(() => {
    if (loading || !token) return;

    // ✅ CORRIGIDO: agora aceita os dois admins
    if (!user || !ADMINS.includes(user.email)) {
      router.replace("/");
      return;
    }

    fetchUsers();
  }, [user, loading, token]);

  async function fetchUsers() {
    try {
      setLoadingUsers(true);

      const res = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(res.data);
    } catch (err) {
      console.error(err);
      alert("Erro ao carregar usuários.");
    } finally {
      setLoadingUsers(false);
    }
  }

  // ✅ NORMALIZA STATUS
  function getStatus(u: User) {
    const value = u.status;
    return value === true || value === 1 || value === "true";
  }

  async function toggleUserStatus(u: User) {
    const current = getStatus(u);

    try {
      await api.put(`/users/${u.id}`, {
        name: u.nome || u.name,
        email: u.email,
        status: !current
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(prev =>
        prev.map(user =>
          user.id === u.id ? { ...user, status: !current } : user
        )
      );

    } catch (err) {
      console.error(err);
      alert("Erro ao atualizar status.");
    }
  }

  async function deleteUser(u: User) {
    // ✅ BLOQUEIA TODOS ADMINS
    if (ADMINS.includes(u.email || "")) {
      alert("Administrador não pode ser deletado");
      return;
    }

    if (!confirm("Deseja realmente deletar este usuário?")) return;

    try {
      await api.delete(`/users/${u.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setUsers(prev => prev.filter(user => user.id !== u.id));

    } catch (err) {
      console.error(err);
      alert("Erro ao deletar usuário.");
    }
  }

  const filteredUsers = useMemo(() => {
    return users.filter(u => {
      const nome = (u.nome || u.name || '').toLowerCase();
      const email = (u.email || '').toLowerCase();
      const term = search.toLowerCase();

      const matchesSearch = nome.includes(term) || email.includes(term);
      const status = getStatus(u);

      const matchesStatus =
        statusFilter === 'ALL' ||
        (statusFilter === 'ACTIVE' && status) ||
        (statusFilter === 'INACTIVE' && !status);

      return matchesSearch && matchesStatus;
    });
  }, [users, search, statusFilter]);

  if (loading) return <p>Carregando...</p>;
  if (!user || !isAdmin) return null;

  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <h1>Gerenciar Usuários</h1>

        <input
          className={styles.search}
          placeholder="Buscar por nome ou email..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className={styles.filters}>
          <button onClick={() => setStatusFilter('ALL')}>Todos</button>
          <button onClick={() => setStatusFilter('ACTIVE')}>Ativos</button>
          <button onClick={() => setStatusFilter('INACTIVE')}>Inativos</button>
        </div>

        {loadingUsers && <p>Carregando...</p>}

        <div className={styles.table}>
          {filteredUsers.map((u) => {
            const nome = u.nome || u.name || "Sem nome";
            const status = getStatus(u);
            const isAdminUser = ADMINS.includes(u.email || "");

            return (
              <div
                key={u.id}
                className={`${styles.row} ${!status ? styles.inactiveRow : ''}`}
              >
                <div className={styles.userInfo}>
                  <strong>{nome}</strong>

                  {/* ✅ LABEL ADMIN */}
                  {isAdminUser && (
                    <span className={styles.owner}>👑 Administrador</span>
                  )}

                  <p>{u.email || "Sem email"}</p>

                  {/* ✅ ADMIN SEM STATUS */}
                  {isAdminUser ? (
                    <span className={styles.owner}>Sempre ativo</span>
                  ) : (
                    <span className={status ? styles.active : styles.inactive}>
                      {status ? "Ativo" : "Inativo"}
                    </span>
                  )}
                </div>

                <div className={styles.actions}>
                  {/* ✅ NÃO MOSTRA BOTÕES PRA ADMIN */}
                  {!isAdminUser && (
                    <>
                      <button onClick={() => toggleUserStatus(u)}>
                        {status ? "Desativar" : "Ativar"}
                      </button>

                      <button onClick={() => deleteUser(u)}>
                        Deletar
                      </button>
                    </>
                  )}
                </div>

              </div>
            );
          })}
        </div>
      </main>

      <Footer />
    </div>
  );
}