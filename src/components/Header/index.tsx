"use client"
import { useState } from "react";
import Logo from "../Logo";
import Menu from "../Menu";
import styles from './styles.module.css';

export default function Header() {
    const [query, setQuery] = useState("");

    return (
        <header className={styles.header}>
                <div className={styles.left}>
                    <Menu />
                </div>

                    <div className={styles.center}>
                        <Logo />
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

        </header>
    );
}