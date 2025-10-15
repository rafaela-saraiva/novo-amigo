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
    especie: "Todas as espécies",
    sexo: "Todos os sexos",
    porte: "Todos os portes",
    estado: "Todos os Estados",
    cidade: "Todas as Cidades",
    disponibilidade: "Somente disponíveis",
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
    
    const matchEspecie = filtros.especie === "Todas as espécies" || 
      animal.especie === filtros.especie.toLowerCase();
    
    const matchSexo = filtros.sexo === "Todos os sexos" || 
      animal.sexo === filtros.sexo.toLowerCase();
    
    const matchPorte = filtros.porte === "Todos os portes" || 
      animal.porte === filtros.porte.toLowerCase();
    
    const matchCidade = filtros.cidade === "Todas as Cidades" || 
      animal.cidade.toLowerCase().includes(filtros.cidade.toLowerCase());
    
    const matchDisponibilidade = filtros.disponibilidade === "Todos" || 
      (filtros.disponibilidade === "Somente disponíveis" && animal.disponivel);

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
                <option>Todas as espécies</option>
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Pássaro</option>
                <option>Coelho</option>
                <option>Hamster</option>
                <option>Fazenda</option>
              </select>

              <select
                className={styles.select}
                value={filtros.sexo}
                onChange={(e) => handleFiltroChange('sexo', e.target.value)}
              >
                <option>Todos os sexos</option>
                <option>Macho</option>
                <option>Fêmea</option>
              </select>

              <select
                className={styles.select}
                value={filtros.porte}
                onChange={(e) => handleFiltroChange('porte', e.target.value)}
              >
                <option>Todos os portes</option>
                <option>Pequeno</option>
                <option>Médio</option>
                <option>Grande</option>
              </select>

              <select
                className={styles.select}
                value={filtros.disponibilidade}
                onChange={(e) => handleFiltroChange('disponibilidade', e.target.value)}
              >
                <option>Somente disponíveis</option>
                <option>Todos</option>
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