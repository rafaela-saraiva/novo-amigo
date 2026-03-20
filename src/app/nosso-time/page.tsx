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
          resgate animal através da tecnologia. Mais de 27k linhas de código
          gerando impacto real.
        </p>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>27k+</span>
            <span className={styles.statLabel}>Linhas de código</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>190+</span>
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
          <div className={styles.cardBadge}>Data & Structure</div>
          <div className={styles.photoWrapper}>
            <img src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg" alt="Giovanna Alves" className={styles.memberPhoto} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Giovanna Alves</h3>
            <p className={styles.memberRole}>Especialista Frontend</p>
            <p className={styles.memberDesc}>
              Contribuiu na estrutura de dados e suporte técnico, auxiliando na estabilidade do projeto.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>8%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>55%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '55%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>79%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '79%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* João Pedro */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Backend Specialist</div>
          <div className={styles.photoWrapper}>
            <img src="https://i.postimg.cc/zvpLfMYH/jao.jpg" alt="João Pedro" className={styles.memberPhoto} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>João Pedro</h3>
            <p className={styles.memberRole}>Fullstack, Lead</p>
            <p className={styles.memberDesc}>
              Especialista em backend, com alta frequência de commits e forte participação na base do sistema.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>11%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>70%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '70%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>87%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '87%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Luiz Reinã */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Fullstack Core</div>
          <div className={styles.photoWrapper}>
            <img src="https://i.postimg.cc/GtzBpNns/luiz.jpg" alt="Luiz Reinã" className={styles.memberPhoto} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Luiz Reinã</h3>
            <p className={styles.memberRole}>Engenheiro Backend</p>
            <p className={styles.memberDesc}>
              Atuação fullstack com foco em estrutura central e integração entre backend e frontend.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>33%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>85%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '85%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>91%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '91%' }} /></div>
              </div>
            </div>
          </div>
        </div>

        {/* Rafaela Saraiva */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>UI & Frontend Lead</div>
          <div className={styles.photoWrapper}>
            <img src="https://i.postimg.cc/sxKB28C7/rafaela.jpg" alt="Rafaela Saraiva" className={styles.memberPhoto} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Rafaela Saraiva</h3>
            <p className={styles.memberRole}>Dev Full Stack</p>
            <p className={styles.memberDesc}>
              Responsável pela maior parte da interface e experiência do usuário, liderando o desenvolvimento frontend do projeto.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>47%</span>
              <span className={styles.percentLabel}>Contribuição geral</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Contribuição</span><span>95%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '95%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Impacto</span><span>96%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '96%' }} /></div>
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
                27k <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>13.087</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>9.184</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '70%', opacity: 0.75 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>3.084</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '24%', opacity: 0.5 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>2.191</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '17%', opacity: 0.3 }} /></div>
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
                192 <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>67</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>54</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '81%', opacity: 0.8 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>47</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '70%', opacity: 0.6 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>24</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '36%', opacity: 0.4 }} /></div>
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

            {/* 1st - Rafaela Saraiva */}
            <div className={`${styles.rankRow} ${styles.rankFirst}`}>
              <div className={styles.rankDecor} />
              <span className={styles.rankNum}>01</span>
              <div className={styles.rankAvatar}>
                <img src="https://i.postimg.cc/sxKB28C7/rafaela.jpg" alt="Rafaela Saraiva" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Rafaela Saraiva</h4>
                <p className={styles.rankScore}>9.6 Média de Impacto</p>
              </div>
              <span className={styles.rankBadge}>🥇 Destaque</span>
            </div>

            {/* 2nd - Luiz Reinã */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>02</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/GtzBpNns/luiz.jpg" alt="Luiz Reinã" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Luiz Reinã</h4>
                <p className={styles.rankScore}>9.1 Média de Impacto</p>
              </div>
            </div>

            {/* 3rd - João Pedro */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>03</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/zvpLfMYH/jao.jpg" alt="João Pedro" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>João Pedro</h4>
                <p className={styles.rankScore}>8.7 Média de Impacto</p>
              </div>
            </div>

            {/* 4th - Giovanna Alves */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>04</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg" alt="Giovanna Alves" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Giovanna Alves</h4>
                <p className={styles.rankScore}>7.9 Média de Impacto</p>
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
                <div className={styles.focusBack} style={{ width: '20%' }} />
                <div className={styles.focusFront} style={{ width: '80%' }} />
              </div>
              <p className={styles.focusCaption}>Rafaela: UI & Frontend Lead do Projeto</p>
            </div>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '40%' }} />
                <div className={styles.focusFront} style={{ width: '60%' }} />
              </div>
              <p className={styles.focusCaption}>Luiz: Fullstack Core com Visão Integrada</p>
            </div>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '60%' }} />
                <div className={styles.focusFront} style={{ width: '40%' }} />
              </div>
              <p className={styles.focusCaption}>João: Backend Specialist com Alta Frequência</p>
            </div>

            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend</span><span>Frontend</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '80%' }} />
                <div className={styles.focusFront} style={{ width: '20%' }} />
              </div>
              <p className={styles.focusCaption}>Giovanna: Data & Structure com Base Backend</p>
            </div>

          </div>
        </div>

      </section>

    </main>
    <Footer />
    </>
  );
}
