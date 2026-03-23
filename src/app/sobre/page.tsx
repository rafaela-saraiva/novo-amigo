'use client';


import Header from '@/components/Header';
import styles from './styles.module.css';
import Footer from '@/components/Footer';


export default function SobreNos() {
  return (<>
      <Header/>
    <section className={styles.section}>
      <h2 className={styles.sobre}>Sobre Nós</h2>

      <p className={styles.texto}>
        No <strong>Novo Amigo</strong>, nosso objetivo é criar pontes de amor entre animais de estimação que
        precisam de um lar e pessoas de bom coração. Acreditamos que cada adoção transforma duas vidas: a do
        animal, que ganha uma família, e a do adotante, que descobre um amor incondicional. Nossa missão é
        garantir que cada pet encontre um lar seguro e feliz, promovendo a posse responsável e o bem-estar
        animal acima de tudo.
      </p>

      

      <div className={styles.valores}>
        <h3>Nossos Valores</h3>
        <p>
          <strong>Compaixão:</strong> Agimos com empatia e cuidado por todos os animais. <br />
          <strong>Comunidade:</strong> Construímos uma rede de apoio entre adotantes, voluntários e parceiros. <br />
          <strong>Compromisso:</strong> Dedicamo-nos incansavelmente a encontrar o lar perfeito para cada pet.
        </p>
      </div>
    </section>
      <Footer />
          </>
  );
}
