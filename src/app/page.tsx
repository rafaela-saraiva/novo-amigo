// import AdBanner from "@/components/AdBanner";
import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import { PetCard } from "@/components/ProductCard";
import "./page.css";
import styles from "./page.module.css";
import SobreNos from "./sobre/page";

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

      <main className={styles.content}>
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
        <SobreNos/>
      </main>
      
      
      <Footer />
    </>
  );
}
