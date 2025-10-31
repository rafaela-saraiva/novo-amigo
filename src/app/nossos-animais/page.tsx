'use client'
import AnimalCard from '@/components/AnimalCard';
import CadastrarAnimalModal from '@/components/CadastrarAnimalModal';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { Pet } from '@/Models/Pet';
import { useState } from 'react';
import { useAnimals } from '@/hooks/useAnimals';
import ConnectionStatus from '@/components/ConnectionStatus';
import styles from './styles.module.css';

export default function NossosAnimais() {
  const { 
    animais, 
    loading, 
    error,
    connectionStatus,
    adicionarAnimal, 
    limparAnimais, 
    filtrarAnimais,
    recarregarAnimais 
  } = useAnimals();

  const [filtros, setFiltros] = useState({
    especie: "todas",
    sexo: "todos",
    porte: "todos",
    disponibilidade: "somente_disponiveis",
    busca: ""
  });

  const [modalAberto, setModalAberto] = useState(false);

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  const handleSalvarAnimal = async (novoAnimal: Pet) => {
    const sucesso = await adicionarAnimal(novoAnimal);
    if (sucesso) {
      console.log('Animal cadastrado com sucesso!');
    } else {
      alert('Erro ao cadastrar animal. Tente novamente.');
    }
  };

  const handleLimparDados = async () => {
    if (window.confirm('Tem certeza que deseja remover TODOS os animais cadastrados? Esta ação não pode ser desfeita.')) {
      const sucesso = await limparAnimais();
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
          {/* Título e Botão de Cadastro */}
          <div className={styles.titleSection}>
            <div>
              <h1 className={styles.title}>Nossos Animais para Adoção</h1>
              {connectionStatus === 'offline' && (
                <div className={styles.offlineWarning}>
                  ⚠️ Modo offline - Trabalhando com dados locais
                </div>
              )}
              {error && (
                <div className={styles.errorMessage}>
                  ❌ {error}
                  <button 
                    onClick={recarregarAnimais}
                    className={styles.retryButton}
                  >
                    Tentar Novamente
                  </button>
                </div>
              )}
            </div>
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
                placeholder="Buscar por nome, raça ou endereço..."
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
                {connectionStatus === 'online' ? '🌐' : '💾'} 
                {animais.length} animais {connectionStatus === 'online' ? 'sincronizados' : 'salvos localmente'}
              </div>
            )}
          </div>

          {/* Grid de Animais */}
          {animaisFiltrados.length > 0 ? (
            <div className={styles.animaisGrid}>
              {animaisFiltrados.map((animal: Pet) => (
                <AnimalCard
                  key={animal.id}
                  animal={animal}
                />
              ))}
            </div>
          ) : (
            <div className={styles.emptyState}>
              <div className={styles.emptyIcon}>🐾</div>
              <h3>Nenhum animal encontrado</h3>
              <p>
                {animais.length === 0 
                  ? 'Seja o primeiro a cadastrar um animal para adoção!' 
                  : 'Tente ajustar os filtros para encontrar mais animais.'
                }
              </p>
              <button 
                className={styles.cadastrarBtn} 
                onClick={() => setModalAberto(true)}
              >
                {animais.length === 0 ? 'Cadastrar Primeiro Animal' : 'Cadastrar Novo Animal'}
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

      {/* Status da Conexão */}
      <ConnectionStatus />
    </>
  );
}