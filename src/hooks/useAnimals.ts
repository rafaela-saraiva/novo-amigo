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
      
      // Se não há animais salvos, adicionar alguns exemplos
      if (animaisSalvos.length === 0) {
        const animaisExemplo: Animal[] = [
          {
            id: 1,
            nome: "Buddy",
            idade: "3 anos",
            cidade: "São Paulo",
            especie: "cachorro",
            raca: "Labrador",
            sexo: "macho",
            porte: "medio",
            descricao: "Cachorro muito carinhoso e brincalhão. Adora crianças e é super obediente. Ideal para famílias ativas.",
            vacinado: true,
            castrado: true,
            foto: "https://i.postimg.cc/vxx9SyHf/conheca-as-racas-de-cachorros-mais-inteligentes-do-mundo-04-0.jpg",
            disponivel: true
          },
          {
            id: 2,
            nome: "Luna",
            idade: "2 anos",
            cidade: "Rio de Janeiro",
            especie: "gato",
            raca: "Siamês",
            sexo: "femea",
            porte: "pequeno",
            descricao: "Gatinha dócil e carinhosa. Gosta de colo e é muito tranquila. Perfeita para apartamentos.",
            vacinado: true,
            castrado: false,
            foto: "https://i.postimg.cc/GhJ0XyWw/images-1.jpg",
            disponivel: true
          },
          {
            id: 3,
            nome: "Thor",
            idade: "4 anos",
            cidade: "Belo Horizonte",
            especie: "cachorro",
            raca: "SRD",
            sexo: "macho",
            porte: "grande",
            descricao: "Cachorro protetor e leal. Excelente guarda da casa. Precisa de espaço para correr e brincar.",
            vacinado: true,
            castrado: true,
            foto: "https://i.postimg.cc/Q9y1bCsc/images.jpg",
            disponivel: true
          }
        ];
        
        // Salvar os animais de exemplo
        storageUtils.saveAnimals(animaisExemplo);
        setAnimais(animaisExemplo);
        console.log('Animais de exemplo adicionados:', animaisExemplo.length);
      } else {
        setAnimais(animaisSalvos);
        console.log('Animais carregados:', animaisSalvos.length);
      }
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