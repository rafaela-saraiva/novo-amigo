/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import AnimalCard from '@/components/AnimalCard';
import CadastrarAnimalModal from '@/components/CadastrarAnimalModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useAuth } from '@/hooks/useAuth';
import { Pet } from '@/Models/Pet';
import api from '@/services/api';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function NossosAnimais() {
  const searchParams = useSearchParams();
  const especieParam = searchParams?.get('especie') as string | undefined;
  const { user } = useAuth();

  const podeAdicionarAnimal =
    user?.groups?.includes('Administrador') ||
    user?.groups?.includes('ONG') ||
    user?.tipo === 'shelter';
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
    idade: 'todas',
  });

  const [outrosAberto, setOutrosAberto] = useState(false);

  const OUTROS_ESPECIES = [
    { label: 'Animais de Fazenda', value: 'fazenda' },
    { label: 'Animais Exóticos', value: 'exotico' },
  ];

  const isOutrosAtivo = OUTROS_ESPECIES.some((e) => e.value === filtros.especie);

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
      matchEspecie = a.especie?.includes('fazenda') || false;
    } else if (filtros.especie === 'exotico') {
      matchEspecie = a.especie?.includes('exotico') || a.especie?.includes('exótico') || false;
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

      const idadeNumero = Number(novoAnimal.idade);
      if (!Number.isFinite(idadeNumero) || idadeNumero <= 0) {
        alert('Informe uma idade válida (apenas números).');
        return;
      }

      const fotos =
        novoAnimal.imagens && novoAnimal.imagens.length > 0
          ? novoAnimal.imagens
          : novoAnimal.imagem && novoAnimal.imagem !== '/placeholder.svg'
            ? [novoAnimal.imagem]
            : [];

      if (fotos.length === 0) {
        alert('Adicione pelo menos 1 foto do animal para cadastrar.');
        return;
      }

      const payload = {
        nome: novoAnimal.nome,
        especie: novoAnimal.especie,
        raca: novoAnimal.raca || null,
        idade: idadeNumero,
        sexo: novoAnimal.sexo,
        porte: novoAnimal.porte,
        descricao: novoAnimal.descricao?.trim() ? novoAnimal.descricao.trim() : null,
        foto: fotos,
        vacinado: novoAnimal.vacinado ?? false,
        castrado: novoAnimal.castrado ?? false,
        disponivel: novoAnimal.disponivel ?? true,
        tags: novoAnimal.tags ?? [],
        comoAdotar: novoAnimal.comoAdotar?.trim() ? novoAnimal.comoAdotar.trim() : null,
      };

      const res = await api.post('/animals', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setAnimais((prev) => [...prev, normalizarAnimal(res.data)]);
      setModalAberto(false);
    } catch (err: any) {
      console.error('❌ Erro ao salvar animal:', err?.response?.data || err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.response?.data ||
        'Erro ao salvar o animal.';
      alert(String(msg));
    }
  };

  // 🔹 Estado de carregamento
  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main} style={{ paddingTop: '128px' }}>
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
        <main className={styles.main} style={{ paddingTop: '128px' }}>
          <div className={styles.container}>
            <p>❌ {error}</p>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  // Limpar todos os filtros
  const limparFiltros = () => {
    setFiltros({
      especie: 'todas',
      sexo: 'todos',
      porte: 'todos',
      disponibilidade: 'somente_disponiveis',
      busca: '',
      idade: 'todas',
    });
    setOutrosAberto(false);
  };

  // 🔹 Layout principal
  return (
    <>
      <Header />
      <main className={styles.main} style={{ paddingTop: '128px' }}>
        <div className={styles.container}>
          {/* 🔹 Título */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Animais para adoção</h1>
          </div>

          {/* 🔹 Layout: sidebar + grid */}
          <div className={styles.pageLayout}>

            {/* Sidebar de Filtros */}
            <aside className={styles.sidebar}>
              <div className={styles.sidebarTitle}>Filtros</div>
              <div className={styles.sidebarSubtitle}>Personalize sua busca</div>

              {/* Espécie */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>
                  <span className="material-symbols-outlined">category</span>
                  Espécie
                </div>
                <div className={styles.pillGroup}>
                  {[
                    { label: 'Todos', value: 'todas' },
                    { label: 'Cães', value: 'cachorro' },
                    { label: 'Gatos', value: 'gato' },
                    { label: 'Pássaros', value: 'passaro' },
                    { label: 'Coelhos', value: 'coelho' },
                    { label: 'Hamsters', value: 'hamster' },
                  ].map((op) => (
                    <button
                      key={op.value}
                      className={`${styles.pill} ${filtros.especie === op.value ? styles.pillActive : ''}`}
                      onClick={() => {
                        handleFiltroChange('especie', op.value);
                        setOutrosAberto(false);
                      }}
                    >
                      {op.label}
                    </button>
                  ))}

                  {/* Botão Outros com expansão */}
                  <button
                    className={`${styles.pill} ${isOutrosAtivo || outrosAberto ? styles.pillActive : ''}`}
                    onClick={() => {
                      const abrindo = !outrosAberto;
                      setOutrosAberto(abrindo);
                      // Se fechar sem selecionar subopção, volta para 'todas'
                      if (!abrindo && isOutrosAtivo) {
                        handleFiltroChange('especie', 'todas');
                      }
                    }}
                  >
                    Outros
                    <span
                      className="material-symbols-outlined"
                      style={{ fontSize: 14, verticalAlign: 'middle', marginLeft: 2 }}
                    >
                      {outrosAberto ? 'expand_less' : 'expand_more'}
                    </span>
                  </button>
                </div>

                {/* Sub-opções de Outros */}
                {outrosAberto && (
                  <div className={styles.subPillGroup}>
                    {OUTROS_ESPECIES.map((op) => (
                      <button
                        key={op.value}
                        className={`${styles.subPill} ${filtros.especie === op.value ? styles.subPillActive : ''}`}
                        onClick={() => handleFiltroChange('especie', op.value)}
                      >
                        {op.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Porte */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>
                  <span className="material-symbols-outlined">straighten</span>
                  Porte
                </div>
                <div className={styles.checkboxGroup}>
                  {[
                    { label: 'Pequeno', value: 'pequeno' },
                    { label: 'Médio', value: 'medio' },
                    { label: 'Grande', value: 'grande' },
                  ].map((op) => (
                    <label key={op.value} className={styles.checkboxLabel}>
                      <input
                        type="radio"
                        name="porte"
                        className={styles.radioInput}
                        checked={filtros.porte === op.value}
                        onChange={() => handleFiltroChange('porte', op.value)}
                      />
                      <span>{op.label}</span>
                    </label>
                  ))}
                  <label className={styles.checkboxLabel}>
                    <input
                      type="radio"
                      name="porte"
                      className={styles.radioInput}
                      checked={filtros.porte === 'todos'}
                      onChange={() => handleFiltroChange('porte', 'todos')}
                    />
                    <span>Qualquer porte</span>
                  </label>
                </div>
              </div>

              {/* Idade */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>
                  <span className="material-symbols-outlined">calendar_today</span>
                  Idade
                </div>
                <select
                  className={styles.filterSelect}
                  value={filtros.idade}
                  onChange={(e) => handleFiltroChange('idade', e.target.value)}
                >
                  <option value="todas">Qualquer idade</option>
                  <option value="filhote">Filhote (até 1 ano)</option>
                  <option value="jovem">Jovem (1–3 anos)</option>
                  <option value="adulto">Adulto (3–7 anos)</option>
                  <option value="senior">Sênior (+7 anos)</option>
                </select>
              </div>

              {/* Gênero */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>
                  <span className="material-symbols-outlined">wc</span>
                  Gênero
                </div>
                <div className={styles.genderGroup}>
                  {[
                    { label: 'Macho', value: 'macho' },
                    { label: 'Fêmea', value: 'femea' },
                  ].map((op) => (
                    <button
                      key={op.value}
                      className={`${styles.genderBtn} ${filtros.sexo === op.value ? styles.genderBtnActive : ''}`}
                      onClick={() => handleFiltroChange('sexo', op.value === filtros.sexo ? 'todos' : op.value)}
                    >
                      {op.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Busca por nome */}
              <div className={styles.filterGroup}>
                <div className={styles.filterLabel}>
                  <span className="material-symbols-outlined">search</span>
                  Buscar
                </div>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="nome ou cidade..."
                  value={filtros.busca}
                  onChange={(e) => handleFiltroChange('busca', e.target.value)}
                />
              </div>

              {podeAdicionarAnimal && (
                <button
                  className={styles.cadastrarBtn}
                  style={{ width: '100%', marginBottom: 8 }}
                  onClick={() => setModalAberto(true)}
                >
                  + cadastrar animal
                </button>
              )}

              <button className={styles.limparBtn} onClick={limparFiltros}>
                Limpar Filtros
              </button>
            </aside>

            {/* Conteúdo principal */}
            <div className={styles.mainContent}>
              {/* Contador */}
              <div className={styles.contentHeader}>
                <h2 className={styles.contador}>
                  {animaisFiltrados.length === 0
                    ? 'Nenhum animal encontrado'
                    : `${animaisFiltrados.length} ${animaisFiltrados.length === 1 ? 'animal disponível' : 'animais disponíveis'}`}
                </h2>
              </div>

              {/* Grid de Animais */}
              {animaisFiltrados.length > 0 ? (
                <div className={styles.animaisGrid}>
                  {animaisFiltrados.map((animal, index) => (
                    <AnimalCard key={animal.id} animal={animal} priority={index === 0} />
                  ))}
                </div>
              ) : (
                <div className={styles.emptyState}>
                  <div className={styles.emptyIcon}>🐾</div>
                  <h3>Nenhum animal encontrado</h3>
                  <p>Tente ajustar os filtros para ver mais resultados.</p>
                  {podeAdicionarAnimal && (
                    <button
                      className={styles.cadastrarBtn}
                      onClick={() => setModalAberto(true)}
                    >
                      Cadastrar animal
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>
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
