"use client";

import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: number;
  email: string;
  nome: string;
  phone?: string; // ✅ adicionado
  cpf?: string;   // ✅ adicionado
  role?: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const savedToken = localStorage.getItem("token");

        if (!savedToken) {
          setLoading(false);
          return;
        }

        setToken(savedToken);
        api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

        const res = await api.get("/users/me");

        // ✅ garante que não quebre mesmo se não vier tudo da API
        setUser({
          id: res.data.id,
          nome: res.data.nome,
          email: res.data.email,
          phone: res.data.phone || "",
          cpf: res.data.cpf || "",
          role: res.data.role
        });

      } catch (error) {
        console.error("Erro ao carregar usuário:", error);
        logout();
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  async function login(email: string, senha: string) {
    try {
      const res = await api.post("/users/login", { email, senha });

      const tk = res.data.token;
      const usuario = res.data.usuario;

      localStorage.setItem("token", tk);
      api.defaults.headers.common["Authorization"] = `Bearer ${tk}`;

      setToken(tk);

      // ✅ mesma proteção aqui
      setUser({
        id: usuario.id,
        nome: usuario.nome,
        email: usuario.email,
        phone: usuario.phone || "",
        cpf: usuario.cpf || "",
        role: usuario.role
      });

    } catch (error) {
      console.error("Erro no login:", error);
      throw new Error("Email ou senha inválidos");
    }
  }

  function logout() {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ user, token, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  if (!ctx) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return ctx;
}