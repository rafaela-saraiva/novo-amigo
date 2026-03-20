// import AdBanner from "@/components/AdBanner";
'use client';

import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { PetCard } from "@/components/ProductCard";
import api from "@/services/api";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

interface AnimalAPI {
  id: string;
  nome: string;
  especie: string;
  raca?: string;
  idade?: string | number;
  sexo?: string;
  porte?: string;
  foto?: string;
  imagem?: string;
  disponivel?: boolean;
  vacinado?: boolean;
  castrado?: boolean;
}

export default function Home() {
  const [todosAnimais, setTodosAnimais] = useState<AnimalAPI[]>([]);
  const [busca, setBusca] = useState('');
  const [especie, setEspecie] = useState('');
  const [idade, setIdade] = useState('');
  const [porte, setPorte] = useState('');

  useEffect(() => {
    api.get('/animals')
      .then((res) => {
        const disponiveis = (res.data as AnimalAPI[]).filter((a) => a.disponivel !== false);
        setTodosAnimais(disponiveis);
      })
      .catch(() => setTodosAnimais([]));
  }, []);

  const animaisFiltrados = todosAnimais.filter((pet) => {
    const buscaOk = busca === '' ||
      pet.nome.toLowerCase().includes(busca.toLowerCase()) ||
      (pet.raca ?? '').toLowerCase().includes(busca.toLowerCase());

    const especieOk = especie === '' ||
      (pet.especie ?? '').toLowerCase().includes(especie.toLowerCase());

    const idadeNum = Number(pet.idade);
    const idadeOk = idade === '' ||
      (idade === 'filhote' && idadeNum <= 1) ||
      (idade === 'jovem' && idadeNum > 1 && idadeNum <= 3) ||
      (idade === 'adulto' && idadeNum > 3 && idadeNum <= 8) ||
      (idade === 'idoso' && idadeNum > 8);

    const porteOk = porte === '' ||
      (pet.porte ?? '').toLowerCase() === porte.toLowerCase();

    return buscaOk && especieOk && idadeOk && porteOk;
  }).slice(0, 4);

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
                placeholder="Buscar por nome ou raça..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
              />
            </div>
            <div className={styles.filterBtns}>
              <select
                className={styles.filterSelect}
                value={especie}
                onChange={(e) => setEspecie(e.target.value)}
              >
                <option value="">🐾 Espécie</option>
                <option value="cachorro">🐶 Cães</option>
                <option value="gato">🐱 Gatos</option>
                <option value="passaro">🐦 Pássaros</option>
                <option value="coelho">🐰 Coelhos</option>
                <option value="hamster">🐹 Hamsters</option>
              </select>
              <select
                className={styles.filterSelect}
                value={idade}
                onChange={(e) => setIdade(e.target.value)}
              >
                <option value="">📅 Idade</option>
                <option value="filhote">Filhote (até 1 ano)</option>
                <option value="jovem">Jovem (1-3 anos)</option>
                <option value="adulto">Adulto (3-8 anos)</option>
                <option value="idoso">Idoso (+ 8 anos)</option>
              </select>
              <select
                className={styles.filterSelect}
                value={porte}
                onChange={(e) => setPorte(e.target.value)}
              >
                <option value="">📏 Porte</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>
            </div>
            {(busca || especie || idade || porte) && (
              <button
                className={styles.tuneBtn}
                onClick={() => { setBusca(''); setEspecie(''); setIdade(''); setPorte(''); }}
                title="Limpar filtros"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            )}
          </div>

          {/* Grid de pets */}
          <div className={styles.petsSection}>
            <div className={styles.petsHeader}>
              <h2 className={styles.petsTitle}>Pets esperando por você</h2>
              <Link href="/nossos-animais" className={styles.verTodos}>
                Ver todos
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>chevron_right</span>
              </Link>
            </div>
            <div className={styles.petsGrid}>
              {animaisFiltrados.length === 0 ? (
                <p style={{ color: '#64748b', gridColumn: '1/-1' }}>Nenhum animal encontrado com esses filtros.</p>
              ) : (
                animaisFiltrados.map((pet) => {
                  const idadeStr = pet.idade != null ? `${pet.idade} ${Number(pet.idade) === 1 ? 'ano' : 'anos'}` : '';
                  const badge = pet.vacinado ? 'Vacinado' : pet.castrado ? 'Castrado' : pet.especie ?? '';
                  const traits = [pet.raca, pet.sexo].filter(Boolean) as string[];
                  return (
                    <PetCard
                      key={pet.id}
                      image={pet.foto || pet.imagem || ''}
                      alt={pet.nome}
                      nome={pet.nome}
                      idade={idadeStr}
                      badge={badge}
                      porte={pet.porte ?? ''}
                      traits={traits}
                      href={`/nossos-animais`}
                    />
                  );
                })
              )}
            </div>
          </div>
        </div>

        {/* Como funciona a adoção */}
        <section id="como-funciona" className={styles.howSection}>
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
                <Link href="/nossos-animais" className={styles.ctaBtnPrimary}>Quero começar</Link>
                <Link href="/faleConosco" className={styles.ctaBtnSecondary}>Falar com consultor</Link>
              </div>
            </div>

            <div className={styles.ctaRight}>
              <div className={styles.ctaImgGrid}>
                <div className={styles.ctaColOffset}>
                  <div className={styles.ctaImgBox}>
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBcFIl4PyQnQJlzqmw4PHyph0k-fQKFSLAod-eXMKAlkaD40g8573fYqWSJ4Pll8HbAydU1pAknp_GoFlWZSZNkAIJZc5pbqZycMNcvQY0nNOQRK_KKvyM12JoPyVrGdLajne3lk-3rwQZnAiOCQv3kIwRrjEfDVLfY5xJVkitgAR1PJZYwwkO8r1SbGVEH2FheyhY6mz_B4cvFU7FQUuYK4av0KycA_SczID_hn5EiYkRpeB_p_E6ei7uFoGtHaLW5KwRQMXW_Yb2D"
                      alt="Cães brincando"
                      width={300}
                      height={220}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.ctaImgBox}>
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuBSCDhlxa_15lKGo3QUaEP33akCQEl5if9EBhJbnCnQu2ZwjK_PsjP1Fd8gez9V67zhv3cO1TbRIH98sJUuhRwV8vxoHfEUQGw9bQhmo2dqvS62Q23j99cFsLgwmQ8izlzGuU8YeNf3zOp9T6OR_i5HIbvr9U4qawpsSyv16R2PSkkXCsCjcUxRot60eyzvOYwKzSPgYII7mSaNiPhXqxDrL9tFygThTxKzg5e0Lnnyg003uvPj5c-VTQ0cCzDM7q2EsblP-Eji7fm2"
                      alt="Retrato de gato"
                      width={300}
                      height={220}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                </div>
                <div className={styles.ctaCol}>
                  <div className={styles.ctaImgBox}>
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuA9NafNsG-qsGgjzKzm4qLjZs-fMTzM7ujxynf-wNeSqUJ8QusnRrFhplJFKGmdLvDXw4NB9qPMqo5lFsnm1byb1mcLAy34iBhis6buWxjjkr5Zb6LROMln_n0s5wYLifViunDO7PTW3HvGnw8UYsdADGFN73WEOeE7MO4cXaNsUqlrwKEbbGOv6kfivmbDsf6v_i_OXqMNyKjLrlJTioMur2AWe4R_w5q6nu0r_DmmQpdxYDmxVOPZaAX_BMLCstOY6S1Q_K5fKvKd"
                      alt="Filhote golden"
                      width={300}
                      height={220}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </div>
                  <div className={styles.ctaImgBox}>
                    <Image
                      src="https://lh3.googleusercontent.com/aida-public/AB6AXuCFYSyuc288b0RpGd-8xRU8UA2hlvc2tCSjLxNgIAkw3_xtL0LE4PtbxD1Zy9ycO-l0LuQGnVsGfb3lTz6ZkNIa8BBfFQLzxgk97zx5eQYe9G8oI6dVu3U1gUrEncoN0BIEl1lBAoylotqe3cPIkRtXF1CTrN8b3SWt63VVkSqPEQK0_xncdBQMXijiM5I5UUIzKTGdAQiMVvZ-485FdUAAOE9u__ixry1Mq1MIh6QkjGh1mdeCPZ83XYBgltR38Rz9lRQW-Ea_QVEq"
                      alt="Cão inteligente"
                      width={300}
                      height={220}
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
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
