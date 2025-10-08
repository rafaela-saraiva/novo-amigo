

import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import FaleConosco from "@/components/FaleConosco";
import styles from "./page.module.css";
import "./page.css";

export default function Home() {
  return (
    <>
      <Header />

      <main className={styles.content}>
        <div style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
          <Carousel />
        </div>
      </main>

      {/* Aqui é o FaleConosco */}
      <section style={{ maxWidth: 800, margin: "0 auto", padding: "32px 16px" }}>
        <FaleConosco />
      </section>

      <Footer />
    </>
  );
}
