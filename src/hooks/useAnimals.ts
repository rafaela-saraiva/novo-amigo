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
          },
          {
            id: 4,
            nome: "Mia",
            idade: "1 ano",
            cidade: "Curitiba",
            especie: "gato",
            raca: "Persa",
            sexo: "femea",
            porte: "pequeno",
            descricao: "Gatinha elegante e calma. Adora brincar com bolinhas e dormir no sol. Muito carinhosa com seus donos.",
            vacinado: true,
            castrado: true,
            foto: "https://i.postimg.cc/nrS9zJbb/3221ce4922d4270862a961e4f1070578.jpg",
            disponivel: true
          },
          {
            id: 5,
            nome: "Max",
            idade: "5 anos",
            cidade: "Porto Alegre",
            especie: "cachorro",
            raca: "Golden Retriever",
            sexo: "macho",
            porte: "grande",
            descricao: "Cachorro super amigável e inteligente. Adora nadar e buscar bolinhas. Perfeito para famílias com crianças.",
            vacinado: true,
            castrado: true,
            foto: "https://i.postimg.cc/Lsv9RVMZ/Whats-App-Image-2025-10-08-at-14-55-13.jpg",
            disponivel: true
          },
          {
            id: 6,
            nome: "Mel",
            idade: "6 meses",
            cidade: "Salvador",
            especie: "cachorro",
            raca: "Poodle",
            sexo: "femea",
            porte: "pequeno",
            descricao: "Cachorrinha fofa e energética. Muito esperta e fácil de treinar. Ideal para apartamentos.",
            vacinado: true,
            castrado: false,
            foto: "https://i.postimg.cc/Jhg1Gzt2/e3c4c29c96682867a1b5ea9ee98bcddf.jpg",
            disponivel: true
          },
          {
            id: 7,
            nome: "Bob",
            idade: "8 meses",
            cidade: "Brasília",
            especie: "coelho",
            raca: "Mini Lop",
            sexo: "macho",
            porte: "pequeno",
            descricao: "Coelhinho dócil e brincalhão. Adora cenouras e folhas verdes. Muito carinhoso e fácil de cuidar.",
            vacinado: true,
            castrado: false,
            foto: "https://i.postimg.cc/76vpFG5P/images-3.jpg",
            disponivel: true
          },
          {
            id: 8,
            nome: "Piu",
            idade: "1 ano e meio",
            cidade: "Fortaleza",
            especie: "passaro",
            raca: "Calopsita",
            sexo: "macho",
            porte: "pequeno",
            descricao: "Calopsita alegre e cantora. Adora assobiar e interagir com pessoas. Muito sociável e divertido.",
            vacinado: false,
            castrado: false,
            foto: "https://i.postimg.cc/9Q5Zqcwf/images.jpg",
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