'use client'
import AnimalCard from '@/components/AnimalCard';
import CadastrarAnimalModal from '@/components/CadastrarAnimalModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Animal } from '@/Models/Pet';
import { useState } from 'react';
import { useAnimals } from '@/hooks/useAnimals';
import styles from './styles.module.css';

export default function NossosAnimais() {
  const { 
    animais, 
    loading, 
    adicionarAnimal, 
    limparAnimais, 
    filtrarAnimais 
  } = useAnimals();

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

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSalvarAnimal = (novoAnimal: Animal) => {
    const sucesso = adicionarAnimal(novoAnimal);
    if (sucesso) {
      console.log('Animal cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar animal. Tente novamente.');
    }
  };



  const handleLimparDados = () => {
    if (window.confirm('Tem certeza que deseja remover TODOS os animais cadastrados? Esta ação não pode ser desfeita.')) {
      const sucesso = limparAnimais();
      if (sucesso) {
        alert('Todos os dados foram removidos.');
      } else {
        alert('Erro ao limpar dados. Tente novamente.');
      }
    }
  };

  const animaisFiltrados = filtrarAnimais(filtros);

  if (loading) {
    return (
      <>
        <Header />
        <main className={styles.main}>
          <div className={styles.container}>
            <div style={{ textAlign: 'center', padding: '60px 20px' }}>
              <div style={{ fontSize: '18px', color: '#6b7280' }}>
                Carregando animais...
              </div>
            </div>
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
          {/* Breadcrumb */}
          <div className={styles.breadcrumb}>
          
          </div>

          {/* Título e Botão de Cadastro */}
          <div className={styles.titleSection}>
            <h1 className={styles.title}>Nossos Animais para Adoção</h1>
            <div className={styles.buttonGroup}>
              <button 
                className={styles.cadastrarBtn} 
                onClick={() => setModalAberto(true)}
              >
                + Cadastrar Animal
              </button>
              {animais.length > 0 && (
                <button 
                  className={styles.limparBtn} 
                  onClick={handleLimparDados}
                  title="Remover todos os animais cadastrados"
                >
                  🗑️ Limpar Dados
                </button>
              )}
            </div>
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
            <div className={styles.contadorTexto}>
              {animaisFiltrados.length === 0 
                ? 'Nenhum animal encontrado' 
                : `${animaisFiltrados.length} ${animaisFiltrados.length === 1 ? 'animal encontrado' : 'animais encontrados'}`
              }
            </div>
            {animais.length > 0 && (
              <div className={styles.statusStorage}>
                💾 {animais.length} animais salvos localmente
              </div>
            )}
          </div>

          {/* Grid de Animais */}
          {animaisFiltrados.length > 0 ? (
            <div className={styles.animaisGrid}>
              {animaisFiltrados.map((animal: Animal) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
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