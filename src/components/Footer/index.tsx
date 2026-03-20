import Link from 'next/link';
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* COLUNA 1 — Logo + descrição */}
        <div className={styles.col}>
          <div className={styles.logo}>
            <div className={styles.logoBadge}>
              <span className="material-symbols-outlined">pets</span>
            </div>
            <span className={styles.logoText}>Novo Amigo</span>
          </div>
          <p className={styles.description}>
            Transformando vidas através da adoção consciente e responsável.
            Somos a maior rede de ONGs do Brasil.
          </p>
          <div className={styles.social}>
            <a href="#" className={styles.socialBtn} aria-label="Instagram">
              <span className="material-symbols-outlined">camera</span>
            </a>
            <a href="#" className={styles.socialBtn} aria-label="Compartilhar">
              <span className="material-symbols-outlined">share</span>
            </a>
            <a href="#" className={styles.socialBtn} aria-label="YouTube">
              <span className="material-symbols-outlined">videocam</span>
            </a>
          </div>
        </div>

        {/* COLUNA 2 — Plataforma */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Plataforma</h4>
          <ul className={styles.links}>
            <li><Link href="/nossos-animais">Adotar</Link></li>
            <li><Link href="/#como-funciona">Como Funciona</Link></li>
            <li><Link href="/nossos-animais">ONGs Parceiras</Link></li>
            <li><a href="#">Blog</a></li>
          </ul>
        </div>

        {/* COLUNA 3 — Institucional */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Institucional</h4>
          <ul className={styles.links}>
            <li><Link href="/sobre">Sobre Nós</Link></li>
            <li><a href="#">Trabalhe Conosco</a></li>
            <li><a href="#">Privacidade</a></li>
            <li><a href="#">Termos de Uso</a></li>
          </ul>
        </div>

        {/* COLUNA 4 — Novidades */}
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Novidades</h4>
          <p className={styles.newsletterText}>
            Receba dicas de cuidados e novas histórias de adoção.
          </p>
          <div className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Seu e-mail"
              className={styles.newsletterInput}
            />
            <button className={styles.newsletterBtn} aria-label="Enviar">
              <span className="material-symbols-outlined">send</span>
            </button>
          </div>
        </div>
      </div>

      {/* BARRA FINAL */}
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Novo Amigo. Todos os direitos reservados.</p>
        <div className={styles.footerBottomRight}>
          <span>Feito com</span>
          <span className={`material-symbols-outlined ${styles.heartIcon}`}>favorite</span>
          <span>pela comunidade.</span>
        </div>
      </div>
    </footer>
  );
}
