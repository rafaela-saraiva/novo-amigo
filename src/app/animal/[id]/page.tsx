'use client'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { cachorros as sampleCachorros, gatos as sampleGatos } from '@/data/sampleAnimals';
import { Animal } from '@/Models/Pet';
import { storageUtils } from '@/utils/storage';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function PerfilAnimal() {
  const params = useParams();
  const [animal, setAnimal] = useState<Animal | null>(null);
  const [loading, setLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    const animalId = params.id as string;
    if (animalId) {
      const animais = storageUtils.loadAnimals();
      const animalEncontrado = animais.find(a => a.id.toString() === animalId);
      
      // Se não encontrar nos dados salvos, tentar encontrar em exemplos estáticos (cachorros/gatos)
      if (!animalEncontrado) {
        const idNum = parseInt(animalId);
        const exemploCachorro = sampleCachorros.find(p => p.id === idNum);
        const exemploGato = sampleGatos.find(p => p.id === idNum);

        if (exemploCachorro) {
          const animalExemplo: Animal = {
            id: exemploCachorro.id,
            nome: exemploCachorro.nome,
            idade: "Idade não informada",
            cidade: "Cidade não informada",
            especie: "cachorro",
            sexo: "macho",
            porte: "medio",
            descricao: exemploCachorro.desc || "",
            vacinado: false,
            castrado: false,
            foto: exemploCachorro.img,
            disponivel: true
          };
          setAnimal(animalExemplo);
        } else if (exemploGato) {
          const animalExemplo: Animal = {
            id: exemploGato.id,
            nome: exemploGato.nome,
            idade: "Idade não informada",
            cidade: "Cidade não informada",
            especie: "gato",
            sexo: "macho",
            porte: "medio",
            descricao: exemploGato.desc || "",
            vacinado: false,
            castrado: false,
            foto: exemploGato.img,
            disponivel: true
          };
          setAnimal(animalExemplo);
        } else {
          // fallback genérico
          const animalExemplo: Animal = {
            id: idNum,
            nome: `Animal ${animalId}`,
            idade: "Idade não informada",
            cidade: "São Paulo",
            especie: "cachorro",
            sexo: "macho",
            porte: "medio",
            descricao: "Este é um animal de exemplo. Para ver informações reais, cadastre animais na página 'Nossos Animais'.",
            vacinado: false,
            castrado: false,
            foto: "https://via.placeholder.com/600x400?text=Animal+de+Exemplo",
            disponivel: true
          };
          setAnimal(animalExemplo);
        }
      } else {
        setAnimal(animalEncontrado);
      }
    }
    setLoading(false);
  }, [params.id]);

  const handleAdotar = () => {
    if (!animal) return;

    if (window.confirm(`Confirma seu interesse em adotar ${animal.nome}?`)) {
      const animalAtualizado = { ...animal, disponivel: false };
      const updatedAnimals = storageUtils.updateAnimal(animalAtualizado);
      
      if (updatedAnimals) {
        setAnimal(animalAtualizado);
        alert(`Parabéns! Seu interesse em adotar ${animal.nome} foi registrado. Em breve entraremos em contato!`);
      } else {
        alert('Erro ao processar adoção. Tente novamente.');
      }
    }
  };

  const handleImageError = () => {
    setImageError(true);
  };

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.loading}>
              <div>Carregando perfil do animal...</div>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  if (!animal) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div className={styles.notFound}>
              <h1>Animal não encontrado</h1>
              <p>O animal que você está procurando não foi encontrado.</p>
              <Link href="/nossos-animais" className={styles.backButton}>
                ← Voltar para lista de animais
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const imageSrc = imageError || !animal.foto 
  ? '/placeholder.svg'
    : animal.foto;

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <Link href="/nossos-animais">Nossos Animais</Link>
            <span className={styles.separator}> / </span>
            <span>{animal.nome}</span>
          </div>

          {/* Perfil do Animal */}
          <div className={styles.profile}>
            {/* Coluna da Foto */}
            <div className={styles.imageColumn}>
              <div className={styles.imageContainer}>
                <Image
                  src={imageSrc}
                  alt={`Foto de ${animal.nome}`}
                  fill
                  className={styles.image}
                  onError={handleImageError}
                  priority
                />
                {!animal.disponivel && (
                  <div className={styles.adoptedBadge}>
                    ❤️ Adotado
                  </div>
                )}
              </div>
            </div>

            {/* Coluna das Informações */}
            <div className={styles.infoColumn}>
              <div className={styles.header}>
                <h1 className={styles.name}>{animal.nome}</h1>
                <div className={styles.species}>
                  <span className={`${styles.speciesBadge} ${styles[animal.especie]}`}>
                    {animal.especie.charAt(0).toUpperCase() + animal.especie.slice(1)}
                  </span>
                </div>
              </div>

              <div className={styles.basicInfo}>
                <div className={styles.infoGrid}>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Idade:</span>
                    <span className={styles.value}>{animal.idade}</span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Sexo:</span>
                    <span className={styles.value}>
                      {animal.sexo === 'macho' ? '♂️ Macho' : '♀️ Fêmea'}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Porte:</span>
                    <span className={styles.value}>
                      {animal.porte.charAt(0).toUpperCase() + animal.porte.slice(1)}
                    </span>
                  </div>
                  <div className={styles.infoItem}>
                    <span className={styles.label}>Cidade:</span>
                    <span className={styles.value}>📍 {animal.cidade}</span>
                  </div>
                </div>
              </div>

              {/* Informações de Saúde */}
              <div className={styles.healthInfo}>
                <h3 className={styles.sectionTitle}>Informações de Saúde</h3>
                <div className={styles.healthGrid}>
                  <div className={`${styles.healthItem} ${animal.vacinado ? styles.yes : styles.no}`}>
                    {animal.vacinado ? '✅' : '❌'} Vacinado
                  </div>
                  <div className={`${styles.healthItem} ${animal.castrado ? styles.yes : styles.no}`}>
                    {animal.castrado ? '✅' : '❌'} Castrado
                  </div>
                </div>
              </div>

              {/* Descrição */}
              {animal.descricao && (
                <div className={styles.description}>
                  <h3 className={styles.sectionTitle}>Sobre {animal.nome}</h3>
                  <p className={styles.descriptionText}>{animal.descricao}</p>
                </div>
              )}

              {/* Botões de Ação */}
              <div className={styles.actions}>
                {animal.disponivel ? (
                  <button 
                    className={styles.adoptButton}
                    onClick={handleAdotar}
                  >
                    ❤️ Quero Adotar {animal.nome}
                  </button>
                ) : (
                  <div className={styles.adoptedMessage}>
                    <span className={styles.adoptedIcon}>❤️</span>
                    <span>{animal.nome} já foi adotado!</span>
                  </div>
                )}
                <Link href="/nossos-animais" className={styles.backButton}>
                  ← Voltar para lista de animais
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}