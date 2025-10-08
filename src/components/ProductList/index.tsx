import  Pet from "../Models/Pet";
import ProductCard from "../ProductCard/index";


type Props = {
  pets: Pet[];
};

export default function ProductList({ pets }: Props) {
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
