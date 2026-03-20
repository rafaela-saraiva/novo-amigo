// import AdBanner from "@/components/AdBanner";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { PetCard } from "@/components/ProductCard";
import "./page.css";
import styles from "./page.module.css";

const featuredPets = [
  {
    nome: "Bento",
    idade: "2 anos",
    badge: "Resgatado",
    porte: "Porte Médio",
    traits: ["Ama carinho", "Calmo"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuAzpHYVL3L1WqN6iAWbnfyYdw-dsNbSXDcbZTr6PlzYCA4oA7mktmZdJ4Xh9kl47HSE6r08fC7OWrL8W8U9V1z-y9dDbseDaXN3_aMHjxs6gWgZqiOJt31HyEeOS_BiHIR0Z0SwwYZLfSqoBGgoq4FSy4VU7tAtYnSjzvhI8dvH6uCkWiTrKb3JXompzeuCCg8gxDwvuixyAcoaehnNgdU63TQ3sSyMu1r1kUInv4moFoq2wwbZzIduqU-bC9vPnvTtWY31UJW7LYL3",
    alt: "Cachorro golden retriever filhote com gravata azul",
  },
  {
    nome: "Luna",
    idade: "4 meses",
    badge: "Filhote",
    porte: "Gato",
    traits: ["Brincalhona", "Curiosa"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDytx25Iu_iHc7nTyd104_kJS7e2kQM4lq0o7OVyKWFP8I69swYo4L6T24fdKUfae6qgjAMpqPHzliZqVbxoqoz9Sd-Gzmf5pUa1Kdx3e2or-zzH44Yn9fKmvPaR26IZNRrd3-1AG1YXf-sTZ9uzEDPsUb0svTyqfR12-g8tUuwacqN7cfCBSFP-CBoFlui-YXzm6w7r_SX2QPFt5IMW7e5fOOJirXfyTxecFFkAC1utvFrVnKIYr7pgD9QfAUQE_3OzETVwBfu665E",
    alt: "Gato cinza fofo olhando cur curiosamente",
  },
  {
    nome: "Toby",
    idade: "5 anos",
    badge: "Castrado",
    porte: "Pequeno",
    traits: ["Sociável", "Protetor"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBOjYNx6GAEshMKINi6rasQ8IvAlQkPuh4luQ4Mi53rZjaDHUDOZEQnnDRe-UabnbpegEEatFpttr2yACPKOy4Ra5DT5pylQOyxZwI-pDGzOeQWwz0DTT0_ikVE4js8-GcQf-go0K-hWFv6gz5XyuuPXTelaUuWx5huYnfW876XRpozpDEglbLrQMkFKl1iJCTR-KPCFrmG302dzTu1AFEeLf0cvlPW11ACX3nhlltX3dSWrHW6IrFRjBp8TG0F-ku9IzCm9H1mhsVO",
    alt: "Cachorrinho marrom sentado na grama sorrindo",
  },
  {
    nome: "Zeus",
    idade: "1 ano",
    badge: "Especial",
    porte: "Grande",
    traits: ["Muita energia", "Amigável"],
    image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDdPPn80diOPob_670RBqyG1YeKHZcXzlI2SJC-HaucbZqrExq0-vCF_TZv3CMucrTclm6soPCIANgbMhO3Uxv-Yl-9uvSllyCc5Vj8n3ne4H7uGUwUFdBWf7DXD0v4e8EJ9K8XeKcyjPfF_rl4aawOW8Whrnj9B9mH-9sI2JPxeqtMDhpWz3JTnFGprvKoVqV4aBkMiC8tkiACDgrbrcEUnyzNRjh0KfcjzuRna1Je7NZ5FSzKjYOj7Pbuv33l1wgwuzdDRBxIM4V9",
    alt: "Cão preto e branco com olhar expressivo",
  },
];

export default function Home() {

  return (
    <>
      <Header />
      
      {/* Banners de anúncio fixos nas laterais */}
      {/* TEMPORARIAMENTE DESATIVADO - AdSense precisa aprovar o site primeiro */}
      {/* <AdBanner position="left" />
      <AdBanner position="right" /> */}

      <main className={styles.content} style={{ paddingTop: '128px' }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 16px" }}>
          <Carousel />
        </div>

        {/* Seção de Pets — novo design */}
        <div className={styles.petsWrapper}>
          {/* Barra de busca */}
          <div className={styles.searchBar}>
            <div className={styles.searchInputWrapper}>
              <span className={`material-symbols-outlined ${styles.searchIcon}`}>search</span>
              <input
                className={styles.searchInput}
                type="text"
                placeholder="Buscar por raça, cidade..."
              />
            </div>
            <div className={styles.filterBtns}>
              <button className={styles.filterBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>category</span>
                Espécie
              </button>
              <button className={styles.filterBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>calendar_month</span>
                Idade
              </button>
              <button className={styles.filterBtn}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>straighten</span>
                Porte
              </button>
            </div>
            <button className={styles.tuneBtn} aria-label="Filtros avançados">
              <span className="material-symbols-outlined">tune</span>
            </button>
          </div>

          {/* Grid de pets */}
          <div className={styles.petsSection}>
            <div className={styles.petsHeader}>
              <h2 className={styles.petsTitle}>Pets esperando por você</h2>
              <a href="/nossos-animais" className={styles.verTodos}>
                Ver todos
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </a>
            </div>
            <div className={styles.petsGrid}>
              {featuredPets.map((pet) => (
                <PetCard key={pet.nome} {...pet} />
              ))}
            </div>
          </div>
        </div>

        {/* Como funciona a adoção */}
        <section className={styles.howSection}>
          <div className={styles.howCenter}>
            <h2 className={styles.howTitle}>Como funciona a adoção?</h2>
            <p className={styles.howSubtitle}>
              Três passos simples para você encontrar seu novo melhor amigo de forma segura e responsável.
            </p>
          </div>

          <div className={styles.howGrid}>
            <div className={styles.howCard}>
              <span className={styles.howNumber}>1</span>
              <div className={styles.howIconBox}>
                <span className="material-symbols-outlined">search_check</span>
              </div>
              <h4 className={styles.howCardTitle}>Escolha um pet</h4>
              <p className={styles.howCardText}>
                Navegue pelos perfis e encontre o pet que mais combina com seu perfil e rotina.
              </p>
            </div>

            <div className={styles.howCard}>
              <span className={styles.howNumber}>2</span>
              <div className={styles.howIconBox}>
                <span className="material-symbols-outlined">chat</span>
              </div>
              <h4 className={styles.howCardTitle}>Converse com a ONG</h4>
              <p className={styles.howCardText}>
                Tire suas dúvidas, agende uma visita e conheça a história por trás de cada resgate.
              </p>
            </div>

            <div className={styles.howCard}>
              <span className={styles.howNumber}>3</span>
              <div className={styles.howIconBox}>
                <span className="material-symbols-outlined">home_filled</span>
              </div>
              <h4 className={styles.howCardTitle}>Leve para casa</h4>
              <p className={styles.howCardText}>
                Prepare seu lar para receber seu novo amigo com todo amor e segurança que ele merece.
              </p>
            </div>
          </div>
        </section>

        {/* CTA — Pronto para dar um novo lar? */}
        <section className={styles.ctaSection}>
          <div className={styles.ctaBox}>
            <div className={styles.ctaLeft}>
              <h2 className={styles.ctaTitle}>Pronto para dar um novo lar?</h2>
              <p className={styles.ctaText}>
                Nossa equipe auxilia em todo o processo de adaptação para garantir que você e seu novo amigo sejam felizes.
              </p>
              <div className={styles.ctaBtns}>
                <a href="/nossos-animais" className={styles.ctaBtnPrimary}>Quero começar</a>
                <a href="/faleConosco" className={styles.ctaBtnSecondary}>Falar com consultor</a>
              </div>
            </div>

            <div className={styles.ctaRight}>
              <div className={styles.ctaImgGrid}>
                <div className={styles.ctaColOffset}>
                  <div className={styles.ctaImgBox}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcFIl4PyQnQJlzqmw4PHyph0k-fQKFSLAod-eXMKAlkaD40g8573fYqWSJ4Pll8HbAydU1pAknp_GoFlWZSZNkAIJZc5pbqZycMNcvQY0nNOQRK_KKvyM12JoPyVrGdLajne3lk-3rwQZnAiOCQv3kIwRrjEfDVLfY5xJVkitgAR1PJZYwwkO8r1SbGVEH2FheyhY6mz_B4cvFU7FQUuYK4av0KycA_SczID_hn5EiYkRpeB_p_E6ei7uFoGtHaLW5KwRQMXW_Yb2D"
                      alt="Cães brincando"
                    />
                  </div>
                  <div className={styles.ctaImgBox}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSCDhlxa_15lKGo3QUaEP33akCQEl5if9EBhJbnCnQu2ZwjK_PsjP1Fd8gez9V67zhv3cO1TbRIH98sJUuhRwV8vxoHfEUQGw9bQhmo2dqvS62Q23j99cFsLgwmQ8izlzGuU8YeNf3zOp9T6OR_i5HIbvr9U4qawpsSyv16R2PSkkXCsCjcUxRot60eyzvOYwKzSPgYII7mSaNiPhXqxDrL9tFygThTxKzg5e0Lnnyg003uvPj5c-VTQ0cCzDM7q2EsblP-Eji7fm2"
                      alt="Retrato de gato"
                    />
                  </div>
                </div>
                <div className={styles.ctaCol}>
                  <div className={styles.ctaImgBox}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9NafNsG-qsGgjzKzm4qLjZs-fMTzM7ujxynf-wNeSqUJ8QusnRrFhplJFKGmdLvDXw4NB9qPMqo5lFsnm1byb1mcLAy34iBhis6buWxjjkr5Zb6LROMln_n0s5wYLifViunDO7PTW3HvGnw8UYsdADGFN73WEOeE7MO4cXaNsUqlrwKEbbGOv6kfivmbDsf6v_i_OXqMNyKjLrlJTioMur2AWe4R_w5q6nu0r_DmmQpdxYDmxVOPZaAX_BMLCstOY6S1Q_K5fKvKd"
                      alt="Filhote golden"
                    />
                  </div>
                  <div className={styles.ctaImgBox}>
                    <img
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFYSyuc288b0RpGd-8xRU8UA2hlvc2tCSjLxNgIAkw3_xtL0LE4PtbxD1Zy9ycO-l0LuQGnVsGfb3lTz6ZkNIa8BBfFQLzxgk97zx5eQYe9G8oI6dVu3U1gUrEncoN0BIEl1lBAoylotqe3cPIkRtXF1CTrN8b3SWt63VVkSqPEQK0_xncdBQMXijiM5I5UUIzKTGdAQiMVvZ-485FdUAAOE9u__ixry1Mq1MIh6QkjGh1mdeCPZ83XYBgltR38Rz9lRQW-Ea_QVEq"
                      alt="Cão inteligente"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Fundo decorativo */}
            <div className={styles.ctaBgDecor} />
          </div>
        </section>
      </main>
      
      
      <Footer />
    </>
  );
}
