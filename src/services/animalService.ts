// src/services/animalService.ts
import { Pet } from '@/Models/Pet';
import api from './api'; // ✅ Usa sua instância configurada

const IS_DEV = process.env.NODE_ENV === 'development';

// Mock data para desenvolvimento
const mockPets: Pet[] = [
  {
    id: '1',
    nome: 'Rex',
    especie: 'cachorro',
    raca: 'Labrador',
    idade: '2 anos',
    sexo: 'macho',
    porte: 'grande',
    descricao: 'Muito brincalhão e carinhoso',
    imagem: '/placeholder-dog.jpg',
    disponivel: true,
    donoId: '1',
    donoNome: 'ONG Amigos dos Animais',
    donoTipo: 'ong',
    donoEndereco: 'São Paulo, SP'
  }
];

export const animalService = {
  async getAll(): Promise<Pet[]> {
    try {
      const res = await api.get('/animals');
      console.log('✅ Dados carregados do backend');
      return res.data;
    } catch (error: unknown) {
      // Em desenvolvimento, retorna mock data se backend estiver offline
      if (IS_DEV && this.isConnectionError(error)) {
        console.warn('📋 Backend offline - usando dados mock');
        return mockPets;
      }
      
      // Em produção ou outros erros, verifica se é 401 (não autorizado)
      const axiosErr = error as { response?: { status?: number }; message?: string };
      if (axiosErr.response?.status === 401) {
        console.error('🔐 Não autorizado - redirecionando para login');
        // Seu interceptor já cuida do redirecionamento
      }
      
      console.error('Erro ao buscar animais:', axiosErr.message);
      throw error;
    }
  },

  async create(animal: Pet): Promise<Pet> {
    try {
      const pessoaId = Number(animal.donoId);
      const ownerFk =
        Number.isFinite(pessoaId) && pessoaId > 0
          ? animal.donoTipo === 'ong'
            ? { shelterId: pessoaId }
            : { userId: pessoaId }
          : {};

      const res = await api.post('/animals', { ...animal, ...ownerFk });
      console.log('✅ Animal criado no backend');
      return res.data;
    } catch (error: unknown) {
      // Em desenvolvimento, simula sucesso se backend estiver offline
      if (IS_DEV && this.isConnectionError(error)) {
        console.warn('📋 Backend offline - simulando criação local');
        return { ...animal, id: Date.now().toString() };
      }
      
      const axiosErr2 = error as { response?: { status?: number }; message?: string };
      if (axiosErr2.response?.status === 401) {
        console.error('🔐 Não autorizado para criar animal');
      }
      
      console.error('Erro ao criar animal:', axiosErr2.message);
      throw error;
    }
  },

  async deleteAll(): Promise<void> {
    try {
      await api.delete('/animals');
      console.log('✅ Todos os animais removidos do backend');
    } catch (error: unknown) {
      const axiosErr = error as { message?: string };
      if (IS_DEV && this.isConnectionError(error)) {
        console.warn('📋 Backend offline - simulando limpeza local');
        return;
      }
      console.error('Erro ao deletar animais:', axiosErr.message);
      throw error;
    }
  },

  // Método para testar conexão de forma segura
  async testConnection(): Promise<{ success: boolean; message: string }> {
    try {
      const startTime = Date.now();
      
      // Testa um endpoint seguro que não modifica dados
      await api.get('/animals?test=connection');
      
      const responseTime = Date.now() - startTime;
      
      return {
        success: true,
        message: `✅ Conexão estabelecida (${responseTime}ms)`
      };
    } catch (error: unknown) {
      const axiosErr = error as { response?: { status?: number }; message?: string };
      if (this.isConnectionError(error)) {
        return {
          success: false,
          message: '❌ Backend não está respondendo'
        };
      }
      
      // Outros erros (como 401) não são problemas de conexão
      return {
        success: false,
        message: `⚠️ Backend respondeu com erro: ${axiosErr.response?.status || axiosErr.message}`
      };
    }
  },

  // Verifica se o erro é de conexão (não resposta do servidor)
  isConnectionError(error: unknown): boolean {
    const e = error as { code?: string; message?: string; response?: unknown };
    return (
      e.code === 'NETWORK_ERROR' ||
      e.code === 'ECONNREFUSED' ||
      e.message?.includes('Network Error') ||
      e.message?.includes('timeout') ||
      !e.response // Sem resposta do servidor
    );
  }
};
