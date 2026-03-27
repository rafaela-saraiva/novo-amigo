'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Pet } from '@/Models/Pet';
import api from '@/services/api';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

const ESP_LABEL: Record<string, string> = {
  cachorro: 'Cães',
  gato: 'Gatos',
  passaro: 'Pássaros',
  coelho: 'Coelhos',
  hamster: 'Hamsters',
  fazenda: 'Fazenda',
};

function getAllImages(pet: Pet): string[] {
  if (pet.imagens?.length) return pet.imagens;
  if (pet.foto) {
    if (Array.isArray(pet.foto)) return pet.foto as string[];
    return [pet.foto as string];
  }
  if (pet.imagem) return [pet.imagem];
  return ['/placeholder.svg'];
}

export default function AnimalProfilePage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string | undefined;

  const [animal, setAnimal] = useState<Pet | null>(null);
  const [related, setRelated] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [favorited, setFavorited] = useState(false);

  useEffect(() => {
    if (!id) return;
    async function load() {
      try {
        setLoading(true);
        const [animalRes, allRes] = await Promise.all([
          api.get(`/animals/${id}`),
          api.get('/animals').catch(() => ({ data: [] })),
        ]);
        const pet: Pet = animalRes.data;
        setAnimal(pet);
        const imgs = getAllImages(pet);
        setSelectedImage(imgs[0]);
        setRelated((allRes.data as Pet[]).filter((p: Pet) => p.id !== pet.id).slice(0, 4));
      } catch (err) {
        console.error(err);
        setError('Erro ao carregar o perfil do animal.');
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [id]);

  useEffect(() => {
    if (!animal) return;
    const favoritos: Pet[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    setFavorited(favoritos.some((a) => a.id === animal.id));
  }, [animal]);

  const toggleFavorito = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Você precisa estar logado para favoritar!');
      return;
    }
    const favoritos: Pet[] = JSON.parse(localStorage.getItem('favoritos') || '[]');
    if (favorited) {
      localStorage.setItem('favoritos', JSON.stringify(favoritos.filter((a) => a.id !== animal!.id)));
      setFavorited(false);
    } else {
      favoritos.push(animal!);
      localStorage.setItem('favoritos', JSON.stringify(favoritos));
      setFavorited(true);
    }
  };

  if (loading) return (
    <>
      <Header />
      <main className={styles.loadingMain}>
        <div className={styles.spinner} />
        <p>Carregando perfil...</p>
      </main>
      <Footer />
    </>
  );

  if (error || !animal) return (
    <>
      <Header />
      <main className={styles.loadingMain}>
        <p className={styles.error}>{error || 'Animal não encontrado.'}</p>
        <button className={styles.backBtn} onClick={() => router.back()}>← Voltar</button>
      </main>
      <Footer />
    </>
  );

  const images = getAllImages(animal);
  const displayImage = selectedImage || images[0];
  const espLabel = ESP_LABEL[animal.especie] || animal.especie;

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>

          {/* Breadcrumb */}
          <nav className={styles.breadcrumb}>
            <button onClick={() => router.push('/nossos-animais')} className={styles.breadcrumbLink}>Adote</button>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
            <button onClick={() => router.push('/nossos-animais')} className={styles.breadcrumbLink}>{espLabel}</button>
            <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>chevron_right</span>
            <span className={styles.breadcrumbCurrent}>{animal.nome}</span>
          </nav>

          {/* Grid principal */}
          <div className={styles.mainGrid}>

            {/* ── GALERIA ── */}
            <div className={styles.galleryCol}>
              <div className={styles.heroWrap}>
                <img src={displayImage} alt={animal.nome} className={styles.heroImg} />
                <div className={styles.heroOverlay}>
                  <h2 className={styles.heroName}>{animal.nome}</h2>
                  <p className={styles.heroTagline}>Esperando por um lar ❤️</p>
                </div>
              </div>

              {images.length > 1 && (
                <div className={styles.thumbGrid}>
                  {images.slice(0, 4).map((img, i) => (
                    <button
                      key={i}
                      className={`${styles.thumb} ${displayImage === img ? styles.thumbActive : ''}`}
                      onClick={() => setSelectedImage(img)}
                    >
                      <img src={img} alt={`foto ${i + 1}`} className={styles.thumbImg} />
                      {i === 3 && images.length > 4 && (
                        <div className={styles.thumbMore}>+{images.length - 4}</div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* ── INFO ── */}
            <div className={styles.infoCol}>

              {/* Badges de status */}
              <div className={styles.badgeRow}>
                {animal.disponivel && (
                  <span className={`${styles.badge} ${styles.badgeGreen}`}>
                    <span className={styles.pulseDot} />
                    Disponível para adoção
                  </span>
                )}
                {animal.donoTipo === 'ong' && (
                  <span className={`${styles.badge} ${styles.badgeBlue}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>verified_user</span>
                    Verificado por ONG
                  </span>
                )}
                {animal.vacinado && (
                  <span className={`${styles.badge} ${styles.badgeSlate}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>medical_services</span>
                    Vacinas em dia
                  </span>
                )}
                {(animal.cidade || animal.donoEndereco) && (
                  <span className={`${styles.badge} ${styles.badgeSlate}`}>
                    <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>location_on</span>
                    {animal.cidade || animal.donoEndereco}
                  </span>
                )}
              </div>

              {/* Nome + Raça */}
              <div>
                <h1 className={styles.animalName}>{animal.nome}</h1>
                {animal.raca && <p className={styles.animalBreed}>{animal.raca}</p>}
              </div>

              {/* Atributos */}
              <div className={styles.attrsGrid}>
                <div className={styles.attrCell}>
                  <span className={styles.attrLabel}>Idade</span>
                  <span className={styles.attrValue}>{animal.idade}</span>
                </div>
                <div className={styles.attrCell}>
                  <span className={styles.attrLabel}>Porte</span>
                  <span className={`${styles.attrValue} ${styles.capitalize}`}>{animal.porte}</span>
                </div>
                <div className={styles.attrCell}>
                  <span className={styles.attrLabel}>Gênero</span>
                  <span className={`${styles.attrValue} ${styles.capitalize}`}>{animal.sexo}</span>
                </div>
              </div>

              {/* Castrado */}
              {animal.castrado && (
                <div className={styles.castradoBadge}>
                  <span className="material-symbols-outlined" style={{ fontSize: '16px' }}>check_circle</span>
                  Castrado
                </div>
              )}

              {/* Descrição curta */}
              {animal.descricao && (
                <div className={styles.quoteBlock}>
                  <p className={styles.quoteText}>
                    &quot;{animal.descricao.slice(0, 180)}{animal.descricao.length > 180 ? '...' : ''}&quot;
                  </p>
                </div>
              )}

              {/* Tags de personalidade */}
              {animal.tags && animal.tags.length > 0 && (
                <div className={styles.tagsSection}>
                  {animal.tags.map(tag => (
                    <span key={tag} className={styles.tagPill}>{tag}</span>
                  ))}
                </div>
              )}

              {/* CTA */}
              <div className={styles.ctaSection}>
                <button className={styles.ctaBtn} onClick={() => router.push('/doacao')}>
                  💚 Quero dar um lar ao {animal.nome}
                </button>
                <button
                  className={`${styles.favBtn} ${favorited ? styles.favBtnActive : ''}`}
                  onClick={toggleFavorito}
                  title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              <p className={styles.ctaNote}>
                Processo sujeito a entrevista para garantir o bem-estar do pet e da nova família.
              </p>
            </div>
          </div>

          {/* Storytelling */}
          {animal.descricao && (
            <section className={styles.storySection}>
              <h3 className={styles.storyTitle}>
                A História do {animal.nome}
                <span className={styles.storyDivider} />
              </h3>
              <div className={styles.storyCard}>
                <span
                  className="material-symbols-outlined"
                  style={{
                    position: 'absolute', top: '-20px', right: '-10px',
                    fontSize: '180px', opacity: 0.04, transform: 'rotate(12deg)',
                    pointerEvents: 'none',
                  }}
                >format_quote</span>
                <p className={styles.storyText}>{animal.descricao}</p>
              </div>
            </section>
          )}

          {/* Como Adotar */}
          {animal.comoAdotar && (
            <section className={styles.adoptSection}>
              <h3 className={styles.adoptTitle}>
                Como Adotar o {animal.nome}
                <span className={styles.storyDivider} />
              </h3>
              <div className={styles.adoptCard}>
                <div className={styles.adoptIcon}>
                  <span className="material-symbols-outlined">volunteer_activism</span>
                </div>
                <p className={styles.adoptText}>
                  {animal.comoAdotar}
                </p>
              </div>
            </section>
          )}

          {/* Animais relacionados */}
          {related.length > 0 && (
            <section className={styles.relatedSection}>
              <div className={styles.relatedHeader}>
                <div>
                  <h3 className={styles.relatedTitle}>Outros Amigos Esperando</h3>
                  <p className={styles.relatedSub}>Encontre o seu companheiro ideal</p>
                </div>
                <button className={styles.relatedLink} onClick={() => router.push('/nossos-animais')}>
                  Ver todos
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </button>
              </div>
              <div className={styles.relatedGrid}>
                {related.map((pet) => {
                  const petImgs = getAllImages(pet);
                  return (
                    <button
                      key={pet.id}
                      className={styles.relCard}
                      onClick={() => router.push(`/animal/${pet.id}`)}
                    >
                      <div className={styles.relImgWrap}>
                        <img src={petImgs[0]} alt={pet.nome} className={styles.relImg} />
                      </div>
                      <div className={styles.relInfo}>
                        <div className={styles.relNameRow}>
                          <span className={styles.relName}>{pet.nome}</span>
                          <span className="material-symbols-outlined" style={{ color: '#a93249', fontSize: '20px' }}>favorite</span>
                        </div>
                        <p className={styles.relSub}>{pet.raca || pet.especie} • {pet.idade}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>
          )}

        </div>
      </main>
      <Footer />
    </>
  );
}
