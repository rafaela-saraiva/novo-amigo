import Footer from "@/components/Footer";
import Header from "@/components/Header";
import styles from './page.module.css';


export default function Home() {
  return (
   <>
   <Header/>
   <main className={styles.content} />
   <Footer/>
   </>
  );
}
