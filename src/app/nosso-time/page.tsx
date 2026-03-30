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
          resgate animal através da tecnologia. Mais de 30k linhas
          movimentadas de código gerando impacto real.
        </p>

        <div className={styles.heroStats}>
          <div className={styles.statItem}>
            <span className={styles.statValue}>22k+</span>
            <span className={styles.statLabel}>Linhas adicionadas</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>234</span>
            <span className={styles.statLabel}>Total de Commits</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>4</span>
            <span className={styles.statLabel}>Devs Fullstack</span>
          </div>
          <div className={styles.statItem}>
            <span className={styles.statValue}>30k+</span>
            <span className={styles.statLabel}>Linhas movimentadas</span>
          </div>
        </div>
      </section>

      {/* ===== ESTATÍSTICAS DO PROJETO ===== */}
      <section className={styles.projectStats}>
        <div className={styles.projectStatGrid}>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>Out/2025</span>
            <span className={styles.projectStatLabel}>Mês de pico</span>
            <span className={styles.projectStatSub}>119 commits em 1 mês — 50,9% do total</span>
          </div>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>77%</span>
            <span className={styles.projectStatLabel}>Foco horário</span>
            <span className={styles.projectStatSub}>12h–17h concentra os commits</span>
          </div>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>Qua &amp; Qui</span>
            <span className={styles.projectStatLabel}>Dias mais produtivos</span>
            <span className={styles.projectStatSub}>75 + 64 commits = 59,4% do total</span>
          </div>
          <div className={styles.projectStatItem}>
            <span className={styles.projectStatValue}>194</span>
            <span className={styles.projectStatLabel}>Linhas/commit (Luiz)</span>
            <span className={styles.projectStatSub}>Maior média de produção do time</span>
          </div>
        </div>
      </section>

      {/* ===== CARDS DOS MEMBROS ===== */}
      <section className={styles.cardsSection}>

        {/* Giovanna Alves */}
        <div className={styles.memberCard}>
          <div className={styles.cardBadge}>Suporte</div>
          <div className={styles.photoWrapper}>
            <img src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg" alt="Giovanna Alves" className={styles.memberPhoto} />
          </div>
          <div className={styles.cardBody}>
            <h3 className={styles.memberName}>Giovanna Alves</h3>
            <p className={styles.memberRole}>Especialista Frontend</p>
            <p className={styles.memberDesc}>
              Atuou nas páginas de favoritos e sobre, com 26 commits e 15 dias
              ativos. Maior commit: seed de dados no backend com 1.673 linhas.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>3,7%</span>
              <span className={styles.percentLabel}>das linhas adicionadas · 26 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>11,1%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '11%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Linhas add.</span><span>3,7%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '4%' }} /></div>
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
              58% dos commits no backend e 44 interações com arquivos críticos.
              31 dias ativos — o membro com mais dias presentes no projeto.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>12,5%</span>
              <span className={styles.percentLabel}>das linhas adicionadas · 67 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>28,6%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '29%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Linhas add.</span><span>12,5%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '13%' }} /></div>
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
              Maior volume de código: 11.518 linhas adicionadas e 81 commits.
              Média de 194 linhas/commit — a mais alta do time.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>52,1%</span>
              <span className={styles.percentLabel}>das linhas adicionadas · 81 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>34,6%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '35%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Linhas add.</span><span>52,1%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '52%' }} /></div>
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
              93 arquivos únicos no frontend e 62 interações com arquivos
              críticos. 29 dias ativos e 7.018 linhas adicionadas ao projeto.
            </p>
            <div className={styles.percentBlock}>
              <span className={styles.percentValue}>31,7%</span>
              <span className={styles.percentLabel}>das linhas adicionadas · 60 commits</span>
            </div>
            <div className={styles.bars}>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Commits</span><span>25,6%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '26%' }} /></div>
              </div>
              <div className={styles.barRow}>
                <div className={styles.barLabels}><span>Linhas add.</span><span>31,7%</span></div>
                <div className={styles.barTrack}><div className={styles.barFill} style={{ width: '32%' }} /></div>
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
                <p className={styles.dashCardSub}>Linhas adicionadas ao projeto</p>
                <h4 className={styles.dashCardTitle}>Volume de código</h4>
              </div>
              <div className={styles.dashCardTotal}>
                22k <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>11.518 · 52,1%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>7.018 · 31,7%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '61%', opacity: 0.8 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>2.763 · 12,5%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '24%', opacity: 0.55 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>819 · 3,7%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFill} style={{ width: '7%', opacity: 0.35 }} /></div>
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
                234 <span className={styles.dashCardTotalLabel}>total</span>
              </div>
            </div>
            <div className={styles.dashRows}>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Luiz Reinã</span><span>81 · 34,6%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '100%', opacity: 1 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>João Pedro</span><span>67 · 28,6%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '83%', opacity: 0.8 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Rafaela Saraiva</span><span>60 · 25,6%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '74%', opacity: 0.65 }} /></div>
              </div>
              <div className={styles.dashRow}>
                <div className={styles.dashRowLabels}><span>Giovanna Alves</span><span>26 · 11,1%</span></div>
                <div className={styles.dashTrack}><div className={styles.dashFillAlt} style={{ width: '32%', opacity: 0.4 }} /></div>
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
              <div className={styles.timelineSegLuiz}    style={{ width: `${(1/119*100).toFixed(1)}%`  }} title="Luiz: 1" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(7/119*100).toFixed(1)}%`  }} title="Rafaela: 7" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(2/119*100).toFixed(1)}%`  }} title="Giovanna: 2" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(10/119*100).toFixed(1)}%` }} title="João: 10" />
            </div>
            <div className={styles.timelineTotal}>20</div>
          </div>

          {/* Out/2025 — pico */}
          <div className={`${styles.timelineRow} ${styles.timelinePeak}`}>
            <div className={styles.timelineMonth}>
              Out/2025 <span className={styles.peakBadge}>🔥 Pico</span>
            </div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(39/119*100).toFixed(1)}%` }} title="Luiz: 39" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(25/119*100).toFixed(1)}%` }} title="Rafaela: 25" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(12/119*100).toFixed(1)}%` }} title="Giovanna: 12" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(43/119*100).toFixed(1)}%` }} title="João: 43" />
            </div>
            <div className={styles.timelineTotal}>119</div>
          </div>

          {/* Nov/2025 */}
          <div className={styles.timelineRow}>
            <div className={styles.timelineMonth}>Nov/2025</div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(4/119*100).toFixed(1)}%`  }} title="Luiz: 4" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(12/119*100).toFixed(1)}%` }} title="Rafaela: 12" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(9/119*100).toFixed(1)}%`  }} title="Giovanna: 9" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(12/119*100).toFixed(1)}%` }} title="João: 12" />
            </div>
            <div className={styles.timelineTotal}>37</div>
          </div>

          {/* Mar/2026 */}
          <div className={styles.timelineRow}>
            <div className={styles.timelineMonth}>Mar/2026</div>
            <div className={styles.timelineBarWrap}>
              <div className={styles.timelineSegLuiz}    style={{ width: `${(37/119*100).toFixed(1)}%` }} title="Luiz: 37" />
              <div className={styles.timelineSegRafaela} style={{ width: `${(16/119*100).toFixed(1)}%` }} title="Rafaela: 16" />
              <div className={styles.timelineSegGiovanna}style={{ width: `${(3/119*100).toFixed(1)}%`  }} title="Giovanna: 3" />
              <div className={styles.timelineSegJoao}   style={{ width: `${(2/119*100).toFixed(1)}%`  }} title="João: 2" />
            </div>
            <div className={styles.timelineTotal}>58</div>
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
                <p className={styles.rankScore}>81 commits · 52,1% das linhas add.</p>
              </div>
              <span className={styles.rankBadge}>🥇 Top Coder</span>
            </div>

            {/* 2nd - Rafaela Saraiva */}
            <div className={styles.rankRow}>
              <span className={`${styles.rankNum} ${styles.rankNumMuted}`}>02</span>
              <div className={`${styles.rankAvatar} ${styles.rankAvatarSm}`}>
                <img src="https://i.postimg.cc/sxKB28C7/rafaela.jpg" alt="Rafaela Saraiva" />
              </div>
              <div className={styles.rankInfo}>
                <h4 className={styles.rankName}>Rafaela Saraiva</h4>
                <p className={styles.rankScore}>60 commits · 31,7% das linhas add.</p>
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
                <p className={styles.rankScore}>67 commits · 12,5% das linhas add.</p>
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
                <p className={styles.rankScore}>26 commits · 3,7% das linhas add.</p>
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
              <div className={styles.focusBarLabels}><span>Backend (19%)</span><span>Frontend (81%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '19%' }} />
                <div className={styles.focusFront} style={{ width: '81%' }} />
              </div>
              <p className={styles.focusCaption}>Luiz Reinã: 15 commits BE · 66 commits FE</p>
            </div>

            {/* 2º Rafaela */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (30%)</span><span>Frontend (70%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '30%' }} />
                <div className={styles.focusFront} style={{ width: '70%' }} />
              </div>
              <p className={styles.focusCaption}>Rafaela Saraiva: 18 commits BE · 42 commits FE</p>
            </div>

            {/* 3º João */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (58%)</span><span>Frontend (42%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '58%' }} />
                <div className={styles.focusFront} style={{ width: '42%' }} />
              </div>
              <p className={styles.focusCaption}>João Pedro: 39 commits BE · 28 commits FE</p>
            </div>

            {/* 4º Giovanna */}
            <div className={styles.focusItem}>
              <div className={styles.focusBarLabels}><span>Backend (27%)</span><span>Frontend (73%)</span></div>
              <div className={styles.focusTrack}>
                <div className={styles.focusBack} style={{ width: '27%' }} />
                <div className={styles.focusFront} style={{ width: '73%' }} />
              </div>
              <p className={styles.focusCaption}>Giovanna Alves: 7 commits BE · 19 commits FE</p>
            </div>

          </div>
        </div>

      </section>

    </main>
    <Footer />
    </>
  );
}
