"use client";

import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styles from "./styles.module.css";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [loginOpen, setLoginOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  // ✅ ADMINS
  const ADMINS = ["admin@pet.com", "john4@gmail.com"];
  const isAdmin = ADMINS.includes(user?.email || "");

  function handleLogout() {
    logout();
    setMenuOpen(false);
    router.push("/");
  }

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.inner}>

          {/* Logo */}
          <Link href="/" className={styles.logo}>
            <div className={styles.logoIcon}>
              <span className="material-symbols-outlined">pets</span>
            </div>
            <h2 className={styles.logoText}>Novo Amigo</h2>
          </Link>

          {/* Links */}
          <div className={styles.links}>
            <Link href="/nossos-animais" className={styles.link}>Adotar</Link>
            <Link href="/#como-funciona" className={styles.link}>Como Funciona</Link>
            <Link href="/#ongs" className={styles.link}>ONGs</Link>

            {/* 🔥 PAINEL ADMIN (DESKTOP) */}
            {isAdmin && (
              <Link href="/admin" className={styles.link}>
                Painel Admin 
              </Link>
            )}
          </div>

          {/* AÇÕES */}
          <div className={styles.actions}>
            {user ? (
              <>
                <Link href="/configuracoes" className={styles.userChip}>
                  <span className="material-symbols-outlined">account_circle</span>
                  <span className={styles.userName}>
                    {user?.nome?.split(" ")[0] || "Usuário"}
                  </span>
                </Link>

                <button onClick={handleLogout} className={styles.btnLogout}>
                  <span className="material-symbols-outlined">logout</span>
                </button>
              </>
            ) : (
              <>
                <button onClick={() => { setLoginOpen(true); setMenuOpen(false); }} className={styles.btnEntrar}>
                  Entrar
                </button>

                <button onClick={() => router.push("/cadastro")} className={styles.btnCadastrar}>
                  Cadastrar
                </button>
              </>
            )}

            {/* HAMBURGER */}
            <button
              className={styles.hamburger}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="material-symbols-outlined">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>
          </div>

        </div>

        {/* MOBILE */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <Link href="/nossos-animais" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Adotar</Link>
            <Link href="/#como-funciona" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>Como Funciona</Link>
            <Link href="/#ongs" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>ONGs</Link>

            {/* 🔥 PAINEL ADMIN MOBILE */}
            {isAdmin && (
              <Link href="/admin" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                👑 Painel Admin
              </Link>
            )}

            <div className={styles.mobileDivider} />

            {user ? (
              <>
                <Link href="/configuracoes" className={styles.mobileLink} onClick={() => setMenuOpen(false)}>
                  Minha Conta
                </Link>

                <button className={styles.mobileBtnSair} onClick={handleLogout}>
                  Sair
                </button>
              </>
            ) : (
              <>
                <button className={styles.mobileBtnEntrar} onClick={() => { setLoginOpen(true); setMenuOpen(false); }}>
                  Entrar
                </button>

                <button className={styles.mobileBtnCadastrar} onClick={() => { router.push("/cadastro"); setMenuOpen(false); }}>
                  Cadastrar
                </button>
              </>
            )}
          </div>
        )}
      </nav>

      <LoginModal open={loginOpen} onClose={() => setLoginOpen(false)} />
    </>
  );
}