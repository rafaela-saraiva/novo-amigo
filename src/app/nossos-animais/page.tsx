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

  const [filtros, setFiltros] = useState({
    sexo: 'todos',
    porte: 'todos',
    disponibilidade: 'somente_disponiveis',
    busca: '',
  });

  // 🔹 Carregar os animais do backend
  useEffect(() => {
    async function carregarAnimais() {
      try {
        setLoading(true);
        const res = await api.get('/animals');
        setAnimais(res.data);
      } catch (err: any) {
        console.error(err);
        setError('Erro ao carregar animais do backend');
      } finally {
        setLoading(false);
      }
    }

    carregarAnimais();
  }, []);

  // 🔹 Filtragem local
  const animaisFiltrados = animais.filter(a => {
    const buscaLower = filtros.busca.toLowerCase();

    const matchBusca =
      a.nome.toLowerCase().includes(buscaLower) ||
      a.raca?.toLowerCase().includes(buscaLower) ||
      a.donoEndereco?.toLowerCase().includes(buscaLower);

    const matchEspecie = !especie || a.especie === especie;
    const matchSexo = filtros.sexo === 'todos' || a.sexo === filtros.sexo;
    const matchPorte = filtros.porte === 'todos' || a.porte === filtros.porte;
    const matchDisponibilidade =
      filtros.disponibilidade === 'todos' ||
      (filtros.disponibilidade === 'somente_disponiveis' && a.disponivel);

    return matchBusca && matchEspecie && matchSexo && matchPorte && matchDisponibilidade;
  });

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSalvarAnimal = (novo: Pet) => {
    setAnimais(prev => [...prev, novo]);
  };

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

  return (
    <>
      <Header />
      <main className={styles.main}>
        <div className={styles.container}>
          <div className={styles.titleSection}>
            <div>
              <h1 className={styles.title}>
                {especie ? `Animais da espécie: ${especie}` : 'Nossos Animais para Adoção'}
              </h1>
              {error && <div className={styles.errorMessage}>❌ {error}</div>}
            </div>
            <div className={styles.buttonGroup}>
              <button className={styles.cadastrarBtn} onClick={() => setModalAberto(true)}>
                + Cadastrar Animal
              </button>
            </div>
          </div>

          {/* Filtros */}
          <div className={styles.filtrosContainer}>
            <div className={styles.filtrosLinha1}>
              <select
                className={styles.select}
                value={filtros.sexo}
                onChange={e => handleFiltroChange('sexo', e.target.value)}
              >
                <option value="todos">Todos os sexos</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>

              <select
                className={styles.select}
                value={filtros.porte}
                onChange={e => handleFiltroChange('porte', e.target.value)}
              >
                <option value="todos">Todos os portes</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>

              <select
                className={styles.select}
                value={filtros.disponibilidade}
                onChange={e => handleFiltroChange('disponibilidade', e.target.value)}
              >
                <option value="somente_disponiveis">Somente disponíveis</option>
                <option value="todos">Todos</option>
              </select>
            </div>

            <div className={styles.filtrosLinha2}>
              <input
                type="text"
                className={styles.inputBusca}
                placeholder="Buscar por nome, raça ou endereço..."
                value={filtros.busca}
                onChange={e => handleFiltroChange('busca', e.target.value)}
              />
            </div>
          </div>

          {/* Contador */}
          <div className={styles.contador}>
            <div className={styles.contadorTexto}>
              {animaisFiltrados.length === 0
                ? 'Nenhum animal encontrado'
                : `${animaisFiltrados.length} ${animaisFiltrados.length === 1 ? 'animal encontrado' : 'animais encontrados'}`}
            </div>
          </div>

          {/* Grid */}
          {animaisFiltrados.length > 0 ? (
            <div className={styles.animaisGrid}>
              {animaisFiltrados.map((animal: Pet) => (
                <AnimalCard key={animal.id} animal={animal} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🐾</div>
              <h3>Nenhum animal encontrado</h3>
              <p>Tente ajustar os filtros ou cadastre um novo animal.</p>
              <button className={styles.cadastrarBtn} onClick={() => setModalAberto(true)}>
                Cadastrar Animal
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      <CadastrarAnimalModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={handleSalvarAnimal}
      />
    </>
  );
}
