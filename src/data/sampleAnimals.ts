import Pet from '@/Models/Pet';

export const cachorros: Pet[] = [
  {
    id: 1001,
    nome: "Rex",
    img: "https://i.postimg.cc/vxx9SyHf/conheca-as-racas-de-cachorros-mais-inteligentes-do-mundo-04-0.jpg",
    desc: "Cachorro amigável e brincalhão, adora crianças",
    tipo: "cachorro"
  },
  {
    id: 1002,
    nome: "Luna",
    img: "https://i.postimg.cc/GhJ0XyWw/images-1.jpg",
    desc: "Cachorra dócil e carinhosa, ideal para apartamento",
    tipo: "cachorro"
  },
  {
    id: 1003,
    nome: "Thor",
    img: "https://i.postimg.cc/Q9y1bCsc/images.jpg",
    desc: "Cachorro grande e protetor, precisa de quintal",
    tipo: "cachorro"
  },
  {
    id: 1004,
    nome: "Mel",
    img: "https://i.postimg.cc/ftrmKyZj/raca-de-cachorro-muito-popular-no-brasil-3.jpg",
    desc: "Cachorrinha pequena e cheia de energia",
    tipo: "cachorro"
  },
  {
    id: 1005,
    nome: "Max",
    img: "https://i.postimg.cc/PpRY4Jhb/simba.jpg",
    desc: "Cachorro obediente e fácil de treinar",
    tipo: "cachorro"
  }
];

export const gatos: Pet[] = [
  {
    id: 2001,
    nome: "Mia",
    img: "https://i.postimg.cc/Y0KvQxqM/gato1.jpg",
    desc: "Gatinha carinhosa e independente",
    tipo: "gato"
  },
  {
    id: 2002,
    nome: "Garfield",
    img: "https://i.postimg.cc/6qwXBjTR/gato2.jpg",
    desc: "Gato laranja preguiçoso e fofo",
    tipo: "gato"
  },
  {
    id: 2003,
    nome: "Sombra",
    img: "https://i.postimg.cc/VNpqXBvL/gato3.jpg",
    desc: "Gato preto elegante e misterioso",
    tipo: "gato"
  }
];

const sample = { cachorros, gatos };
export default sample;
