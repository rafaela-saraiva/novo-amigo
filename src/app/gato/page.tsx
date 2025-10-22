'use client'
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import { gatos as sampleGatos } from '@/data/sampleAnimals';

export default function GatoPage() {
  return (
    <>
      <Header />

      <main style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
        <h1 style={{ textAlign: "center", marginBottom: "32px", color: "#2d5a60" }}>
          🐱 Gatos para Adoção
        </h1>

        <p style={{ 
          textAlign: "center", 
          marginBottom: "48px", 
          color: "#6b7280",
          fontSize: "18px",
          maxWidth: "600px",
          margin: "0 auto 48px auto"
        }}>
          Encontre o companheiro felino perfeito. 
          Nossos gatos são carinhosos e prontos para ronronar em seu colo!
        </p>

        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "24px",
            justifyItems: "center",
            padding: "0 16px",
            maxWidth: "1200px",
            margin: "0 auto",
          }}
        >
          {sampleGatos.map((pet) => (
            <div key={pet.id} style={{ width: "100%", maxWidth: "300px" }}>
              <ProductCard
                nome={pet.nome}
                img={pet.img}
                tipo={pet.tipo}
                desc={pet.desc}
              />
              <div style={{ 
                marginTop: "12px", 
                display: "flex", 
                gap: "8px",
                flexDirection: "column"
              }}>
                <a 
                  href={`/animal/${pet.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                    color: "white",
                    padding: "10px 16px",
                    borderRadius: "8px",
                    textDecoration: "none",
                    fontWeight: "600",
                    fontSize: "14px",
                    transition: "transform 0.2s ease"
                  }}
                >
                  ❤️ Quero Adotar
                </a>
                <a 
                  href={`/animal/${pet.id}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    background: "#f3f4f6",
                    color: "#374151",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontSize: "13px",
                    border: "2px solid #e5e7eb",
                    transition: "background 0.2s ease"
                  }}
                >
                  Ver Perfil Completo
                </a>
              </div>
            </div>
          ))}
        </section>

        <div style={{
          textAlign: "center",
          marginTop: "48px",
          padding: "32px",
          backgroundColor: "#f9fafb",
          borderRadius: "16px",
          border: "2px solid #e5e7eb"
        }}>
          <h3 style={{ color: "#2d5a60", marginBottom: "16px" }}>
            Não encontrou o gato ideal?
          </h3>
          <p style={{ color: "#6b7280", marginBottom: "24px" }}>
            Temos muitos outros animais esperando por uma família amorosa.
          </p>
          <a href="/nossos-animais" style={{
            display: "inline-block",
            background: "linear-gradient(135deg, #6ae6d3, #43959b)",
            color: "white",
            padding: "12px 24px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "600",
            transition: "transform 0.2s ease"
          }}>
            Ver Todos os Animais
          </a>
        </div>
      </main>

      <Footer />
    </>
  );
}