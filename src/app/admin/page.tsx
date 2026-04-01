// AdminPanel.jsx
'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import styles from "./styles.module.css";

export default function AdminPanel() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const ADMINS = ["admin@pet.com", "john4@gmail.com"];
  const isAdmin = ADMINS.includes(user?.email || "");

  useEffect(() => {
    if (loading) return;
    if (!user || !isAdmin) router.push("/");
  }, [user, loading]);

  if (loading || !user || !isAdmin) return null;

  const cards = [
    { title: "Usuários", desc: "Gerencie contas", route: "/admin/users" },
    { title: "Pets", desc: "Controle os pets", route: "/admin/pets" },
    { title: "ONGs", desc: "Gerencie ONGs", route: "/admin/ong" },
    { title: "Auditoria", desc: "Logs do sistema", route: "/admin/audit" },
    { title: "Mensagens", desc: "Central de mensagens", route: "/admin/messages" },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <div>
          <span className={styles.badge}>Painel Administrativo</span>

          <h1 className={styles.title}>
            Controle total da plataforma.
            <span> Simples e rápido.</span>
          </h1>

          <p className={styles.subtitle}>
            Gerencie tudo em um só lugar.
          </p>

          <div className={styles.actions}>
            <button onClick={() => router.push("/admin/users")} className={styles.primaryBtn}>
              Gerenciar Usuários →
            </button>

            <button onClick={() => router.push("/admin/pets")} className={styles.secondaryBtn}>
              Ver Pets
            </button>
          </div>
        </div>

        
      </section>

      <section className={styles.cardsSection}>
        <h2>Gerenciar Sistema</h2>

        <div className={styles.grid}>
          {cards.map((card, i) => (
            <div key={i} onClick={() => router.push(card.route)} className={styles.card}>
              <h3>{card.title}</h3>
              <p>{card.desc}</p>
              <span>Acessar →</span>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}

