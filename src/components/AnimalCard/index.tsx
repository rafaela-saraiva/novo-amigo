import { Pet } from '@/Models/Pet';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import styles from './styles.module.css';

interface AnimalCardProps {
  animal: Pet;
  onAdotar?: () => void;
  priority?: boolean;
}

export default function AnimalCard({ animal, onAdotar, priority = false }: AnimalCardProps) {
  // 🔹 funciona com 'foto' (do backend) e 'imagem' (fallback)
  const [imageSrc, setImageSrc] = useState(
    animal.foto || animal.imagem || '/placeholder.svg'
  );
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc('/placeholder.svg');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image
          src={imageSrc}
          alt={animal.nome}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className={styles.image}
          style={{ objectFit: 'cover' }}
          onError={handleImageError}
          priority={priority}
        />
        <div className={styles.statusBadge}>
          {animal.disponivel ? 'Disponível' : 'Adotado'}
        </div>
      </div>

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.nome}>{animal.nome}</h3>
          <div className={styles.tags}>
            <span className={`${styles.tag} ${styles[animal.especie]}`}>
              {animal.especie}
            </span>
            {animal.raca && (
              <span className={`${styles.tag} ${styles.raca}`}>
                {animal.raca}
              </span>
            )}
            <span className={styles.tag}>{animal.porte}</span>
          </div>
        </div>

        <div className={styles.info}>
          <div className={styles.infoItem}>
            <span className={styles.label}>Idade:</span>
            <span>{animal.idade}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Sexo:</span>
            <span>{animal.sexo}</span>
          </div>
          <div className={styles.infoItem}>
            <span className={styles.label}>Cidade:</span>
            <span>{animal.cidade || animal.donoEndereco || '—'}</span>
          </div>
        </div>

        {animal.descricao && (
          <p className={styles.descricao}>{animal.descricao}</p>
        )}

        <div className={styles.características}>
          {animal.vacinado && (
            <span className={styles.caracteristica}>✅ Vacinado</span>
          )}
          {animal.castrado && (
            <span className={styles.caracteristica}>✅ Castrado</span>
          )}
        </div>

        <div className={styles.actions}>
          <Link href={`/animal/${animal.id}`} className={styles.verPerfilBtn}>
            Ver Perfil
          </Link>
          {animal.disponivel && onAdotar && (
            <button className={styles.adotarBtn} onClick={onAdotar}>
              Quero Adotar
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
