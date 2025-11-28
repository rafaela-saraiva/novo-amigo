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
                    className={`${styles.hamburger} ${open ? styles.open : ""}`}
                    onClick={() => setOpen((s) => !s)}
                    aria-label={open ? "Fechar menu" : "Abrir menu"}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </div>

            <SideBar open={open} onClose={() => setOpen(false)} />
        </>
    );
}
