"use client";
import { useState } from "react";
import Logo from "../Logo";
import Menu from "../Menu";
import styles from './styles.module.css';

export default function Header() {
  const [query, setQuery] = useState("");

  return (
    <header className={styles.header}>
      {/* 🔍 Esquerda - barra de pesquisa */}
      <div className={styles.left}>
        <div className={styles.search}>
          <input
            className={styles.searchInput}
            placeholder="Pesquisar..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Pesquisar"
          />
          <div className={styles.searchIcon}>
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M21 21l-4.35-4.35"
                stroke="#5D8A6B"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle
                cx="11"
                cy="11"
                r="5.2"
                stroke="#5D8A6B"
                strokeWidth="1.6"
              />
            </svg>
          </div>
        </div>
      </div>

            {/* 🐾 Centro - logo */}
            <div className={styles.center}>
                <Logo />
            </div>

            {/* ☰ Direita - menu */}
            <div className={styles.right}>
                <Menu />
            </div>
        </header>
    );
}
