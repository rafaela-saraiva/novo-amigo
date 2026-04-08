"use client";

import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";

interface User {
  id: string;
  nome: string;
  email: string;
  groups?: string[];
  role?: "ADMIN" | "USER";
  tipo?: "usuario" | "shelter";
  phone?: string;

  // opcionais (usados pela ONG)
  telefone?: string;
  endereco?: string;
  cnpj?: string;
  descricao?: string;
  fotos?: string[];
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (email: string, senha: string) => Promise<void>;
  loginONG: (email: string, senha: string) => Promise<void>;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  // 🔥 CORREÇÃO AQUI
  useEffect(() => {
    async function loadUser() {
      const savedToken = localStorage.getItem("token");
      const savedTipo = localStorage.getItem("tipo");

      if (savedToken) {
        try {
          setToken(savedToken);
          api.defaults.headers.common["Authorization"] = `Bearer ${savedToken}`;

          if (savedTipo === "shelter") {
            const res = await api.get("/shelters/me");
            setUser({
              ...res.data,
              tipo: "shelter",
              descricao: res.data?.descricao ?? res.data?.responsavel,
              fotos: res.data?.fotos ?? res.data?.urlImage,
            });
          } else {
            const res = await api.get("/users/me");
            setUser({ ...res.data, tipo: "usuario" });
          }
        } catch (error) {
          logout();
        }
      }

      setLoading(false); // 👈 agora só roda depois da verificação
    }

    loadUser();
  }, []);

  async function login(email: string, senha: string) {
    const res = await api.post("/users/login", { email, senha });

    const tk = res.data.token;

    localStorage.setItem("token", tk);
    localStorage.setItem("tipo", "usuario");
    api.defaults.headers.common["Authorization"] = `Bearer ${tk}`;

    setToken(tk);

    // Busca o usuário completo (com grupos) após o login
    const meRes = await api.get("/users/me");
    setUser({ ...meRes.data, tipo: "usuario" });
  }

  async function loginONG(email: string, senha: string) {
    const res = await api.post("/shelters/login", { email, senha });

    const tk = res.data.token;
    const shelter = res.data.shelter;

    localStorage.setItem("token", tk);
    localStorage.setItem("tipo", "shelter");
    api.defaults.headers.common["Authorization"] = `Bearer ${tk}`;

    setToken(tk);
    setUser({
      id: String(shelter.id),
      nome: shelter.nome,
      email: shelter.email,
      cnpj: shelter.cnpj,
      telefone: shelter.telefone,
      endereco: shelter.endereco,
      descricao: shelter.descricao ?? shelter.responsavel,
      fotos: shelter.fotos ?? shelter.urlImage,
      tipo: "shelter"
    });
  }

  function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tipo");
    setToken(null);
    setUser(null);
    delete api.defaults.headers.common["Authorization"];
  }

  return (
    <AuthContext.Provider value={{ user, token, login, loginONG, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth deve ser usado dentro de AuthProvider");
  return ctx;
}
