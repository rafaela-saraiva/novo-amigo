'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import LoginModal from '@/components/LoginModal';
import { useAuth } from '@/contexts/AuthContext';
import { Pet } from '@/Models/Pet';
import api from '@/services/api';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo, useRef, useState } from 'react';
import styles from './styles.module.css';

const ESP_LABEL: Record<string, string> = {
  cachorro: 'Cães',
  gato: 'Gatos',
  passaro: 'Pássaros',
  coelho: 'Coelhos',
  hamster: 'Hamsters',
  fazenda: 'Fazenda',
};

type CreatorSource = Pet & Partial<{
  shelterId: number;
  shelter: { nome?: string };
  userId: number;
  user: { nome?: string; role?: string; groups?: string[] };
  donoRole: string;
  donoGroups: string[];
  creator: { nome?: string };
  createdBy: { nome?: string };
}>;

function resolveCreator(pet: Pet) {
  const src = pet as unknown as CreatorSource;

  const name =
    pet.donoNome ||
    src.shelter?.nome ||
    src.user?.nome ||
    src.creator?.nome ||
    src.createdBy?.nome ||
    '';

  const isOng = pet.donoTipo === 'ong' || Boolean(src.shelter) || Boolean(src.shelterId);

  const isAdmin =
    src.donoRole === 'ADMIN' ||
    src.user?.role === 'ADMIN' ||
    (Array.isArray(src.donoGroups) && src.donoGroups.includes('Administrador')) ||
    (Array.isArray(src.user?.groups) && src.user.groups.includes('Administrador'));

  const label = isOng ? 'ONG' : isAdmin ? 'Administrador' : 'Usuário';

  return { label, name };
}

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
  const searchParams = useSearchParams();
  const id = params?.id as string | undefined;
  const { user, loading: authLoading } = useAuth();

  const [animal, setAnimal] = useState<Pet | null>(null);
  const [related, setRelated] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [favorited, setFavorited] = useState(false);
  const [shelterProfile, setShelterProfile] = useState<{ id: number; nome: string; fotos?: string[] | null } | null>(null);
  const [phoneRequired, setPhoneRequired] = useState(false);

  const comoAdotarSectionRef = useRef<HTMLElement | null>(null);
  const [loginOpen, setLoginOpen] = useState(false);
  const [scrollDepoisDoLogin, setScrollDepoisDoLogin] = useState(false);
  const [habilitarSolicitar, setHabilitarSolicitar] = useState(false);
  const [habilitarSolicitarDepoisDoLogin, setHabilitarSolicitarDepoisDoLogin] = useState(false);
  const [enviandoSolicitacao, setEnviandoSolicitacao] = useState(false);
  const [solicitacaoEnviada, setSolicitacaoEnviada] = useState(false);

  const podeVerComoAdotar = useMemo(() => !!user && !authLoading, [user, authLoading]);
  const isUser = user?.tipo !== 'shelter';
  const autoSolicitar = searchParams?.get('solicitar') === '1';

  const scrollParaComoAdotar = () => {
    const target = comoAdotarSectionRef.current || document.getElementById('como-adotar');
    target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleQueroDarLar = () => {
    scrollParaComoAdotar();

    if (authLoading) return;
    if (!user) {
      setScrollDepoisDoLogin(true);
      setHabilitarSolicitarDepoisDoLogin(true);
      setLoginOpen(true);
      return;
    }

    if (animal?.disponivel && isUser && !solicitacaoEnviada) {
      setHabilitarSolicitar(true);
    }
  };

  useEffect(() => {
    if (loginOpen) return;
    if (!user) return;
    if (!scrollDepoisDoLogin) return;

    const t = setTimeout(() => {
      scrollParaComoAdotar();
      setScrollDepoisDoLogin(false);

      if (habilitarSolicitarDepoisDoLogin && isUser && animal?.disponivel && !solicitacaoEnviada) {
        setHabilitarSolicitar(true);
      }
      setHabilitarSolicitarDepoisDoLogin(false);
    }, 50);

    return () => clearTimeout(t);
  }, [loginOpen, user, scrollDepoisDoLogin, habilitarSolicitarDepoisDoLogin, isUser, animal?.disponivel, solicitacaoEnviada]);

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
    if (!autoSolicitar) return;
    if (authLoading) return;
    if (!animal?.id) return;
    setHabilitarSolicitar(true);
    const t = setTimeout(() => scrollParaComoAdotar(), 50);
    return () => clearTimeout(t);
  }, [autoSolicitar, authLoading, animal?.id]);

  useEffect(() => {
    if (!animal) return;

    const shelterId = getShelterIdFromPet(animal);
    if (!shelterId) {
      setShelterProfile(null);
      return;
    }

    async function loadShelter() {
      try {
        // Preferir dados já embutidos no payload do animal (evita 401 quando /shelters é protegido)
        const embedded = (() => {
          const src = animal as unknown as Partial<{
            shelter?: { nome?: string; urlImage?: string[]; fotos?: string[] };
            ong?: { nome?: string; urlImage?: string[]; fotos?: string[] };
          }>;

          const nome = src.shelter?.nome || src.ong?.nome;
          const fotos = src.shelter?.urlImage || src.shelter?.fotos || src.ong?.urlImage || src.ong?.fotos;

          if (nome || (Array.isArray(fotos) && fotos.length > 0)) {
            return { nome: nome || animal?.donoNome || 'ONG', fotos: fotos || null };
          }
          return null;
        })();

        if (embedded) {
          setShelterProfile({
            id: shelterId!,
            nome: embedded.nome,
            fotos: embedded.fotos ?? null,
          });
          return;
        }

        let data: unknown = null;
        try {
          const res = await api.get(`/shelters/${shelterId}`);
          data = res.data as unknown;
        } catch (err: unknown) {
          const axiosLike = err as { response?: { status?: number } };
          if (axiosLike?.response?.status === 401) {
            // endpoint protegido: mantém só o nome (sem foto)
            setShelterProfile({
              id: shelterId!,
              nome: animal?.donoNome || 'ONG',
              fotos: null,
            });
            return;
          }
          if (axiosLike?.response?.status !== 404) throw err;

          const list = await api.get("/shelters");
          const found = (Array.isArray(list.data) ? list.data : []).find((s: unknown) => {
            const rec = s as Partial<{ id: unknown }>;
            return Number(rec?.id) === shelterId;
          });
          data = found ?? null;
        }

        const rec = (data && typeof data === 'object') ? (data as Partial<{ id: unknown; nome: unknown; fotos: unknown; urlImage: unknown }>) : null;
        if (!rec) {
          setShelterProfile(null);
          return;
        }

        setShelterProfile({
          id: Number(rec.id),
          nome: String(rec.nome || ''),
          fotos: (rec.fotos ?? rec.urlImage) as string[] | null | undefined,
        });
      } catch (err) {
        console.error(err);
        setShelterProfile(null);
      }
    }

    loadShelter();
  }, [animal]);

  useEffect(() => {
    setSolicitacaoEnviada(false);
    setHabilitarSolicitar(false);
    setHabilitarSolicitarDepoisDoLogin(false);
    setPhoneRequired(false);
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

  const getShelterIdFromPet = (pet: Pet): number | null => {
    const src = pet as unknown as Partial<{ shelterId: number }>;
    if (typeof src.shelterId === 'number') return src.shelterId;

    if (pet.donoTipo === 'ong') {
      const n = Number(pet.donoId);
      if (Number.isFinite(n) && n > 0) return n;
    }

    return null;
  };

  async function solicitarContato() {
    if (!animal) return;
    if (authLoading) return;
    if (!user) {
      setScrollDepoisDoLogin(true);
      setHabilitarSolicitarDepoisDoLogin(true);
      setLoginOpen(true);
      return;
    }

    if (!isUser) {
      alert('Somente usuários podem solicitar contato para adoção.');
      return;
    }

    if (!animal.disponivel) {
      alert('Este pet já está indisponível.');
      return;
    }

    if (!habilitarSolicitar) {
      scrollParaComoAdotar();
      setHabilitarSolicitar(true);
      return;
    }

    if (solicitacaoEnviada) return;

    const shelterId = getShelterIdFromPet(animal);
    if (!shelterId) {
      alert('Não foi possível identificar a ONG responsável por este pet.');
      return;
    }

    const userPhoneRaw =
      (user as unknown as { phone?: string }).phone ||
      (user as unknown as { telefone?: string }).telefone ||
      '';

    if (!userPhoneRaw.trim()) {
      setPhoneRequired(true);
      alert('Você precisa ter um número de telefone cadastrado na sua conta para facilitar o contato.');
    }

    const payload = {
      petId: animal.id,
      shelterId,
      userId: user.id,
      userTelefone: userPhoneRaw.trim(),
      status: 'PENDING',
    };

    try {
      setEnviandoSolicitacao(true);

      await api.post('/adoption-requests', payload);

      setSolicitacaoEnviada(true);
      alert('Solicitação enviada! Aguarde a resposta da ONG.');
    } catch (err) {
      console.error(err);
      alert('Erro ao enviar solicitação. (Verifique se o backend possui /adoption-requests)');
    } finally {
      setEnviandoSolicitacao(false);
    }
  }

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
  const creator = resolveCreator(animal);
  const shelterIdForLink = getShelterIdFromPet(animal);
  const shelterLink = shelterIdForLink ? `/ongs/${shelterIdForLink}` : null;
  const shelterPhoto =
    Array.isArray(shelterProfile?.fotos) ? shelterProfile!.fotos!.find(Boolean) || null : null;
  const creatorDisplayName = shelterProfile?.nome || creator.name;
  const comoAdotarTexto =
    animal.comoAdotar ||
    'As instruções de adoção ainda não foram cadastradas para este animal.';

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
                  <p className={styles.heroTagline}>Esperando por um lar</p>
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

              {(creatorDisplayName || creator.name) && (
                <div
                  className={`${styles.creatorCard} ${shelterLink ? styles.creatorCardClickable : ''}`}
                  onClick={() => {
                    if (shelterLink) router.push(shelterLink);
                  }}
                  role={shelterLink ? 'button' : undefined}
                  tabIndex={shelterLink ? 0 : undefined}
                >
                  <div className={styles.creatorIcon}>
                    {shelterPhoto ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={shelterPhoto} alt={creator.name} className={styles.creatorAvatar} />
                    ) : (
                      <span className="material-symbols-outlined">account_circle</span>
                    )}
                  </div>
                  <div className={styles.creatorText}>
                    <span className={styles.creatorTitle}>Cadastrado por</span>
                    <span className={styles.creatorValue}>
                      {creator.label}: {creatorDisplayName}
                    </span>
                  </div>
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
                <button
                  className={styles.ctaBtn}
                  onClick={() => {
                    if (!animal.disponivel) return;

                    const podeSolicitar =
                      Boolean(user) &&
                      isUser &&
                      podeVerComoAdotar &&
                      habilitarSolicitar &&
                      !solicitacaoEnviada;

                    if (podeSolicitar) {
                      solicitarContato();
                      return;
                    }

                    handleQueroDarLar();
                  }}
                  disabled={
                    !animal.disponivel ||
                    enviandoSolicitacao ||
                    (Boolean(user) && isUser && podeVerComoAdotar && habilitarSolicitar && solicitacaoEnviada)
                  }
                >
                  {!animal.disponivel
                    ? 'Indisponível'
                    : Boolean(user) && isUser && podeVerComoAdotar && habilitarSolicitar
                      ? (solicitacaoEnviada ? 'Solicitação enviada' : (enviandoSolicitacao ? 'Enviando...' : 'Solicitar contato'))
                      : `Quero dar um lar ao ${animal.nome}`}
                </button>
                <button
                  className={`${styles.favBtn} ${favorited ? styles.favBtnActive : ''}`}
                  onClick={toggleFavorito}
                  title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
                >
                  <span className="material-symbols-outlined">favorite</span>
                </button>
              </div>
              {phoneRequired && (
                <div className={styles.phoneWarn}>
                  <span className="material-symbols-outlined">warning</span>
                  <span>
                    Para solicitar contato, cadastre seu telefone em{" "}
                    <button className={styles.phoneWarnLink} onClick={() => router.push("/configuracoes")}>
                      Configurações
                    </button>
                    .
                  </span>
                </div>
              )}
              <p className={styles.ctaNote}>
                Processo sujeito a entrevista para garantir o bem-estar do pet e da nova família.
              </p>
            </div>
          </div>

          {/* Como Adotar */}
          <section
            ref={(el) => {
              comoAdotarSectionRef.current = el;
            }}
            id="como-adotar"
            className={styles.adoptSection}
          >
            <h3 className={styles.adoptTitle}>
              Como Adotar o {animal.nome}
              <span className={styles.storyDivider} />
            </h3>
            <div className={styles.adoptCard}>
              <div className={styles.adoptIcon}>
                <span className="material-symbols-outlined">
                  {podeVerComoAdotar ? 'volunteer_activism' : 'lock'}
                </span>
              </div>
              <div className={styles.adoptContent}>
                <p className={styles.adoptText}>
                  {podeVerComoAdotar
                    ? comoAdotarTexto
                    : 'Para ver o passo a passo e adotar este animal, faça login.'}
                </p>
                {!podeVerComoAdotar && (
                  <div className={styles.adoptActions}>
                    <button
                      className={styles.adoptLoginBtn}
                      onClick={() => {
                        if (authLoading) return;
                        setScrollDepoisDoLogin(true);
                        setLoginOpen(true);
                      }}
                    >
                      Fazer login
                    </button>
                    <button
                      className={styles.adoptCadastroBtn}
                      onClick={() => router.push('/cadastro')}
                    >
                      Criar conta
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>

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

      <LoginModal
        open={loginOpen}
        onClose={() => {
          setLoginOpen(false);
          if (!user) setScrollDepoisDoLogin(false);
        }}
      />
    </>
  );
}
