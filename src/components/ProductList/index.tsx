import  Pet from "@/Models/Pet";
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
          img={Pet.img}
          desc={Pet.desc}
          tipo={Pet.tipo}
        />
      ))}
    </section>
  );
}
