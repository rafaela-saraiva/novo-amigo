// src/hooks/useAnimals.ts
import { useEffect, useState } from 'react';
import { Pet } from '@/Models/Pet';
import { animalService } from '@/services/animalService';

export function useAnimals() {
  const [animais, setAnimais] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [connectionStatus, setConnectionStatus] = useState<'online' | 'offline' | 'checking'>('checking');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    carregarAnimais();
  }, []);

  const carregarAnimais = async () => {
    try {
      setLoading(true);
      setError(null);
      const dadosAPI = await animalService.getAll();
      setAnimais(dadosAPI);
      setConnectionStatus('online');
    } catch (error: any) {
      // Verifica se é erro de conexão
      if (animalService.isConnectionError(error)) {
        setConnectionStatus('offline');
        console.warn('🔌 Modo offline - usando localStorage como fallback');
      } else {
        setConnectionStatus('online');
      }
      
      // Fallback para localStorage
      const dadosSalvos = localStorage.getItem('animais');
      if (dadosSalvos) {
        try {
          setAnimais(JSON.parse(dadosSalvos));
        } catch (parseError) {
          console.error('Erro ao parsear dados do localStorage:', parseError);
          setError('Erro ao carregar animais');
        }
      } else {
        setAnimais([]);
      }
    } finally {
      setLoading(false);
    }
  };

  const adicionarAnimal = async (novo: Pet): Promise<boolean> => {
    try {
      setError(null);
      // Tenta salvar na API primeiro
      await animalService.create(novo);
      setConnectionStatus('online');
    } catch (error: any) {
      if (animalService.isConnectionError(error)) {
        setConnectionStatus('offline');
        console.warn('🔌 Backend offline - salvando apenas no localStorage');
      } else {
        setError('Erro ao conectar com o servidor');
        return false;
      }
    }
    
    // Salva no localStorage de qualquer forma
    try {
      const lista = [...animais, novo];
      localStorage.setItem('animais', JSON.stringify(lista));
      setAnimais(lista);
      return true;
    } catch {
      setError('Erro ao salvar animal localmente');
      return false;
    }
  };

  const limparAnimais = async (): Promise<boolean> => {
    try {
      setError(null);
      // Tenta limpar na API
      await animalService.deleteAll();
      setConnectionStatus('online');
    } catch (error: any) {
      if (animalService.isConnectionError(error)) {
        setConnectionStatus('offline');
        console.warn('🔌 Backend offline - limpando apenas localmente');
      } else {
        setError('Erro ao conectar com o servidor');
        return false;
      }
    }
    
    try {
      localStorage.removeItem('animais');
      setAnimais([]);
      return true;
    } catch {
      setError('Erro ao limpar dados localmente');
      return false;
    }
  };

  const filtrarAnimais = (filtros: any) => {
    return animais.filter((a) => {
      if (filtros.disponibilidade === 'somente_disponiveis' && !a.disponivel) return false;
      if (filtros.especie !== 'todas' && a.especie !== filtros.especie) return false;
      if (filtros.sexo !== 'todos' && a.sexo !== filtros.sexo) return false;
      if (filtros.porte !== 'todos' && a.porte !== filtros.porte) return false;
      if (filtros.busca && 
          !a.nome.toLowerCase().includes(filtros.busca.toLowerCase()) && 
          !a.raca?.toLowerCase().includes(filtros.busca.toLowerCase()) &&
          !a.donoEndereco?.toLowerCase().includes(filtros.busca.toLowerCase())) {
        return false;
      }
      return true;
    });
  };

  const recarregarAnimais = () => {
    carregarAnimais();
  };

  return { 
    animais, 
    loading, 
    error,
    connectionStatus,
    adicionarAnimal, 
    limparAnimais, 
    filtrarAnimais,
    recarregarAnimais 
  };
}