return (
    <>
      <Header />

      <main style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "32px" }}>Adoção de Pets</h1>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, 1fr)", // 5 cards por linha
            gap: "24px",
            justifyItems: "center",
            padding: "48px 16px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {pets.map((pet) => (
            <ProductCard
              key={pet.id}
              nome={pet.nome}
              img={pet.img}
              tipo={pet.tipo as any}
              desc={pet.desc}
            />
          ))}
        </section>
      </main>

      <Footer />
    </>
  );
}