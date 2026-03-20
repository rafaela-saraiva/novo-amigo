import Image from "next/image";
import Link from "next/link";
import styles from "./styles.module.css";

export default function Carousel() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        {/* Lado esquerdo */}
        <div className={styles.left}>
          <div className={styles.badge}>
            <span className="material-symbols-outlined">verified_user</span>
            <span>ADOÇÃO RESPONSÁVEL</span>
          </div>

          <h1 className={styles.heading}>
            Um lar muda tudo.
            <br />
            <span className={styles.headingAccent}>Inclusive a vida dele.</span>
          </h1>

          <p className={styles.description}>
            Conectamos corações carentes a lares cheios de amor. Junte-se à
            nossa comunidade de adoção responsável e mude uma história hoje.
          </p>

          <div className={styles.ctas}>
            <Link href="/nossos-animais" className={styles.ctaPrimary}>
              Quero Adotar
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            <Link href="/sobre" className={styles.ctaSecondary}>
              Como Funciona
            </Link>
          </div>

          <div className={styles.stats}>
            <div className={styles.avatars}>
              <div className={styles.avatar}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuA7rKPR76DLFoE24DfCCpZDayhm6S_Bi3_GiZlZltbcw21cTiGe14nTup7SLJPEMKIFWLkUKt__InNGRBPaxsSb8A4PgYxdRPF9yxgxlTNsr1Ct9Y1DVMMaMu16IHm40nNRW9jh_j2VPH6_rHKk6Bhqq5H_J8RE0LZj33EaPwmvU00rzQjTYR1TdDMH4RK28o13Z3vVvyUg0N6QXE6KEsjDoOYUg3l7-IcwhRt3Ju-HkBFyLCSm-uqzxHHiV5ZrRhAmDzCkHZEuTQlX"
                  alt="Adotante feliz"
                  width={48}
                  height={48}
                  unoptimized
                />
              </div>
              <div className={styles.avatar}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuALHhQJpPviEYevdq9HEqYEVd-I9YJhYmyr-SB3Q6Msaiplq4c56X4geQG9UHyiFfevP1vEEPrf44CJn2d8R1wIZ9NDoKJm6hOuz_yiiyA9WUArkUXKot_no9j414ABnCTdEkUZQdtj7ahQzWe5RCsIM_lukfgDg55BBZzGOSxk6q5NQtqtEnhXpvYWcGEsVVw0NuysgeVKaaz0WEUGjDAyZR_79CDHZnwjLx1JT0CMT5AXuWTeC_gMCzNpRv3-dnS6C0PCH4cKdchn"
                  alt="Pai de pet"
                  width={48}
                  height={48}
                  unoptimized
                />
              </div>
              <div className={styles.avatar}>
                <Image
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuBRuq9CFi3KEu13mFlTJY0t5it6DU2oLzpH1PYy6ygWLJNak_d08XuR1fIdSpuhn_GNpFFtVOB_xBgy4nEwXP2vNIzkz3_9EntjESd52EafWsYXOUnFX4ViPcV2nqPfahzKnrhbIXWmBd3EozFXpYwA8UlHZt899UuWmp4-UsT6luUXPAHwfJQyNCybfq9uexpMuPptbJae7-JCYVBAQvcMsm28b_zt32OsAV0Zs2ntlcmyzfSi4b3t931XfiwCu3vVJmKrOXwRbK0d"
                  alt="Família feliz com cachorro"
                  width={48}
                  height={48}
                  unoptimized
                />
              </div>
            </div>
            <div className={styles.statsText}>
              <p className={styles.statsNumber}>+2.300 adoções</p>
              <p className={styles.statsLabel}>realizadas com sucesso</p>
            </div>
          </div>
        </div>

        {/* Lado direito */}
        <div className={styles.right}>
          <div className={styles.imageWrapper}>
            <Image
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCXFl6-dE7MYSN2IpjKrTdoZqEtZDWMEyKvKdq9mbi9dxosr68lOKUSlrsdRK2t0X6s41hjKlITdnqSFurOZnh7g9pu5JbesLvLTRN3Bl7aCQuBYSWuUsacmxRirTfpMtg3j_Jon3j2Njrtu3607Wy2MuSOMzqgAGh7vh3eGOgZnm6U2BZFMXUDVx-K_AtPggmrYhuU1esZ14OLw_TAQU1BgfEhjsCXo66EBJOO9XiZW5MQ0qKpPENS_U_1KlGKLZWEBfd-OW_adUUi"
              alt="Golden retriever feliz em um parque"
              fill
              className={styles.heroImage}
              unoptimized
            />
          </div>

          <div className={styles.matchCard}>
            <div className={styles.matchHeader}>
              <span className="material-symbols-outlined" style={{ color: '#fb7084', fontSize: 28 }}>
                favorite
              </span>
              <p className={styles.matchTitle}>Match de Hoje!</p>
            </div>
            <p className={styles.matchText}>
              O &quot;Max&quot; combina 98% com o seu estilo de vida aventureiro.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
