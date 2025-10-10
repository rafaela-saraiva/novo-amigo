'use client'
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import styles from "./styles.module.css";

export default function NossosAnimais() {
  // Lista completa de todos os animais disponíveis para adoção
  const pets = [
    {
      id: 1,
      nome: "Mingau",
      img: "https://i.postimg.cc/1ynRMXym/retrato-de-um-gato-preto-e-branco.jpg",
      tipo: "gato",
      desc: "Gato carinhoso de 2 anos, castrado e vacinado."
    },
    {
      id: 2,
      nome: "Rex",
      img: "https://i.postimg.cc/fRmNs3bF/adoravel-cachorro-basenji-marrom-e-branco-sorrindo-e-dando-mais-uns-cinco-isolado-no-branco.jpg",
      tipo: "cachorro",
      desc: "Cachorro brincalhão de 3 anos, muito sociável."
    },
    {
      id: 3,
      nome: "Piu-Piu",
      img: "https://i.postimg.cc/pdvtL2hr/belo-passaro-arara-azul-e-dourado-empoleirado-em-uma-arvore.jpg",
      tipo: "passaro",
      desc: "Arara colorida que adora cantar e conversar."
    },
    {
      id: 4,
      nome: "Nina",
      img: "https://i.postimg.cc/mknsLCMN/coelho-peludo-fofo-isolado.jpg",
      tipo: "coelho",
      desc: "Coelha dócil e muito carinhosa, ideal para famílias."
    },
    {
      id: 5,
      nome: "Tico",
      img: "https://i.postimg.cc/RZKBm30s/close-de-uma-pessoa-segurando-uma-cobaia-marrom.jpg",
      tipo: "hamster",
      desc: "Hamster ativo e curioso, perfeito para apartamentos."
    },
    {
      id: 6,
      nome: "Dolly",
      img: "https://i.postimg.cc/vmmwV0z2/vista-de-tres-poneis-pastando-no-campo-de-uma-fazenda.jpg",
      tipo: "fazenda",
      desc: "Pônei gentil que precisa de um espaço amplo."
    },
    {
      id: 7,
      nome: "Luna",
      img: "https://i.postimg.cc/1ynRMXym/retrato-de-um-gato-preto-e-branco.jpg",
      tipo: "gato",
      desc: "Gata calma e independente, já castrada."
    },
    {
      id: 8,
      nome: "Bob",
      img: "https://i.postimg.cc/fRmNs3bF/adoravel-cachorro-basenji-marrom-e-branco-sorrindo-e-dando-mais-uns-cinco-isolado-no-branco.jpg",
      tipo: "cachorro",
      desc: "Cão protetor e leal, ótimo para famílias com crianças."
    },
    {
      id: 9,
      nome: "Kiwi",
      img: "https://i.postimg.cc/pdvtL2hr/belo-passaro-arara-azul-e-dourado-empoleirado-em-uma-arvore.jpg",
      tipo: "passaro",
      desc: "Papagaio inteligente que sabe algumas palavras."
    },
    {
      id: 10,
      nome: "Mel",
      img: "https://i.postimg.cc/mknsLCMN/coelho-peludo-fofo-isolado.jpg",
      tipo: "coelho",
      desc: "Coelho jovem e energético, precisa de atenção diária."
    }
  ];

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          <header className={styles.pageHeader}>
            <h1 className={styles.title}>Nossos Animais</h1>
            <p className={styles.subtitle}>
              Conheça todos os nossos amiguinhos que estão esperando por uma família amorosa.
              Cada um tem sua personalidade única e muito amor para dar!
            </p>
          </header>

          <section className={styles.petsGrid}>
            {pets.map((pet) => (
              <ProductCard
                key={pet.id}
                nome={pet.nome}
                img={pet.img}
                tipo={pet.tipo as "gato" | "cachorro" | "passaro" | "coelho" | "hamster" | "fazenda" | "teste"}
                desc={pet.desc}
              />
            ))}
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
}