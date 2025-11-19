'use client';


import styles from './styles.module.css';


export default function SobreNos() {
  return (<>
      
    <section className={styles.section}>
      <h2 className={styles.sobre}>Sobre Nós</h2>

      <p className={styles.texto}>
        No <strong>Adote um Amigo</strong>, nossa paixão é criar pontes de amor entre animais de estimação que
        precisam de um lar e pessoas de bom coração. Acreditamos que cada adoção transforma duas vidas: a do
        animal, que ganha uma família, e a do adotante, que descobre um amor incondicional. Nossa missão é
        garantir que cada pet encontre um lar seguro e feliz, promovendo a posse responsável e o bem-estar
        animal acima de tudo.
      </p>

      <div className={styles.animais}>
        <img
          className={styles.imgAnimal}
          alt="Gato brincalhão"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuAucQ64-5jVT-KRfo52y-haHmgiIi_TOm6hYB_s_HFKnqC7pA8-D8icSQSeE34-Lhkz4VZ4HiBxU_Dx8hYXD_DEVrtE_5ZCHUWLUGtcPi7urfg4fUyKuJExiUwxFS4C0D_HM-Sp_swVkmWW_BIfD3Ac2mEIOWJAQQyat_0kcrx0EzFWc2z-5vDlneS_U6QbNg1DEdbOQWRTL6a5haMv2VFggOFwtlpwNNdPP81_vRzuxavkfpJ5GF-fUMXDzSN-uqNsOB97A8sgDCE"
          />
        <img
          className={styles.imgAnimal}
          alt="Cachorro relaxando na grama"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBEXJCH-VUyX4UnFb6mM9fZMKtGEd2lqz2Fl8G02v-KWRmfB4n7YArg65yGIzjU6V251-y9colNWGuN7NrdwhTg7zeR21ogtiLnecicvsMqk8K7cl1N3pWDIwdfVna2_Gv_70-zeBa9HlT8IRSmC0S9PolNr02Ji9Fp1ELv8svJGDyJV2T3Vjl-mi2u9UHYDYUZQ7iGbnNqzLVbscDku0sY_icjAJnrDq5kUu6S3zY3vCbTpKFJcOE4gM7AvN7PJCBb598tAXyfZ6I"
          />
        <img
          className={styles.imgAnimal}
          alt="Dois cachorrinhos fofos"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuBdK94v8v2A60uV76TfloSIwTTMyTdmEE2bFy61SE6j853IboRm5gHadOV6wiSH4Ce-tA960mHxJ8Uke5e7QTIurkGtB9-VvFf-7IOFPLqcbISreITwTQWGJq02a8wURVM5GyWt167OyPuqF41ZKoq3n30DqUas0-phfqbkWrzYz9JjC4O5sHRVcuBuRi68Ki3IOW38_gBPCdNDHx26cjZ3wmtP6UQcdtD4nTz6CbPC9AkHcwQgDck1OYsvu5TNsTo1ouOysh7_A4s"
          />
        <img
          className={styles.imgAnimal}
          alt="Gato olhando para a câmera"
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCL9AvCm1zYFyHKj-6A2-U16P4XMGY-Z-FzkX2HsjGQRVC5CSqM71TloDTGg_ZuN3nU4IkUyEDAbfKyLgNvsHfOkuy6jcfqS9RYaL8PisIXUlgOOy6HsooisPlgT4HIyCJ8bV7nRA3jdP2SJg9jT6h_E6wQaj3NBO8XuY66jsJCbcD7834QfRFGY0hUAuNvVwDzJJeMf3pifNfwbXmOmKhSqOMP9O3ktSkR__Fz4W9uafHqxBqYa-tQEa9Gfb0pzwdXSUupFeUoQi4"
          />
      </div>

      <div className={styles.valores}>
        <h3>Nossos Valores</h3>
        <p>
          <strong>Compaixão:</strong> Agimos com empatia e cuidado por todos os animais. <br />
          <strong>Comunidade:</strong> Construímos uma rede de apoio entre adotantes, voluntários e parceiros. <br />
          <strong>Compromisso:</strong> Dedicamo-nos incansavelmente a encontrar o lar perfeito para cada pet.
        </p>
      </div>
    </section>
      
          </>
  );
}
