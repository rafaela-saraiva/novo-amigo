/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AnimalCard from '@/components/AnimalCard';
import CadastrarAnimalModal from '@/components/CadastrarAnimalModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Pet } from '@/Models/Pet';
import api from '@/services/api';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function NossosAnimais() {
  const searchParams = useSearchParams();
  const especieParam = searchParams?.get('especie') as string | undefined;

  const [animais, setAnimais] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);

  const [filtros, setFiltros] = useState({
    especie: especieParam?.toLowerCase() || 'todas',
    sexo: 'todos',
    porte: 'todos',
    disponibilidade: 'somente_disponiveis',
    busca: '',
  });

  // Atualiza filtros se a query `especie` mudar (navegação cliente)
  useEffect(() => {
    const esp = searchParams?.get('especie');
    if (esp) {
      setFiltros((prev) => ({ ...prev, especie: esp.toLowerCase() }));
    }
  }, [searchParams]);

  // 🔹 Normaliza campos de texto para minúsculo
  const normalizarAnimal = (animal: Pet): Pet => {
    const camposTexto = [
      'nome',
      'especie',
      'raca',
      'porte',
      'sexo',
      'descricao',
      'cidade',
      'estado',
    ];
    const novo: any = { ...animal };
    camposTexto.forEach((campo) => {
      if (novo[campo] && typeof novo[campo] === 'string') {
        novo[campo] = novo[campo].toLowerCase();
      }
    });
    return novo;
  };

  // 🔹 Carrega todos os animais e normaliza
  useEffect(() => {
    async function carregarAnimais() {
      try {
        setLoading(true);
        const res = await api.get('/animals');
        const normalizados = res.data.map((a: Pet) => normalizarAnimal(a));
        console.log('🐾 Animais carregados:', normalizados);
        console.log('🔍 Espécies encontradas:', [...new Set(normalizados.map((a: Pet) => a.especie))]);
        setAnimais(normalizados);
      } catch (err: any) {
        console.error(err);
        setError('Erro ao conectar com o backend');
      } finally {
        setLoading(false);
      }
    }
    carregarAnimais();
  }, []);

  // 🔹 Atualiza filtro
  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros((prev) => ({ ...prev, [campo]: valor.toLowerCase() }));
  };

  // 🔹 Aplica filtros locais
  const animaisFiltrados = animais.filter((a) => {
    // Filtro de espécie com suporte para variações
    let matchEspecie = false;
    if (filtros.especie === 'todas') {
      matchEspecie = true;
    } else if (filtros.especie === 'fazenda') {
      // Aceita "fazenda", "animal de fazenda", ou qualquer string contendo "fazenda"
      matchEspecie = a.especie?.includes('fazenda') || false;
    } else {
      matchEspecie = a.especie === filtros.especie;
    }

    const matchSexo = filtros.sexo === 'todos' || a.sexo === filtros.sexo;
    const matchPorte = filtros.porte === 'todos' || a.porte === filtros.porte;
    const matchDisponibilidade =
      filtros.disponibilidade === 'todos' ||
      (filtros.disponibilidade === 'somente_disponiveis' && a.disponivel);
    const matchBusca =
      filtros.busca.trim() === '' ||
      a.nome?.includes(filtros.busca.toLowerCase()) ||
      a.cidade?.includes(filtros.busca.toLowerCase()) ||
      a.descricao?.includes(filtros.busca.toLowerCase());

    return (
      matchEspecie &&
      matchSexo &&
      matchPorte &&
      matchDisponibilidade &&
      matchBusca
    );
  });

  // 🔹 Salva novo animal no backend
  const handleSalvarAnimal = async (novoAnimal: Pet) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Você precisa estar logado para cadastrar um animal.');
        return;
      }

      const payload = {
        nome: novoAnimal.nome,
        especie: novoAnimal.especie,
        raca: novoAnimal.raca,
        idade: novoAnimal.idade ? Number(novoAnimal.idade) : null,
        sexo: novoAnimal.sexo,
        porte: novoAnimal.porte,
        descricao: novoAnimal.descricao,
        foto: novoAnimal.foto || novoAnimal.imagem || '',
        vacinado: novoAnimal.vacinado ?? false,
        castrado: novoAnimal.castrado ?? false,
        disponivel: novoAnimal.disponivel ?? true,
      };

      const res = await api.post('/animals', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnimais((prev) => [...prev, normalizarAnimal(res.data)]);
      setModalAberto(false);
    } catch (err: any) {
      console.error('❌ Erro ao salvar animal:', err);
      alert('Erro ao salvar o animal. Verifique se você está logado.');
    }
  };

  // 🔹 Estado de carregamento
  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <p>carregando animais...</p>
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
          {/* 🔹 Título e botões */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Animais para adoção</h1>
            <div className={styles.buttonGroup}>
              <button
                className={styles.cadastrarBtn}
                onClick={() => setModalAberto(true)}
              >
                + cadastrar animal
              </button>
            </div>
          </div>

          {/* 🔹 Filtros */}
          <div className={styles.filtrosContainer}>
            <div className={styles.filtrosLinha1}>
              <select
                className={styles.select}
                value={filtros.especie}
                onChange={(e) => handleFiltroChange('especie', e.target.value)}
              >
                <option value="todas">todas as espécies</option>
                <option value="cachorro">cachorro</option>
                <option value="gato">gato</option>
                <option value="passaro">pássaro</option>
                <option value="coelho">coelho</option>
                <option value="hamster">hamster</option>
                <option value="fazenda">animais de fazenda</option>
              </select>

              <select
                className={styles.select}
                value={filtros.sexo}
                onChange={(e) => handleFiltroChange('sexo', e.target.value)}
              >
                <option value="todos">todos os sexos</option>
                <option value="macho">macho</option>
                <option value="femea">fêmea</option>
              </select>

              <select
                className={styles.select}
                value={filtros.porte}
                onChange={(e) => handleFiltroChange('porte', e.target.value)}
              >
                <option value="todos">todos os portes</option>
                <option value="pequeno">pequeno</option>
                <option value="medio">médio</option>
                <option value="grande">grande</option>
              </select>

              <select
                className={styles.select}
                value={filtros.disponibilidade}
                onChange={(e) =>
                  handleFiltroChange('disponibilidade', e.target.value)
                }
              >
                <option value="somente_disponiveis">somente disponíveis</option>
                <option value="todos">todos</option>
              </select>
            </div>

            <div className={styles.filtrosLinha2}>
              <input
                type="text"
                className={styles.inputBusca}
                placeholder="buscar por nome ou cidade..."
                value={filtros.busca}
                onChange={(e) => handleFiltroChange('busca', e.target.value)}
              />
            </div>
          </div>

          {/* 🔹 Contador */}
          <div className={styles.contador}>
            <div className={styles.contadorTexto}>
              {animaisFiltrados.length === 0
                ? 'nenhum animal encontrado'
                : `${animaisFiltrados.length} ${
                    animaisFiltrados.length === 1
                      ? 'animal encontrado'
                      : 'animais encontrados'
                  }`}
            </div>
          </div>

          {/* 🔹 Grid de Animais */}
          {animaisFiltrados.length > 0 ? (
            <div className={styles.animaisGrid}>
              {animaisFiltrados.map((animal, index) => (
                <AnimalCard key={animal.id} animal={animal} priority={index === 0} />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🐾</div>
              <h3>nenhum animal encontrado</h3>
              <p>não há animais com os filtros aplicados.</p>
              <button
                className={styles.cadastrarBtn}
                onClick={() => setModalAberto(true)}
              >
                cadastrar animal
              </button>
            </div>
          )}
        </div>
      </main>
      <Footer />

      {/* 🔹 Modal de Cadastro */}
      <CadastrarAnimalModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={handleSalvarAnimal}
      />
    </>
  );
}
