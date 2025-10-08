type Pet = {
    id: number;
    nome: string;
    img: string;
    desc: string;
    tipo:
    | "gato"
    | "cachorro"
    | "passaro"
    | "coelho"
    | "hamster"
    | "fazenda"
    | "teste";
};

export default Pet;