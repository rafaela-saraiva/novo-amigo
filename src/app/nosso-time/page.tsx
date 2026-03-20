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
            <img src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg" alt="Giovanna Alves" className={styles.memberPhoto} />
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
            <img src="https://i.postimg.cc/zvpLfMYH/jao.jpg" alt="João Pedro" className={styles.memberPhoto} />
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
            <img src="https://i.postimg.cc/GtzBpNns/luiz.jpg" alt="Luiz Reinã" className={styles.memberPhoto} />
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
            <img src="https://i.postimg.cc/sxKB28C7/rafaela.jpg" alt="Rafaela Saraiva" className={styles.memberPhoto} />
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

      {/* ===== DASHBOARD DE CONTRIBUIÇÕES ===== */}
      <section className={styles.dashboardSection}>
        <h2 className={styles.dashboardTitle}>
          <span className="material-symbols-outlined">dashboard_customize</span>
          Dashboard de Contribuições
        </h2>

        <div className={styles.dashboardGrid}>

          {/* Linhas de código */}
          <div className={styles.dashCard}>
            <div className={styles.dashCardHeader}>
              <div>
                <p className={styles.dashCardSub}>Profundidade Técnica</p>
                <h4 className={styles.dashCardTitle}>Linhas de código</h4>
              </div>
              <div className={styles.dashCardTotal}>
                120k <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>45,000</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>32,000</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '71%', opacity: 0.75 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>28,000</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '62%', opacity: 0.5 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>15,000</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '33%', opacity: 0.3 }} /></div>
              </div>
            </div>
          </div>

          {/* Commits */}
          <div className={styles.dashCard}>
            <div className={styles.dashCardHeader}>
              <div>
                <p className={styles.dashCardSub}>Velocidade</p>
                <h4 className={styles.dashCardTitle}>Frequência de commits</h4>
              </div>
              <div className={styles.dashCardTotal}>
                3.6k <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>1,240</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>980</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '79%', opacity: 0.8 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>845</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '68%', opacity: 0.6 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>620</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '50%', opacity: 0.4 }} /></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== RANKING DO TIME & ÁREA DE ATUAÇÃO ===== */}
      <section className={styles.rankingSection}>

        {/* Ranking do time */}
        <div className={styles.rankingCol}>
          <h2 className={styles.rankingTitle}>Ranking do time</h2>
          <div className={styles.rankList}>

            {/* 1st - João Pedro */}
            <div className={`${styles.rankRow} ${styles.rankFirst}`}>
              <div className={styles.rankDecor} />
              <span className={styles.rankNum}>01</span>
              <div className={styles.rankAvatar}>
                <img src="https://i.postimg.cc/zvpLfMYH/jao.jpg" alt="João Pedro" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>João Pedro</h4>
                <p className={styles.rankScore}>9.8 Média de Impacto</p>
              </div>
              <span className={styles.rankBadge}>🥇 Destaque</span>
            </div>

            {/* 2nd - Giovanna Alves */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>02</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg" alt="Giovanna Alves" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Giovanna Alves</h4>
                <p className={styles.rankScore}>9.4 Média de Impacto</p>
              </div>
            </div>

            {/* 3rd - Luiz Reinã */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>03</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/GtzBpNns/luiz.jpg" alt="Luiz Reinã" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Luiz Reinã</h4>
                <p className={styles.rankScore}>8.9 Média de Impacto</p>
              </div>
            </div>

            {/* 4th - Rafaela Saraiva */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>04</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/sxKB28C7/rafaela.jpg" alt="Rafaela Saraiva" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Rafaela Saraiva</h4>
                <p className={styles.rankScore}>7.2 Média de Impacto</p>
              </div>
            </div>

          </div>
        </div>

        {/* Área de atuação */}
        <div className={styles.focusCol}>
          <h2 className={styles.focusTitle}>Área de atuação</h2>
          <div className={styles.focusList}>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '60%' }} />
                <div className={styles.focusFront} style={{ width: '40%' }} />
              </div>
              <p className={styles.focusCaption}>João Pedro: Visão Sistêmica Balanceada</p>
            </div>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '10%' }} />
                <div className={styles.focusFront} style={{ width: '90%' }} />
              </div>
              <p className={styles.focusCaption}>Giovanna Alves: Domínio da Experiência Visual</p>
            </div>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '85%' }} />
                <div className={styles.focusFront} style={{ width: '15%' }} />
              </div>
              <p className={styles.focusCaption}>Luiz Reinã: Lógica de Infraestrutura Core</p>
            </div>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '30%' }} />
                <div className={styles.focusFront} style={{ width: '70%' }} />
              </div>
              <p className={styles.focusCaption}>Rafaela Saraiva: Foco em Entrega de Features</p>
            </div>

          </div>
        </div>

      </section>

    </main>
    <Footer />
    </>
  );
}
