'use client'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { useState } from "react";
import styles from "./styles.module.css";

export default function NossosAnimais() {
  const [filtros, setFiltros] = useState({
    especie: "Todas as espécies",
    sexo: "Todos os sexos",
    porte: "Todos os portes",
    estado: "Todos os Estados",
    cidade: "Todas as Cidades",
    disponibilidade: "Somente disponíveis",
    busca: ""
  });

  const [ordenacao, setOrdenacao] = useState("Mais recentes");

  // Lista de animais disponíveis para adoção
  // TODO: Substituir por dados reais dos animais
  const pets: {
    id: number;
    nome: string;
    img: string;
    tipo: string;
    local: string;
  }[] = [];

  const handleFiltroChange = (campo: string, valor: string) => {
    setFiltros(prev => ({ ...prev, [campo]: valor }));
  };

  return (
    <>
      <Header />
      
      <main className={styles.main}>
        <div className={styles.container}>
        

          {/* Título Principal */}
          <h1 className={styles.title}>Encontre seu novo amigo</h1>

          {/* Área de Filtros */}
          <div className={styles.filtrosContainer}>
            <div className={styles.filtrosLinha1}>
              <select 
                className={styles.select}
                value={filtros.especie}
                onChange={(e) => handleFiltroChange('especie', e.target.value)}
              >
                <option>Todas as espécies</option>
                <option>Cachorro</option>
                <option>Gato</option>
                <option>Pássaro</option>
                <option>Coelho</option>
                <option>Hamster</option>
                <option>Fazenda</option>
              </select>

              <select 
                className={styles.select}
                value={filtros.sexo}
                onChange={(e) => handleFiltroChange('sexo', e.target.value)}
              >
                <option>Todos os sexos</option>
                <option>Macho</option>
                <option>Fêmea</option>
              </select>

              <select 
                className={styles.select}
                value={filtros.porte}
                onChange={(e) => handleFiltroChange('porte', e.target.value)}
              >
                <option>Todos os portes</option>
                <option>Pequeno</option>
                <option>Médio</option>
                <option>Grande</option>
              </select>
            </div>

            <div className={styles.filtrosLinha2}>
              <select 
                className={styles.select}
                value={filtros.estado}
                onChange={(e) => handleFiltroChange('estado', e.target.value)}
              >
                <option>Todos os Estados</option>
                <option>São Paulo</option>
                <option>Rio de Janeiro</option>
                <option>Minas Gerais</option>
              </select>

              <select 
                className={styles.select}
                value={filtros.cidade}
                onChange={(e) => handleFiltroChange('cidade', e.target.value)}
              >
                <option>Todas as Cidades</option>
                <option>São Paulo</option>
                <option>Santos</option>
                <option>Campinas</option>
              </select>

              <select 
                className={styles.select}
                value={filtros.disponibilidade}
                onChange={(e) => handleFiltroChange('disponibilidade', e.target.value)}
              >
                <option>Somente disponíveis</option>
                <option>Todos</option>
                <option>Adotados</option>
              </select>

              <div className={styles.buscaContainer}>
                <input 
                  type="text"
                  placeholder="Nome do bicho"
                  className={styles.inputBusca}
                  value={filtros.busca}
                  onChange={(e) => handleFiltroChange('busca', e.target.value)}
                />
                <button className={styles.btnBuscar}>Buscar</button>
              </div>
            </div>
          </div>

          {/* Abas de Ordenação */}
          <div className={styles.tabs}>
            {["Mais recentes", "Mais antigos", "Mais vistos", "Menos vistos"].map((tab) => (
              <button
                key={tab}
                className={`${styles.tab} ${ordenacao === tab ? styles.tabActive : ''}`}
                onClick={() => setOrdenacao(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Grid de Pets */}
          <div className={styles.petsGrid}>
            {pets.length > 0 ? (
              pets.map((pet) => (
                <div key={pet.id} className={styles.petCard}>
                  <div className={styles.petHeader}>
                    <h3 className={styles.petNome}>{pet.nome}</h3>
                  </div>
                  <div className={styles.petImagem}>
                    <img src={pet.img} alt={pet.nome} />
                  </div>
                  <div className={styles.petInfo}>
                    <p className={styles.petLocal}>{pet.local}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className={styles.semAnimais}>
                <div className={styles.semAnimaisConteudo}>
                  <h3>🐾 Nenhum animal encontrado</h3>
                  <p>Em breve teremos nossos amiguinhos disponíveis aqui!</p>
                  <p>Os cards dos animais serão adicionados em breve com um design ainda melhor.</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}