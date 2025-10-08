import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './page.module.css';
import { ProductCardTeste } from "@/components/ProductCard";
import Pet from "@/components/Models/Pet";


export default function Home(pet:Pet) {
  return (
   <>
   <Header/>
   <main className={styles.content} />
   <ProductCardTeste
        key={pet.id}
        nome={pet.nome}
        img={pet.img}
        desc={pet.desc}
        tipo={pet.tipo}
        />
   <Footer/>
   </>
  );
}
