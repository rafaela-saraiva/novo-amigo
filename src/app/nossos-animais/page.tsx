'use client';

import AnimalCard from '@/components/AnimalCard';
import CadastrarAnimalModal from '@/components/CadastrarAnimalModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Pet } from '@/Models/Pet';
import api from '@/services/api';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function NossosAnimais() {
  const params = useParams();
  const especie = params?.especie as string | undefined;

  const [animais, setAnimais] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  // 🔹 Carrega todos os animais do backend
  useEffect(() => {
    async function carregarAnimais() {
      try {
        setLoading(true);
        const res = await api.get('/animals');
        setAnimais(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Erro ao conectar com o backend');
      } finally {
        setLoading(false);
      }
    }

    carregarAnimais();
  }, []);

  // 🔹 Função para salvar novo animal no backend
  const handleSalvarAnimal = async (novoAnimal: Pet) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para cadastrar um animal.');
        return;
      }

      const formData = new FormData();

      // adiciona campos ao formData (inclusive imagem)
      Object.entries(novoAnimal).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          formData.append(key, value as any);
        }
      });

      const res = await api.post('/animals', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setAnimais((prev) => [...prev, res.data]);
      setModalAberto(false);
    } catch (err: any) {
      console.error('❌ Erro ao salvar animal:', err);
      alert('Erro ao salvar o animal. Verifique se você está logado.');
    }
  };

  // 🔹 Filtro simples por espécie (opcional)
  const animaisExibidos = especie
    ? animais.filter((a) => a.especie === especie)
    : animais;

  // 🔹 Estado de carregamento
  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p>Carregando animais...</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // 🔹 Erro de conexão
  if (error) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p>❌ {error}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // 🔹 Layout principal
  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.titleSection}>
            <div>
              <h1 className={styles.title}>
                {especie
                  ? `Animais da espécie: ${especie}`
                  : 'Nossos Animais para Adoção'}
              </h1>
            </div>

            <div className={styles.buttonGroup}>
              <button
                className={styles.cadastrarBtn}
                onClick={() => setModalAberto(true)}
              >
                + Cadastrar Animal
              </button>
            </div>
          </div>

          {/* 🔹 Lista de animais */}
          {animaisExibidos.length > 0 ? (
            <div className={styles.animaisGrid}>
              {animaisExibidos.map((animal) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🐾</div>
              <h3>Nenhum animal encontrado</h3>
              <p>
                {especie
                  ? `Nenhum animal da espécie "${especie}" foi encontrado.`
                  : 'Ainda não há animais cadastrados no sistema.'}
              </p>
              <button
                className={styles.cadastrarBtn}
                onClick={() => setModalAberto(true)}
              >
                Cadastrar Animal
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* 🔹 Modal para cadastro */}
      <CadastrarAnimalModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={handleSalvarAnimal}
      />
    </>
  );
}
