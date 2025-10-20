import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";

import styles from "./page.module.css";
import "./page.css";
import { ProductCardTeste } from "@/components/ProductCard";

export default function Home() {
  // 👇 As imagens são links externos diretos (URLs)
  const pets = [
    {
      id: 1,
      nome: "Gato",
      img: "https://i.postimg.cc/1ynRMXym/retrato-de-um-gato-preto-e-branco.jpg",
      tipo: "gato",
    },
    {
      id: 2,
      nome: "Cachorro",
      img: "https://i.postimg.cc/fRmNs3bF/adoravel-cachorro-basenji-marrom-e-branco-sorrindo-e-dando-mais-uns-cinco-isolado-no-branco.jpg",
      tipo: "cachorro",
    },
    {
      id: 3,
      nome: "Pássaro",
      img: "https://i.postimg.cc/pdvtL2hr/belo-passaro-arara-azul-e-dourado-empoleirado-em-uma-arvore.jpg",
      tipo: "passaro",
    },
    {
      id: 4,
      nome: "Coelho",
      img: "https://i.postimg.cc/mknsLCMN/coelho-peludo-fofo-isolado.jpg",
      tipo: "coelho",
    },
    {
      id: 5,
      nome: "Hamster",
      img: "https://i.postimg.cc/RZKBm30s/close-de-uma-pessoa-segurando-uma-cobaia-marrom.jpg",
      tipo: "hamster",
    },
    {
      id: 6,
      nome: "Animais de Fazenda",
      img: "https://i.postimg.cc/vmmwV0z2/vista-de-tres-poneis-pastando-no-campo-de-uma-fazenda.jpg",
      tipo: "fazenda",
    },
  ];

  return (
    <>
      <Header />

      <main className={styles.content}>
        <div style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
          <Carousel />
        </div>

        <section
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 cards por linha fixo
    gap: "24px",
    justifyItems: "center",
    padding: "48px 16px",
    maxWidth: "1000px",
    margin: "0 auto",
  }}
>
  {pets.map((pet) => (
    <ProductCardTeste
      key={pet.id}
      nome={pet.nome}
      img={pet.img}
      tipo={pet.tipo as any}
    />
  ))}
</section>

        <section
          style={{
            maxWidth: 800,
            margin: "0 auto",
            padding: "32px 16px",
          }}
        >
        </section>
      </main>

      <Footer />
    </>
  );
}
