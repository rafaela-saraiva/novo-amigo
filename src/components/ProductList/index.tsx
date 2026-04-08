import { Pet } from "@/Models/Pet";
import ProductCard from "../ProductCard";


type PetProps = {
  pets: Pet[];
};

export default function ProductList({ pets }: PetProps) {
  return (
    <section className="pet">
      
      {pets.map((Pet) => (
        <ProductCard
          key={Pet.id}
          nome={Pet.nome}
          img={typeof Pet.foto === 'string' ? Pet.foto : (Array.isArray(Pet.foto) ? Pet.foto[0] : Pet.imagem || '')}
          desc={Pet.descricao}
          tipo={Pet.especie as "gato" | "cachorro" | "passaro" | "coelho" | "hamster" | "fazenda" | "teste"}
        />
      ))}
    </section>
  );
}
