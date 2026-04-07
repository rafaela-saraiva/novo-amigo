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
    <Link href={`/nossos-animais?especie=${tipo}`} className={className}>
      <div className={styles.imageWrapper}>
        <img
          src={img}
          alt={nome}
          width={200}
          height={150}
          className={styles.image}
        />
      </div>
      <div className={styles.cardButton}>{nome}</div>
    </Link>
  );
}

// ===== PetCard — novo design de card individual =====

type PetCardProps = {
  image?: string;
  alt: string;
  nome: string;
  idade: string;
  badge: string;
  porte: string;
  traits: string[];
  href?: string;
};

export function PetCard({
  image,
  alt,
  nome,
  idade,
  badge,
  porte,
  traits,
  href = "/nossos-animais",
}: PetCardProps) {
  return (
    <div className={styles.petCard}>
      <div className={styles.petImageWrapper}>
        <img src={image || null} alt={alt} className={styles.petImage} />
        <button className={styles.heartBtn} aria-label="Favoritar">
          <span className="material-symbols-outlined">favorite</span>
        </button>
        <div className={styles.petBadges}>
          <span className={styles.badgeGreen}>{badge}</span>
          <span className={styles.badgeDark}>{porte}</span>
        </div>
      </div>

      <div className={styles.petBody}>
        <div className={styles.petNameRow}>
          <h3 className={styles.petNome}>{nome}</h3>
          <span className={styles.petIdade}>{idade}</span>
        </div>
        <div className={styles.petTraits}>
          {traits.map((t) => (
            <span key={t} className={styles.traitPill}>{t}</span>
          ))}
        </div>
        <Link href={href} className={styles.conhecerBtn}>Conhecer</Link>
      </div>
    </div>
  );
}

