"use client";

import { createContext, useContext, useState, useEffect } from "react";
import api from "@/services/api";

interface User {
  id: string;
  email: string;
  nome: string;
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

// 🔥 AQUI É O ERRO — AGORA EXPORTADO
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");

    if (savedToken) {
      setToken(savedToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

      api.get("/me")
        .then((res) => setUser(res.data))
        .catch(() => logout());
    }

    setLoading(false);
  }, []);

  async function login(email: string, senha: string) {
    const res = await api.post("/login", { email, senha });
    const tk = res.data.token;

    localStorage.setItem("token", tk);
    api.defaults.headers.common["Authorization"] = `Bearer ${tk}`;

    setToken(tk);
    setUser(res.data.usuario);
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
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
