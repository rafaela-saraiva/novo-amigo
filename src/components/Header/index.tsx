"use client";
import Logo from "../Logo";
import Menu from "../Menu";
import styles from './styles.module.css';

export default function Header() {
  return (
    <header className={styles.header}>

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
