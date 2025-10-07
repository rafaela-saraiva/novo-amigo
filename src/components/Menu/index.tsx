"use client"
import { useState } from "react";
import SideBar from "../SideBar";
import styles from './styles.module.css';

export default function Menu() {
    const [open, setOpen] = useState(false);

    return (
        <>
            <div className={styles.container}>
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

            <SideBar open={open} onClose={() => setOpen(false)} />
        </>
    );
}
