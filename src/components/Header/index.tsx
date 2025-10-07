"use client"
import { useState } from "react";
import SideBar from "../SideBar";
import styles from './styles.module.css';

export default function Header() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState("");

    return (
        <header className={styles.header}>
                <div className={styles.left}>
                    <button
                        className={styles.hamburger}
                        onClick={() => setOpen((s) => !s)}
                        aria-label={open ? "Fechar menu" : "Abrir menu"}
                    >
                        {/* Alterna entre hamburger e X */}
                        {!open ? (
                            <>
                                <span className={styles.hamburgerLine} />
                                <span className={styles.hamburgerLine} />
                                <span className={styles.hamburgerLine} />
                            </>
                        ) : (
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                                <path d="M18 6L6 18" stroke="#2f4858" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M6 6l12 12" stroke="#2f4858" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        )}
                    </button>
                </div>

                    <div className={styles.center}>
                        <h1 className={styles.title}>Novo Amigo</h1>
                    </div>

            <div className={styles.right}>
                <div className={styles.search}>
                    <input
                        className={styles.searchInput}
                        placeholder="Pesquisar..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        aria-label="Pesquisar"
                    />
                    <button className={styles.searchBtn} aria-label="Pesquisar botão">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21 21l-4.35-4.35" stroke="#5D8A6B" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                            <circle cx="11" cy="11" r="5.2" stroke="#5D8A6B" strokeWidth="1.6"/>
                        </svg>
                    </button>
                </div>
            </div>

            <SideBar open={open} onClose={() => setOpen(false)} />
        </header>
    );
}