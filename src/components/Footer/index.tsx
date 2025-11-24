"use client"
import styles from './styles.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        {/* COLUNA 1 — Sobre */}
        <div className={styles.col}>
          <h3 className={styles.title}>Novo Amigo</h3>
          <p className={styles.text}>
            Resgatando, cuidando e encontrando um novo lar para animais em situação de risco.
          </p>

          <p className={styles.address}>
            Rua D. Carlos Botelho, 1900<br />
            São Carlos — SP
          </p>

          <p className={styles.cnpj}>
            CNPJ: 00.000.000/0001-00
          </p>
        </div>

        {/* COLUNA 2 — Links úteis */}
        <div className={styles.col}>
          <h3 className={styles.title}>Links úteis</h3>
          <ul className={styles.links}>
            <li><a href="/nossos-animais">Nossos Animais</a></li>
            <li><a href="/doacao">Doe Agora</a></li>
            <li><a href="/faleConosco">Fale Conosco</a></li>
            
          </ul>
        </div>

        {/* COLUNA 3 — Contato / Social */}
        <div className={styles.col}>
          <h3 className={styles.title}>Contato</h3>

          <div className={styles.contactItem}>
            <img src="https://cdn-icons-png.flaticon.com/512/732/732200.png" 
                 width="18" height="18" alt="Email" />
            contato@novoamigo.com
          </div>

          <a
            className={styles.contactItem}
            href="https://wa.me/5500000000000"
            target="_blank"
          >
            <img 
              src="https://cdn-icons-png.flaticon.com/512/733/733585.png" 
              width="18" 
              height="18" 
              alt="WhatsApp"
            />
            WhatsApp
          </a>

          <div className={styles.social}>
            <a href="#" aria-label="Instagram">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/2111/2111463.png" 
                width="22" 
                height="22" 
                alt="Instagram"
              />
            </a>

            <a href="#" aria-label="Facebook">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/174/174848.png" 
                width="22" 
                height="22" 
                alt="Facebook"
              />
            </a>

            <a href="#" aria-label="YouTube">
              <img 
                src="https://cdn-icons-png.flaticon.com/512/1384/1384060.png" 
                width="22" 
                height="22" 
                alt="YouTube"
              />
            </a>
          </div>
        </div>
      </div>

      {/* BARRA FINAL */}
      <div className={styles.footerBottom}>
        © {new Date().getFullYear()} Novo Amigo — Todos os direitos reservados.
      </div>
    </footer>
  );
}
