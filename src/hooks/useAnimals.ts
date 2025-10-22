'use client'
import { Animal } from '@/Models/Pet';
import { storageUtils } from '@/utils/storage';
import { useEffect, useState } from 'react';

export function useAnimals() {
  const [animais, setAnimais] = useState<Animal[]>([]);
  const [loading, setLoading] = useState(true);

  // Carregar animais na inicialização
  useEffect(() => {
    try {
      const animaisSalvos = storageUtils.loadAnimals();
      setAnimais(animaisSalvos);
      console.log('Animais carregados:', animaisSalvos.length);
    } catch (error) {
      console.error('Erro ao carregar animais:', error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Adicionar um novo animal
  const adicionarAnimal = (novoAnimal: Animal) => {
    try {
      const updatedAnimals = storageUtils.addAnimal(novoAnimal);
      setAnimais(updatedAnimals);
      return true;
    } catch (error) {
      console.error('Erro ao adicionar animal:', error);
      return false;
    }
  };

  // Remover um animal
  const removerAnimal = (animalId: number) => {
    try {
      const updatedAnimals = storageUtils.removeAnimal(animalId);
      setAnimais(updatedAnimals);
      return true;
    } catch (error) {
      console.error('Erro ao remover animal:', error);
      return false;
    }
  };

  // Atualizar um animal
  const atualizarAnimal = (animalAtualizado: Animal) => {
    try {
      const updatedAnimals = storageUtils.updateAnimal(animalAtualizado);
      setAnimais(updatedAnimals);
      return true;
    } catch (error) {
      console.error('Erro ao atualizar animal:', error);
      return false;
    }
  };

  // Limpar todos os animais
  const limparAnimais = () => {
    try {
      storageUtils.clearAnimals();
      setAnimais([]);
      return true;
    } catch (error) {
      console.error('Erro ao limpar animais:', error);
      return false;
    }
  };

  // Marcar animal como adotado
  const marcarComoAdotado = (animalId: number) => {
    const animal = animais.find(a => a.id === animalId);
    if (animal) {
      return atualizarAnimal({ ...animal, disponivel: false });
    }
    return false;
  };

  // Filtrar animais
  const filtrarAnimais = (filtros: {
    especie: string;
    sexo: string;
    porte: string;
    cidade: string;
    disponibilidade: string;
    busca: string;
  }) => {
    return animais.filter(animal => {
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
  };

  return {
    animais,
    loading,
    adicionarAnimal,
    removerAnimal,
    atualizarAnimal,
    limparAnimais,
    marcarComoAdotado,
    filtrarAnimais,
  };
}