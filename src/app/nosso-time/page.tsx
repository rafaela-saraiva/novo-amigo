/* eslint-disable @next/next/no-img-element */
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
          resgate animal através da tecnologia. Mais de 23 mil linhas
          de código vivo em produção gerando impacto real.
        </p>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>23k+</span>
            <span className={styles.statLabel}>Linhas de código vivo</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>287</span>
            <span className={styles.statLabel}>Total de Commits</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>4</span>
            <span className={styles.statLabel}>Devs Fullstack</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>196</span>
            <span className={styles.statLabel}>Dias de atividade</span>
          </div>
        </div>
      </section>

      {/* ===== ESTATÍSTICAS DO PROJETO ===== */}
      <section className={styles.projectStats}>
        <div className={styles.projectStatGrid}>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>Mar/2026</span>
            <span className={styles.projectStatLabel}>Mês de pico</span>
            <span className={styles.projectStatSub}>99 commits em 1 mês — 34,5% do total</span>
          </div>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>69%</span>
            <span className={styles.projectStatLabel}>Foco horário</span>
            <span className={styles.projectStatSub}>12h–18h concentra os commits</span>
          </div>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>Qua &amp; Qui</span>
            <span className={styles.projectStatLabel}>Dias mais produtivos</span>
            <span className={styles.projectStatSub}>88 + 85 commits = 60,3% do total</span>
          </div>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>42,5%</span>
            <span className={styles.projectStatLabel}>Código vivo (Luiz)</span>
            <span className={styles.projectStatSub}>9.813 linhas no projeto atual</span>
          </div>
        </div>
      </section>

      {/* ===== CARDS DOS MEMBROS ===== */}
      <section className={styles.cardsSection}>

        {/* Giovanna Alves */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Apresentação</div>
          <div className={styles.photoWrapper}>
            <img src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg" alt="Giovanna Alves" className={styles.memberPhoto} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Giovanna Alves</h3>
            <p className={styles.memberRole}>Slides &amp; Apresentação</p>
            <p className={styles.memberDesc}>
              Responsável pelos slides e pela apresentação do projeto.
              Realizou 23 commits ao longo de 19 dias ativos, com 2,7% do
              código vivo atual de sua autoria.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>1,6%</span>
              <span className={styles.percentLabel}>do código vivo · 23 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>8,0%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '8%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Código vivo</span><span>1,6%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '2%' }} /></div>
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
            <p className={styles.memberRole}>Fullstack, Lead Backend</p>
            <p className={styles.memberDesc}>
              50,7% dos commits no backend e 585 arquivos críticos modificados.
              33 dias ativos com 7.483 linhas vivas no código atual (32,4%).
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>32,4%</span>
              <span className={styles.percentLabel}>do código vivo · 75 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>26,1%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '26%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Código vivo</span><span>32,4%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '32%' }} /></div>
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
            <p className={styles.memberRole}>Engenheiro Fullstack</p>
            <p className={styles.memberDesc}>
              Maior volume de código vivo: 9.813 linhas no projeto atual e 117 commits.
              42,5% de todo o código em produção é de sua autoria.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>42,5%</span>
              <span className={styles.percentLabel}>do código vivo · 117 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>40,8%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '41%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Código vivo</span><span>42,5%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '43%' }} /></div>
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
            <p className={styles.memberRole}>Dev Full Stack, UI Lead</p>
            <p className={styles.memberDesc}>
              138 arquivos únicos modificados e 24 arquivos críticos.
              34 dias ativos com 5.190 linhas vivas no código atual (22,5%).
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>23,5%</span>
              <span className={styles.percentLabel}>do código vivo · 72 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>25,1%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '25%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Código vivo</span><span>23,5%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '24%' }} /></div>
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
                <p className={styles.dashCardSub}>Código vivo no projeto atual (git blame)</p>
                <h4 className={styles.dashCardTitle}>Volume de código</h4>
              </div>
              <div className={styles.dashCardTotal}>
                23k <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>9.813 · 42,5%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>7.483 · 32,4%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '76%', opacity: 0.8 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>5.436 · 23,5%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '55%', opacity: 0.6 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>370 · 1,6%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '4%', opacity: 0.35 }} /></div>
              </div>
            </div>
          </div>

          {/* Commits */}
          <div className={styles.dashCard}>
            <div className={styles.dashCardHeader}>
              <div>
                <p className={styles.dashCardSub}>Velocidade · BE + FE</p>
                <h4 className={styles.dashCardTitle}>Frequência de commits</h4>
              </div>
              <div className={styles.dashCardTotal}>
                287 <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>117 · 40,8%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>75 · 26,1%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '64%', opacity: 0.8 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>72 · 25,1%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '62%', opacity: 0.65 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>23 · 8,0%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '20%', opacity: 0.4 }} /></div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ===== CRONOGRAMA DE ATIVIDADE ===== */}
      <section className={styles.timelineSection}>
        <h2 className={styles.dashboardTitle}>
          <span className="material-symbols-outlined">timeline</span>
          Cronograma de Atividade
        </h2>
        <div className={styles.timelineRows}>

          {/* Set/2025 */}
          <div className={styles.timelineRow}>
            <div className={styles.timelineMonth}>Set/2025</div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(1/99*100).toFixed(1)}%`  }} title="Luiz: 1" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(5/99*100).toFixed(1)}%`  }} title="Rafaela: 5" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(2/99*100).toFixed(1)}%`  }} title="Giovanna: 2" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(7/99*100).toFixed(1)}%` }} title="João: 7" />
            </div>
            <div className={styles.timelineTotal}>15</div>
          </div>

          {/* Out/2025 */}
          <div className={styles.timelineRow}>
            <div className={styles.timelineMonth}>Out/2025</div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(34/99*100).toFixed(1)}%` }} title="Luiz: 34" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(19/99*100).toFixed(1)}%` }} title="Rafaela: 19" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(9/99*100).toFixed(1)}%` }} title="Giovanna: 9" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(32/99*100).toFixed(1)}%` }} title="João: 32" />
            </div>
            <div className={styles.timelineTotal}>94</div>
          </div>

          {/* Nov/2025 */}
          <div className={styles.timelineRow}>
            <div className={styles.timelineMonth}>Nov/2025</div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(3/99*100).toFixed(1)}%`  }} title="Luiz: 3" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(9/99*100).toFixed(1)}%` }} title="Rafaela: 9" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(5/99*100).toFixed(1)}%`  }} title="Giovanna: 5" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(9/99*100).toFixed(1)}%` }} title="João: 9" />
            </div>
            <div className={styles.timelineTotal}>26</div>
          </div>

          {/* Mar/2026 — pico */}
          <div className={`${styles.timelineRow} ${styles.timelinePeak}`}>
            <div className={styles.timelineMonth}>
              Mar/2026 <span className={styles.peakBadge}>🔥 Pico</span>
            </div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(52/99*100).toFixed(1)}%` }} title="Luiz: 52" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(26/99*100).toFixed(1)}%` }} title="Rafaela: 26" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(5/99*100).toFixed(1)}%`  }} title="Giovanna: 5" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(16/99*100).toFixed(1)}%`  }} title="João: 16" />
            </div>
            <div className={styles.timelineTotal}>99</div>
          </div>

          {/* Abr/2026 */}
          <div className={styles.timelineRow}>
            <div className={styles.timelineMonth}>Abr/2026</div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(27/99*100).toFixed(1)}%` }} title="Luiz: 27" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(13/99*100).toFixed(1)}%` }} title="Rafaela: 13" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(2/99*100).toFixed(1)}%`  }} title="Giovanna: 2" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(11/99*100).toFixed(1)}%`  }} title="João: 11" />
            </div>
            <div className={styles.timelineTotal}>53</div>
          </div>

        </div>
        <div className={styles.timelineLegend}>
          <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.dotLuiz}`} /> Luiz Reinã</span>
          <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.dotRafaela}`} /> Rafaela Saraiva</span>
          <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.dotGiovanna}`} /> Giovanna Alves</span>
          <span className={styles.legendItem}><span className={`${styles.legendDot} ${styles.dotJoao}`} /> João Pedro</span>
        </div>
      </section>

      {/* ===== RANKING DO TIME & ÁREA DE ATUAÇÃO ===== */}
      <section className={styles.rankingSection}>

        {/* Ranking do time */}
        <div className={styles.rankingCol}>
          <h2 className={styles.rankingTitle}>Destaques do time</h2>
          <div className={styles.rankList}>

            {/* 1st - Luiz Reinã */}
            <div className={`${styles.rankRow} ${styles.rankFirst}`}>
              <div className={styles.rankDecor} />
              <span className={styles.rankNum}>01</span>
              <div className={styles.rankAvatar}>
                <img src="https://i.postimg.cc/GtzBpNns/luiz.jpg" alt="Luiz Reinã" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Luiz Reinã</h4>
                <p className={styles.rankScore}>117 commits · 42,5% do código vivo</p>
              </div>
              <span className={styles.rankBadge}>🥇 Top Coder</span>
            </div>

            {/* 2nd - João Pedro */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>02</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/zvpLfMYH/jao.jpg" alt="João Pedro" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>João Pedro</h4>
                <p className={styles.rankScore}>75 commits · 32,4% do código vivo</p>
              </div>
            </div>

            {/* 3rd - Rafaela Saraiva */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>03</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/sxKB28C7/rafaela.jpg" alt="Rafaela Saraiva" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Rafaela Saraiva</h4>
                <p className={styles.rankScore}>72 commits · 23,5% do código vivo</p>
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
                <p className={styles.rankScore}>23 commits · 1,6% do código vivo</p>
              </div>
            </div>

          </div>
        </div>

        {/* Área de atuação */}
        <div className={styles.focusCol}>
          <h2 className={styles.focusTitle}>Área de atuação</h2>
          <div className={styles.focusList}>

            {/* 1º Luiz */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (21%)</span><span>Frontend (79%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '21%' }} />
                <div className={styles.focusFront} style={{ width: '79%' }} />
              </div>
              <p className={styles.focusCaption}>Luiz Reinã: 25 commits BE · 92 commits FE</p>
            </div>

            {/* 2º Rafaela */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (33%)</span><span>Frontend (67%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '33%' }} />
                <div className={styles.focusFront} style={{ width: '67%' }} />
              </div>
              <p className={styles.focusCaption}>Rafaela Saraiva: 24 commits BE · 48 commits FE</p>
            </div>

            {/* 3º João */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (51%)</span><span>Frontend (49%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '51%' }} />
                <div className={styles.focusFront} style={{ width: '49%' }} />
              </div>
              <p className={styles.focusCaption}>João Pedro: 38 commits BE · 37 commits FE</p>
            </div>

            {/* 4º Giovanna */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (35%)</span><span>Frontend (65%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '35%' }} />
                <div className={styles.focusFront} style={{ width: '65%' }} />
              </div>
              <p className={styles.focusCaption}>Giovanna Alves: 8 commits BE · 15 commits FE</p>
            </div>

          </div>
        </div>

      </section>

    </main>
    <Footer />
    </>
  );
}
