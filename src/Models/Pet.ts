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
  imagem?: string;
  disponivel: boolean;
  donoId: string;
  donoNome: string;
  donoTipo: 'usuario' | 'ong';
  donoEndereco?: string;
}