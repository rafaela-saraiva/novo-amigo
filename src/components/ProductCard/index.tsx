import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

type ProductCardProps = {
  nome: string;
  img: string; // 👈 aqui é o link da imagem (URL externa)
  desc?: string;
  tipo:
    | "gato"
    | "cachorro"
    | "passaro"
    | "coelho"
    | "hamster"
    | "fazenda"
    | "teste";
};

const tipoClassMap: Record<ProductCardProps["tipo"], string> = {
  gato: styles.gato,
  cachorro: styles.cachorro,
  passaro: styles.passaro,
  coelho: styles.coelho,
  hamster: styles.hamster,
  fazenda: styles.fazenda,
  teste: styles.teste,
};

//
// 🔹 CARD COMPLETO (usado na página de adoção)
//
export default function ProductCard({ nome, img, desc, tipo }: ProductCardProps) {
  const className = `${styles.root} ${tipoClassMap[tipo]}`;

  return (
    <section className={className}>
      <h3>{nome}</h3>

      {/* Imagem de link externo */}
      <img
        src={img}
        alt={nome}
        width={200}
        height={200}
        className={styles.image}
      />

      {desc && <p>{desc}</p>}
    </section>
  );
}


export function ProductCardTeste({ nome, img, tipo }: ProductCardProps) {
  const className = `${styles.root} ${tipoClassMap[tipo]}`;

  return (
    <section className={`${styles.root} ${styles.testContainer}`}>
  <div className={styles.imageWrapper}>
    <img
      src={img}
      alt={nome}
      width={200}       // pode ser ajustado
      height={150}      // deve bater com o imageWrapper
      className={styles.image}
    />
  </div>
</section>

  );
}
