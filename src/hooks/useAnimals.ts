import { Animal } from '@/Models/Pet';
import { useEffect, useState } from 'react';

const STORAGE_KEY = 'animais-adocao';

interface Filtros {
  especie: string;
  sexo: string;
  porte: string;
  estado: string;
  cidade: string;
  disponibilidade: string;
  busca: string;
}

export function useAnimals() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar animais do localStorage ao iniciar
  useEffect(() => {
    try {
      const animaisSalvos = localStorage.getItem(STORAGE_KEY);
      if (animaisSalvos) {
        setAnimais(JSON.parse(animaisSalvos));
      }
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Salvar animais no localStorage sempre que mudarem
  const salvarNoStorage = (novosAnimais: Animal[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(novosAnimais));
      return true;
    } catch (error) {
      console.error('Erro ao salvar animais:', error);
      return false;
    }
  };

  // Adicionar novo animal
  const adicionarAnimal = (novoAnimal: Animal): boolean => {
    try {
      const animalComId = {
        ...novoAnimal,
        id: Date.now(), // Gera um ID único baseado no timestamp
      };
      const novosAnimais = [...animais, animalComId];
      setAnimais(novosAnimais);
      return salvarNoStorage(novosAnimais);
    } catch (error) {
      console.error('Erro ao adicionar animal:', error);
      return false;
    }
  };

  // Remover animal
  const removerAnimal = (id: number): boolean => {
    try {
      const novosAnimais = animais.filter(animal => animal.id !== id);
      setAnimais(novosAnimais);
      return salvarNoStorage(novosAnimais);
    } catch (error) {
      console.error('Erro ao remover animal:', error);
      return false;
    }
  };

  // Atualizar animal
  const atualizarAnimal = (id: number, dadosAtualizados: Partial<Animal>): boolean => {
    try {
      const novosAnimais = animais.map(animal =>
        animal.id === id ? { ...animal, ...dadosAtualizados } : animal
      );
      setAnimais(novosAnimais);
      return salvarNoStorage(novosAnimais);
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      return false;
    }
  };

  // Limpar todos os animais
  const limparAnimais = (): boolean => {
    try {
      setAnimais([]);
      localStorage.removeItem(STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Erro ao limpar animais:', error);
      return false;
    }
  };

  // Filtrar animais
  const filtrarAnimais = (filtros: Filtros): Animal[] => {
    return animais.filter(animal => {
      // Filtro de espécie
      if (filtros.especie !== 'todas' && animal.especie !== filtros.especie) {
        return false;
      }

      // Filtro de sexo
      if (filtros.sexo !== 'todos' && animal.sexo !== filtros.sexo) {
        return false;
      }

      // Filtro de porte
      if (filtros.porte !== 'todos' && animal.porte !== filtros.porte) {
        return false;
      }

      // Filtro de disponibilidade
      if (filtros.disponibilidade === 'somente_disponiveis' && !animal.disponivel) {
        return false;
      }

      // Filtro de busca por nome ou cidade
      if (filtros.busca) {
        const termoBusca = filtros.busca.toLowerCase();
        const nomeMatch = animal.nome.toLowerCase().includes(termoBusca);
        const cidadeMatch = animal.cidade.toLowerCase().includes(termoBusca);
        const racaMatch = animal.raca?.toLowerCase().includes(termoBusca);
        
        if (!nomeMatch && !cidadeMatch && !racaMatch) {
          return false;
        }
      }

      return true;
    });
  };

  return {
    animais,
    loading,
    adicionarAnimal,
    removerAnimal,
    atualizarAnimal,
    limparAnimais,
    filtrarAnimais,
  };
}
