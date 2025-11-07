// src/Models/Pet.ts - NÃO MUDE NADA AQUI
export interface Pet {
  id: string;
  nome: string;
  especie: string;
  raca: string;
  idade: string;
  sexo: string;
  porte: string;
  descricao: string;
  foto?: string;
  imagem?: string;
  disponivel: boolean;
  vacinado?: boolean;
  castrado?: boolean;
  cidade?: string;
  donoId: string;
  donoNome: string;
  donoTipo: 'usuario' | 'ong';
  donoEndereco?: string;
}
