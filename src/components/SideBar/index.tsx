import styles from './styles.module.css';


interface SideBarProps {
  open: boolean;
  onClose: () => void;
}

export default function SideBar({ open, onClose }: SideBarProps) {
  return (
    <>
      {open && (
        <div className={styles.backdrop} onClick={onClose} />
      )}

      <aside className={`${styles.sidebar} ${open ? styles.open : ''}`} aria-hidden={!open}>
        <div className={styles.headerBar}>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Fechar menu">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              <path d="M6 6l12 12" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        <nav className={styles.nav}>
          <ul>
            <li><a href="#doacao">Doação</a></li>
            <li><a href="/nossos-animais">Animais</a></li>
            <li><a href="/faleConosco">Fale Conosco</a></li>
            <li><a href="/login">Entrar</a></li>
          </ul>
        </nav>
      </aside>
    </>
  );
}
            