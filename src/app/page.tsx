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
      nome: "Mingau",
      img: "https://cdn2.thecatapi.com/images/MTY3ODIyMQ.jpg",
      tipo: "gato",
    },
    {
      id: 2,
      nome: "Rex",
      img: "https://images.dog.ceo/breeds/labrador/n02099712_4539.jpg",
      tipo: "cachorro",
    },
    {
      id: 3,
      nome: "Piu-Piu",
      img: "https://upload.wikimedia.org/wikipedia/commons/4/45/Parakeet.jpg",
      tipo: "passaro",
    },
    {
      id: 4,
      nome: "Nina",
      img: "https://upload.wikimedia.org/wikipedia/commons/0/0b/Holland_Lop_rabbit.jpg",
      tipo: "coelho",
    },
    {
      id: 5,
      nome: "Tico",
      img: "https://upload.wikimedia.org/wikipedia/commons/5/5f/Hamster.jpg",
      tipo: "hamster",
    },
    {
      id: 6,
      nome: "Dolly",
      img: "https://upload.wikimedia.org/wikipedia/commons/3/3c/Farm_animals.jpg",
      tipo: "fazenda",
    },
  ];

  return (
    <>
      <Header />

      <main className={styles.content}>
        {/* Carrossel */}
        <div style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
          <Carousel />
        </div>

        {/* Grade com 6 imagens (somente imagem, link externo) */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
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
              img={pet.img} // 🔗 já é o link da imagem
              tipo={pet.tipo as any}
            />
          ))}
        </section>

        {/* Fale Conosco */}
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
