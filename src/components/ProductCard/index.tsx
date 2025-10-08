import Image from "next/image";
import styles from "./styles.module.css";

type Props = {
  nome: string;
  img: string;
  desc: string;
  tipo:
    | "gato"
    | "cachorro"
    | "passaro"
    | "coelho"
    | "hamster"
    | "fazenda"
    | "teste";
};

// Mapeamento direto do tipo -> classe CSS
const tipoClassMap: Record<Props["tipo"], string> = {
  gato: styles.gato,
  cachorro: styles.cachorro,
  passaro: styles.passaro,
  coelho: styles.coelho,
  hamster: styles.hamster,
  fazenda: styles.fazenda,
  teste: styles.teste,
};

export default function ProductCard({ nome, img, desc, tipo }: Props) {
  const className = `${styles.root} ${tipoClassMap[tipo]}`;
  
  return (
    <section className={className}>
      <h3>{nome}</h3>
      <Image src={img} alt={nome} width={128} height={128} />
      <h4>Descrição: {desc}</h4>
    </section>
  );
}

export function ProductCardTeste({ nome, img, tipo }: Props) {
  const className = `${styles.root} ${tipoClassMap[tipo]}`;
  
  return (
    <section className={className}>
      <Image src={img} alt={nome} width={128} height={128} />
    </section>
  );
}
