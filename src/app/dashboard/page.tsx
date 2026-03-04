"use client";

import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div style={containerStyle}>
        <p style={{ opacity: 0.6 }}>Carregando...</p>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <div style={{ fontSize: "50px", marginBottom: "10px" }}>✨</div>
        <h1 style={{ marginBottom: "10px" }}>
          Bem-vinda, {user.nome} 💖
        </h1>
        <p style={{ opacity: 0.7 }}>
          Você está logada com sucesso.
        </p>
      </div>
    </div>
  );
}

const containerStyle: React.CSSProperties = {
  minHeight: "100vh",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #fdfbfb, #ebedee)",
};

const cardStyle: React.CSSProperties = {
  background: "white",
  padding: "40px",
  borderRadius: "16px",
  boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  textAlign: "center",
  minWidth: "320px",
};