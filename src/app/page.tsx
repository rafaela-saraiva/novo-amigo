import Carousel from "@/components/Carousel";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from "./page.module.css";

export default function Home(pet:Pet) {
  return (
    <>
      <Header />
      <main className={styles.content}>
        <div style={{ maxWidth: 1200, margin: "32px auto", padding: "0 16px" }}>
          <Carousel />
        </div>
      </main>
      <Footer />
    </>
  );
}
