"use client"

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

type Slide = {
  image: string;
  title: string;
  subtitle: string;
  alt?: string;
};

const slides: Slide[] = [
  {
    image: "https://exemplo.com/imagem1.jpg",
    title: "Bem-vindo ao Novo Amigo 🐾",
    subtitle: "Encontre seu novo melhor amigo.",
    alt: "Logo e apresentação",
  },
  {
    image: "https://exemplo.com/imagem2.jpg",
    title: "Nossa História",
    subtitle: "Transformando vidas com adoção e amor.",
    alt: "Nossa história",
  },
  {
    image: "https://exemplo.com/imagem3.jpg",
    title: "Doe e Ajude",
    subtitle: "Cada contribuição faz a diferença.",
    alt: "Doação",
  },
];

export default function Carousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const timeoutRef = useRef<number | null>(null);

  const delay = 5000; // 5 segundos

  useEffect(() => {
    if (paused) return;

    // limpar timeout anterior
    if (timeoutRef.current) {
      window.clearTimeout(timeoutRef.current);
    }

    timeoutRef.current = window.setTimeout(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, delay);

    return () => {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [index, paused]);

  function goTo(i: number) {
    setIndex(((i % slides.length) + slides.length) % slides.length);
  }

  function next() {
    goTo(index + 1);
  }

  function prev() {
    goTo(index - 1);
  }

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Carrossel de imagens"
    >
      <div className={styles.viewport}>
        <div
          className={styles.track}
          style={{ transform: `translateX(-${index * 100}%)` }}
        >
          {slides.map((s, i) => (
            <div className={styles.slide} key={i} aria-hidden={i !== index}>
              <Image
                src={s.image}
                alt={s.alt ?? s.title}
                fill
                className={styles.image}
                style={{ objectFit: "cover" }}
                unoptimized
              />
              <div className={styles.caption}>
                <h3 className={styles.title}>{s.title}</h3>
                <p className={styles.subtitle}>{s.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        className={`${styles.navBtn} ${styles.prev}`}
        onClick={prev}
        aria-label="Slide anterior"
      >
        ❮
      </button>

      <button
        className={`${styles.navBtn} ${styles.next}`}
        onClick={next}
        aria-label="Próximo slide"
      >
        ❯
      </button>

      <div className={styles.indicators}>
        {slides.map((_, i) => (
          <button
            key={i}
            className={`${styles.dot} ${i === index ? styles.active : ""}`}
            onClick={() => goTo(i)}
            aria-label={`Ir para slide ${i + 1}`}
            aria-current={i === index}
          />
        ))}
      </div>
    </div>
  );
}
