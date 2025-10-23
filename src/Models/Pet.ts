type Pet = {
    id: number;
    nome: string;
    img: string;
    desc?: string;
    tipo:
    | "gato"
    | "cachorro"
    | "passaro"
    | "coelho"
    | "hamster"
    | "fazenda"
    | "teste";
};

export type Animal = {
    id: number;
    nome: string;
    idade: string;
    cidade: string;
    especie: string;
    raca?: string;
    sexo: string;
    porte: string;
    descricao?: string;
    vacinado: boolean;
    castrado: boolean;
    foto: string;
    disponivel: boolean;
};

export default Pet;