"use client"
import styles from './styles.module.css';

export default function Footer(){
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.left}>
          <div className={styles.copy}>© {new Date().getFullYear()} Novo Amigo — Todos os direitos reservados</div>
          <div className={styles.small}>1763 Rua Dona Alexandrina · São Carlos, São Paulo</div>
        </div>

        
        <div className={styles.right}>
          <a className={styles.whatsapp} href="" target="_blank" rel="noreferrer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
              <path d="M21 12.08c0 4.99-4.05 9.04-9.04 9.04a8.97 8.97 0 01-4.56-1.22L3 21l1.31-4.32A9.03 9.03 0 012.96 12C2.96 7.01 7.01 3 12 3s9 4.01 9 9.08z" stroke="#fff" strokeWidth="0.8" fill="#25D366"/>
              <path d="M17.1 14.2c-.3-.1-1.8-.9-2.1-1-.3-.1-.5-.1-.7.1-.2.2-.9 1-.9 1s-1 0-1.8-.4c-1.8-1-3-3.2-3-5.7 0-.6.2-.9.6-1.1.2-.1.4-.2.6-.2.2 0 .4 0 .6.1.2.1.6.3.6.3s.2.1.2.3c0 .2-.1.4-.1.6 0 .2-.5 1.8.6 3.2 1.1 1.4 2.6 1.8 3 1.9.5.1 1 .1 1.4-.1.4-.2 1.3-.6 1.5-.8.2-.2.2-.4.1-.5-.1-.1-.5-.2-.8-.3z" fill="#fff"/>
            </svg>
            <span>WhatsApp</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
 