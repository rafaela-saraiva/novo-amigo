import { Animal } from '@/Models/Pet';
import Image from 'next/image';
import { useState } from 'react';
import styles from './styles.module.css';

interface AnimalCardProps {
  animal: Animal;
  onAdotar?: () => void;
}

export default function AnimalCard({ animal, onAdotar }: AnimalCardProps) {
  const [imageSrc, setImageSrc] = useState(animal.foto || 'https://via.placeholder.com/300x200?text=Sem+Foto');
  const [imageError, setImageError] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc('https://via.placeholder.com/300x200?text=Sem+Foto');
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <Image 
          src={imageSrc} 
          alt={animal.nome}
          fill
          className={styles.image}
          style={{ objectFit: 'cover' }}
          onError={handleImageError}
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
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
            <span className={styles.tag}>
              {animal.porte}
            </span>
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
            <span>{animal.cidade}</span>
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
        
        {animal.disponivel && onAdotar && (
          <button className={styles.adotarBtn} onClick={onAdotar}>
            Quero Adotar
          </button>
        )}
      </div>
    </div>
  );
}