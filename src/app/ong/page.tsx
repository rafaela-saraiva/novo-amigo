'use client';

import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import styles from "./styles.module.css";

export default function OngPanel() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const isONG = user?.tipo === "shelter";

  useEffect(() => {
    if (loading) return;
    if (!user || !isONG) router.push("/");
  }, [user, loading, isONG, router]);

  if (loading || !user || !isONG) return null;

  const cards = [
    { title: "Pets", desc: "Gerencie apenas seus pets", route: "/ong/pets" },
    { title: "Solicitações", desc: "Pedidos de adoção", route: "/ong/messages" },
  ];

  return (
    <div className={styles.container}>
      <Header />

      <section className={styles.hero}>
        <div>
          <span className={styles.badge}>Painel da ONG</span>

          <h1 className={styles.title}>
            Gerencie seus pets e mensagens.
            <span> Em um só lugar.</span>
          </h1>

          <p className={styles.subtitle}>
            Acesso exclusivo para ONGs cadastradas.
          </p>

          <div className={styles.actions}>
            <button
              onClick={() => router.push("/ong/pets")}
              className={styles.primaryBtn}
            >
              Meus Pets →
            </button>

            <button
              onClick={() => router.push("/ong/messages")}
              className={styles.secondaryBtn}
            >
              Ver Mensagens
            </button>
          </div>
        </div>
      </section>

      <section className={styles.cardsSection}>
        <h2>Gerenciar</h2>

        <div className={`${styles.grid} ${styles.single}`}>
          {cards.map((card, i) => (
            <div
              key={i}
              onClick={() => router.push(card.route)}
              className={styles.card}
            >
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
