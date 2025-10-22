'use client'
import AnimalCard from '@/components/AnimalCard';
import CadastrarAnimalModal from '@/components/CadastrarAnimalModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Animal } from '@/Models/Pet';
import { useEffect, useState } from 'react';
import styles from './styles.module.css';

export default function NossosAnimais() {
  const [filtros, setFiltros] = useState({
    especie: "todas",
    sexo: "todos",
    porte: "todos",
    estado: "todos",
    cidade: "todas",
    disponibilidade: "somente_disponiveis",
    busca: ""
  });

  const [modalAberto, setModalAberto] = useState(false);
  const [animais, setAnimais] = useState<Animal[]>([]);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSalvarAnimal = (novoAnimal: Animal) => {
    setAnimais(prev => {
      const next = [...prev, novoAnimal];
      // salvar no cookie para persistência simples (teste)
      try {
        const serialized = encodeURIComponent(JSON.stringify(next));
        const expires = new Date();
        expires.setDate(expires.getDate() + 7); // 7 dias
        document.cookie = `novo_amigo_animais=${serialized}; path=/; expires=${expires.toUTCString()}; SameSite=Lax`;
      } catch (err) {
        console.error('Erro ao salvar cookie de animais', err);
      }
      return next;
    });
  };

  // carregar animais do cookie no carregamento da página
  useEffect(() => {
    try {
      const match = document.cookie.split('; ').find((c) => c.startsWith('novo_amigo_animais='));
      if (match) {
        const raw = match.split('=')[1];
        const parsed = JSON.parse(decodeURIComponent(raw)) as Animal[];
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAnimais(parsed);
        }
      }
    } catch (err) {
      console.error('Erro ao carregar cookie de animais', err);
    }
  }, []);

  const animaisFiltrados = animais.filter(animal => {
    const matchBusca = !filtros.busca || 
      animal.nome.toLowerCase().includes(filtros.busca.toLowerCase()) ||
      animal.cidade.toLowerCase().includes(filtros.busca.toLowerCase());
    
    const matchEspecie = filtros.especie === "todas" ||
      animal.especie === filtros.especie;

    const matchSexo = filtros.sexo === "todos" ||
      animal.sexo === filtros.sexo;

    const matchPorte = filtros.porte === "todos" ||
      animal.porte === filtros.porte;

    const matchCidade = filtros.cidade === "todas" ||
      animal.cidade.toLowerCase().includes(filtros.cidade.toLowerCase());

    const matchDisponibilidade = filtros.disponibilidade === "todos" ||
      (filtros.disponibilidade === "somente_disponiveis" && animal.disponivel);

    return matchBusca && matchEspecie && matchSexo && matchPorte && matchCidade && matchDisponibilidade;
  });

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
            <span>Início</span> &gt; <span>Nossos Animais</span>
          </div>

          {/* Título e Botão de Cadastro */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Nossos Animais para Adoção</h1>
            <button 
              className={styles.cadastrarBtn} 
              onClick={() => setModalAberto(true)}
            >
              + Cadastrar Animal
            </button>
          </div>

          {/* Filtros */}
          <div className={styles.filtrosContainer}>
            <div className={styles.filtrosLinha1}>
              <select
                className={styles.select}
                value={filtros.especie}
                onChange={(e) => handleFiltroChange('especie', e.target.value)}
              >
                <option value="todas">Todas as espécies</option>
                <option value="cachorro">Cachorro</option>
                <option value="gato">Gato</option>
                <option value="passaro">Pássaro</option>
                <option value="coelho">Coelho</option>
                <option value="hamster">Hamster</option>
                <option value="fazenda">Fazenda</option>
              </select>

              <select
                className={styles.select}
                value={filtros.sexo}
                onChange={(e) => handleFiltroChange('sexo', e.target.value)}
              >
                <option value="todos">Todos os sexos</option>
                <option value="macho">Macho</option>
                <option value="femea">Fêmea</option>
              </select>

              <select
                className={styles.select}
                value={filtros.porte}
                onChange={(e) => handleFiltroChange('porte', e.target.value)}
              >
                <option value="todos">Todos os portes</option>
                <option value="pequeno">Pequeno</option>
                <option value="medio">Médio</option>
                <option value="grande">Grande</option>
              </select>

              <select
                className={styles.select}
                value={filtros.disponibilidade}
                onChange={(e) => handleFiltroChange('disponibilidade', e.target.value)}
              >
                <option value="somente_disponiveis">Somente disponíveis</option>
                <option value="todos">Todos</option>
              </select>
            </div>

            <div className={styles.filtrosLinha2}>
              <input
                type="text"
                className={styles.inputBusca}
                placeholder="Buscar por nome ou cidade..."
                value={filtros.busca}
                onChange={(e) => handleFiltroChange('busca', e.target.value)}
              />
            </div>
          </div>

          {/* Contador de animais */}
          <div className={styles.contador}>
            {animaisFiltrados.length === 0 
              ? 'Nenhum animal encontrado' 
              : `${animaisFiltrados.length} ${animaisFiltrados.length === 1 ? 'animal encontrado' : 'animais encontrados'}`
            }
          </div>

          {/* Grid de Animais */}
          {animaisFiltrados.length > 0 ? (
            <div className={styles.animaisGrid}>
              {animaisFiltrados.map((animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                  onAdotar={() => {
                    alert(`Interesse em adotar ${animal.nome}! Em breve implementaremos o sistema de adoção.`);
                  }}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🐾</div>
              <h3>Nenhum animal cadastrado ainda</h3>
              <p>Seja o primeiro a cadastrar um animal para adoção!</p>
              <button 
                className={styles.cadastrarBtn} 
                onClick={() => setModalAberto(true)}
              >
                Cadastrar Primeiro Animal
              </button>
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Modal de Cadastro */}
      <CadastrarAnimalModal
        isOpen={modalAberto}
        onClose={() => setModalAberto(false)}
        onSave={handleSalvarAnimal}
      />
    </>
  );
}