'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "./styles.module.css";

export default function AdminPanel() {
  const router = useRouter();
  const [tab, setTab] = useState("users");

  return (
    <div className={styles.container}>
      <h1>Painel Administrativo ⚙️</h1>

      <div className={styles.tabs}>
        <button onClick={() => setTab("users")}>Usuários</button>
        <button onClick={() => setTab("pets")}>Pets</button>
        <button onClick={() => setTab("ongs")}>ONGs</button>
        <button onClick={() => setTab("audit")}>Auditoria</button>
        <button onClick={() => setTab("messages")}>Mensagens</button>
      </div>

      <div className={styles.content}>
        {tab === "users" && <button onClick={() => router.push('/admin/users')}>Ir para Usuários</button>}
        {tab === "pets" && <button onClick={() => router.push('/admin/pets')}>Ir para Pets</button>}
        {tab === "ongs" && <button onClick={() => router.push('/admin/ongs')}>Ir para ONGs</button>}
        {tab === "audit" && <button onClick={() => router.push('/admin/audit')}>Ir para Auditoria</button>}
        {tab === "messages" && <button onClick={() => router.push('/admin/messages')}>Ir para Mensagens</button>}
      </div>
    </div>
  );
}