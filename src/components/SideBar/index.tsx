'use client';

import { useState } from 'react';
import styles from './styles.module.css';
import { useAuth } from '@/hooks/useAuth';
import LoginModal from '@/components/LoginModal';

interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  const { user, logout } = useAuth();

  // estado do modal de login
  const [openLogin, setOpenLogin] = useState(false);

  function handleOpenLogin() {
    setOpenLogin(true);
    onClose(); // fecha o sidebar
  }

  return (
    <>
      {open && <div className={styles.backdrop} onClick={onClose} />}

      <aside
        className={`${styles.sidebar} ${open ? styles.open : ''}`}
        aria-hidden={!open}
      >
        <div className={styles.headerBar}>
          <button
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="Fechar menu"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M6 6l12 12"
                stroke="#fff"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className={styles.nav}>
          <ul>
            {!user ? (
              <>
                <li><a href="/doacao" onClick={onClose}>Doação</a></li>
                <li><a href="/nossos-animais" onClick={onClose}>Animais</a></li>
                <li><a href="/faleConosco" onClick={onClose}>Fale Conosco</a></li>

                {/* ---- ALTERADO AQUI ---- */}
                <li>
                  <button
                    onClick={handleOpenLogin}
                    className={styles.loginBtn}
                  >
                    Entrar
                  </button>
                </li>
              </>
            ) : (
              <>
                <li><a href="/animais-favoritos" onClick={onClose}>Animais Favoritos</a></li>
                <li><a href="/doacao" onClick={onClose}>Doação</a></li>
                <li><a href="/configuracoes" onClick={onClose}>Configurações</a></li>
                <li>
                  <button
                    onClick={() => {
                      logout();
                      onClose();
                    }}
                    className={styles.logoutBtn}
                  >
                    Sair
                  </button>
                </li>
              </>
            )}
          </ul>
        </nav>
      </aside>

      {/* Modal de Login */}
      <LoginModal open={openLogin} onClose={() => setOpenLogin(false)} />
    </>
  );
}
