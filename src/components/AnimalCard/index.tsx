'use client';

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

export default function AnimalCard({ animal, priority = false }: AnimalCardProps) {
  const resolvedFoto = Array.isArray(animal.foto)
    ? animal.foto.find((f) => f && f.trim()) ?? ''
    : animal.foto;
  const [imageSrc, setImageSrc] = useState(
    resolvedFoto || animal.imagem || '/placeholder.svg'
  );
  const [imageError, setImageError] = useState(false);
  const [favorito, setFavorito] = useState(false);

  const handleImageError = () => {
    if (!imageError) {
      setImageError(true);
      setImageSrc('/placeholder.svg');
    }
  };

  // Chips a exibir no card
  const chips: string[] = [
    animal.especie,
    animal.raca,
    animal.porte,
    animal.vacinado ? 'Vacinado' : '',
    animal.castrado ? 'Castrado' : '',
  ].filter(Boolean) as string[];

  const sexoIdade = [
    animal.sexo ? (animal.sexo.charAt(0).toUpperCase() + animal.sexo.slice(1)) : '',
    animal.idade ? `${animal.idade} ${Number(animal.idade) === 1 ? 'ano' : 'anos'}` : '',
  ].filter(Boolean).join(' • ');

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

  const resolveCreator = () => {
    const src = animal as unknown as CreatorSource;

    const name =
      animal.donoNome ||
      src.shelter?.nome ||
      src.user?.nome ||
      src.creator?.nome ||
      src.createdBy?.nome ||
      '';

    const isOng =
      animal.donoTipo === 'ong' ||
      Boolean(src.shelter) ||
      Boolean(src.shelterId);

    const isAdmin =
      src.donoRole === 'ADMIN' ||
      src.user?.role === 'ADMIN' ||
      (Array.isArray(src.donoGroups) && src.donoGroups.includes('Administrador')) ||
      (Array.isArray(src.user?.groups) && src.user.groups.includes('Administrador'));

    const label = isOng ? 'ONG' : isAdmin ? 'Administrador' : 'Usuário';

    return { label, name };
  };

  const creator = resolveCreator();
  const creatorLabel = creator.label === 'Usuário' ? 'Criado por' : creator.label;

  return (
    <div className={styles.card}>
      {/* Imagem */}
      <div className={styles.imageWrapper}>
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

        {/* Badge disponível / adotado */}
        <span className={animal.disponivel ? styles.badgeDisponivel : styles.badgeAdotado}>
          {animal.disponivel ? 'Disponível' : 'Adotado'}
        </span>

        {/* Botão coração */}
        <button
          className={`${styles.heartBtn} ${favorito ? styles.heartActive : ''}`}
          aria-label="Favoritar"
          onClick={() => setFavorito((f) => !f)}
        >
          <span className="material-symbols-outlined">
            {favorito ? 'favorite' : 'favorite'}
          </span>
        </button>
      </div>

      {/* Conteúdo */}
      <div className={styles.body}>
        <div className={styles.nameRow}>
          <h3 className={styles.nome}>{animal.nome}</h3>
          {sexoIdade && <span className={styles.sexoIdade}>{sexoIdade}</span>}
        </div>

        {creator.name && (
          <div className={styles.creatorRow}>
            <span className={styles.creatorLabel}>{creatorLabel}:</span>
            <span className={styles.creatorName}>{creator.name}</span>
          </div>
        )}

        {chips.length > 0 && (
          <div className={styles.chips}>
            {chips.map((chip) => (
              <span key={chip} className={styles.chip}>{chip}</span>
            ))}
          </div>
        )}

        <Link href={`/animal/${animal.id}`} className={styles.conhecerBtn}>
          Conhecer
          <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
        </Link>
      </div>
    </div>
  );
}
