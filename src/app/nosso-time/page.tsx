'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import styles from './styles.module.css';

export default function NossoTime() {
  return (
    <>
    <Header />
    <main className={styles.main}>

      {/* ===== HERO ===== */}
      <section className={styles.hero}>
        <div className={styles.heroBadge}>Os Construtores</div>

        <h1 className={styles.heroTitle}>
          As pessoas por trás do{' '}
          <span className={styles.heroHighlight}>Novo Amigo</span>
        </h1>

        <p className={styles.heroSub}>
          Um squad fullstack de 4 especialistas dedicados a transformar o
          resgate animal através da tecnologia. Mais de 120k linhas de código
          gerando impacto real.
        </p>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>120k+</span>
            <span className={styles.statLabel}>Linhas de código</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>3.6k+</span>
            <span className={styles.statLabel}>Total Commits</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>4</span>
            <span className={styles.statLabel}>Devs Fullstack</span>
          </div>
        </div>
      </section>

      {/* ===== CARDS DOS MEMBROS ===== */}
      <section className={styles.cardsSection}>

        {/* Giovanna Alves */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>UI/UX Design</div>
          <div className={styles.photoWrapper}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.initials}>GA</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Giovanna Alves</h3>
            <p className={styles.memberRole}>Especialista Frontend</p>
            <p className={styles.memberDesc}>
              Criando interfaces intuitivas e experiências visuais que tornam a adoção mais acessível.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>94%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>82%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '82%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>94%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '94%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* João Pedro */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Maior Contribuição</div>
          <div className={styles.photoWrapper}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.initials}>JP</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>João Pedro</h3>
            <p className={styles.memberRole}>Fullstack, Lead</p>
            <p className={styles.memberDesc}>
              Arquitetando soluções escaláveis que conectam pessoas e animais com eficiência e segurança.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>98%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>95%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '95%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>98%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '98%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Luiz Reinã */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Core Engine</div>
          <div className={styles.photoWrapper}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.initials}>LR</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Luiz Reinã</h3>
            <p className={styles.memberRole}>Engenheiro Backend</p>
            <p className={styles.memberDesc}>
              Dominando fluxos de dados e APIs seguras para alimentar toda a rede de adoção.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>89%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>78%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '78%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>89%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '89%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rafaela Saraiva */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Mais Consistente</div>
          <div className={styles.photoWrapper}>
            <div className={styles.photoPlaceholder}>
              <span className={styles.initials}>RS</span>
            </div>
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Rafaela Saraiva</h3>
            <p className={styles.memberRole}>Dev Full Stack</p>
            <p className={styles.memberDesc}>
              Iterando com consistência em funcionalidades e garantindo qualidade em cada entrega.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>72%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>65%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '65%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>72%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '72%' }} /></div>
              </div>
            </div>
          </div>
        </div>

      </section>

    </main>
    <Footer />
    </>
  );
}
