"use client";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import styles from "./styles.module.css";

export default function SobreNos() {
  return (
    <>
      <Header />

      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBadge}>
            <span className="material-symbols-outlined">favorite</span>
            Nossa História
          </div>

          <h1 className={styles.heroTitle}>
            Conectando Corações,
            <br />
            <span className={styles.heroHighlight}>Transformando Vidas</span>
          </h1>

          <p className={styles.heroSub}>
            Há mais de 5 anos, o Novo Amigo nasceu da paixão por animais e da
            crença de que cada pet merece um lar cheio de amor. Somos a ponte
            entre animais abandonados e famílias que estão prontas para amar.
          </p>

          <div className={styles.heroStats}>
            <div className={styles.statItem}>
              <span className={styles.statValue}>500+</span>
              <span className={styles.statLabel}>Adoções</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>50+</span>
              <span className={styles.statLabel}>ONGs Parceiras</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>1000+</span>
              <span className={styles.statLabel}>Vidas Salvas</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statValue}>95%</span>
              <span className={styles.statLabel}>Taxa Sucesso</span>
            </div>
          </div>
        </section>

        {/* Estatísticas do Projeto */}
        <section className={styles.projectStats}>
          <div className={styles.projectStatGrid}>
            <div className={styles.projectStatItem}>
              <span className={styles.projectStatValue}>5+</span>
              <span className={styles.projectStatLabel}>Anos de atuação</span>
              <span className={styles.projectStatSub}>
                Desde 2019 transformando vidas
              </span>
            </div>
            <div className={styles.projectStatItem}>
              <span className={styles.projectStatValue}>São Paulo</span>
              <span className={styles.projectStatLabel}>Base principal</span>
              <span className={styles.projectStatSub}>
                Expansão para todo Brasil
              </span>
            </div>
            <div className={styles.projectStatItem}>
              <span className={styles.projectStatValue}>24/7</span>
              <span className={styles.projectStatLabel}>Atendimento</span>
              <span className={styles.projectStatSub}>
                Sempre prontos para ajudar
              </span>
            </div>
            <div className={styles.projectStatItem}>
              <span className={styles.projectStatValue}>100%</span>
              <span className={styles.projectStatLabel}>Transparente</span>
              <span className={styles.projectStatSub}>
                Relatórios mensais detalhados
              </span>
            </div>
          </div>
        </section>

        {/* Nossa Equipe */}
        <section className={styles.cardsSection}>
          {/* Giovanna Alves */}
          <div className={styles.memberCard}>
            <div className={styles.cardBadge}>Suporte</div>
            <div className={styles.photoWrapper}>
              <Image
                src="https://i.postimg.cc/7hXCLcr2/guiovana.jpg"
                alt="Giovanna Alves"
                className={styles.memberPhoto}
                width={400}
                height={500}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.memberName}>Giovanna Alves</h3>
              <p className={styles.memberRole}>Especialista Frontend</p>
              <p className={styles.memberDesc}>
                Responsável pelo desenvolvimento das interfaces do usuário,
                focando em páginas de favoritos e informações sobre o projeto.
              </p>
            </div>
          </div>

          {/* João Pedro */}
          <div className={styles.memberCard}>
            <div className={styles.cardBadge}>Backend Specialist</div>
            <div className={styles.photoWrapper}>
              <Image
                src="https://i.postimg.cc/zvpLfMYH/jao.jpg"
                alt="João Pedro"
                className={styles.memberPhoto}
                width={400}
                height={500}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.memberName}>João Pedro</h3>
              <p className={styles.memberRole}>Fullstack, Lead Backend</p>
              <p className={styles.memberDesc}>
                Líder do desenvolvimento backend, responsável pela arquitetura
                do servidor, APIs e integração com banco de dados.
              </p>
            </div>
          </div>

          {/* Rafaela Saraiva */}
          <div className={styles.memberCard}>
            <div className={styles.cardBadge}>UI & Frontend Lead</div>
            <div className={styles.photoWrapper}>
              <Image
                src="https://i.postimg.cc/sxKB28C7/rafaela.jpg"
                alt="Rafaela Saraiva"
                className={styles.memberPhoto}
                width={400}
                height={500}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.memberName}>Rafaela Saraiva</h3>
              <p className={styles.memberRole}>Dev Full Stack, UI Lead</p>
              <p className={styles.memberDesc}>
                Líder de interface do usuário, responsável pelo design e
                implementação das experiências visuais do projeto.
              </p>
            </div>
          </div>

          {/* Luiz Reinã */}
          <div className={styles.memberCard}>
            <div className={styles.cardBadge}>Fullstack Core</div>
            <div className={styles.photoWrapper}>
              <Image
                src="https://i.postimg.cc/GtzBpNns/luiz.jpg"
                alt="Luiz Reinã"
                className={styles.memberPhoto}
                width={400}
                height={500}
              />
            </div>
            <div className={styles.cardBody}>
              <h3 className={styles.memberName}>Luiz Reinã</h3>
              <p className={styles.memberRole}>Engenheiro Fullstack</p>
              <p className={styles.memberDesc}>
                Desenvolvedor fullstack responsável pela implementação das
                funcionalidades principais e arquitetura do sistema.
              </p>
            </div>
          </div>
        </section>

        {/* Missão e Valores */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Nossa Missão</h2>
              <p className={styles.sectionSubtitle}>
                Trabalhamos incansavelmente para criar um mundo onde nenhum
                animal fique sem lar
              </p>
            </div>

            <div className={styles.missionGrid}>
              <div className={styles.missionCard}>
                <div className={styles.cardIcon}>
                  <span className="material-symbols-outlined">
                    volunteer_activism
                  </span>
                </div>
                <h3>Resgate e Cuidados</h3>
                <p>
                  Trabalhamos em parceria com ONGs e protetores independentes
                  para resgatar, cuidar e preparar animais para adoção
                  responsável.
                </p>
              </div>

              <div className={styles.missionCard}>
                <div className={styles.cardIcon}>
                  <span className="material-symbols-outlined">
                    connect_without_contact
                  </span>
                </div>
                <h3>Conexão Perfeita</h3>
                <p>
                  Utilizamos tecnologia e empatia para conectar cada animal com
                  a família ideal, considerando personalidade, estilo de vida e
                  necessidades especiais.
                </p>
              </div>

              <div className={styles.missionCard}>
                <div className={styles.cardIcon}>
                  <span className="material-symbols-outlined">school</span>
                </div>
                <h3>Educação e Conscientização</h3>
                <p>
                  Promovemos campanhas de conscientização sobre posse
                  responsável, castração e bem-estar animal em toda a
                  comunidade.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Valores */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Nossos Valores</h2>
              <p className={styles.sectionSubtitle}>
                Princípios que guiam cada decisão e ação nossa
              </p>
            </div>

            <div className={styles.valuesGrid}>
              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <span className="material-symbols-outlined">favorite</span>
                </div>
                <h3>Compaixão</h3>
                <p>
                  Agimos com empatia e cuidado por todos os animais,
                  reconhecendo que cada vida importa.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <span className="material-symbols-outlined">groups</span>
                </div>
                <h3>Comunidade</h3>
                <p>
                  Construímos uma rede de apoio entre adotantes, voluntários,
                  ONGs e amantes de animais.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <span className="material-symbols-outlined">verified</span>
                </div>
                <h3>Transparência</h3>
                <p>
                  Mantemos total transparência em nossos processos, parcerias e
                  uso de recursos.
                </p>
              </div>

              <div className={styles.valueCard}>
                <div className={styles.valueIcon}>
                  <span className="material-symbols-outlined">eco</span>
                </div>
                <h3>Sustentabilidade</h3>
                <p>
                  Promovemos adoções responsáveis e trabalhamos para reduzir o
                  abandono de animais.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Impacto */}
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.sectionHeader}>
              <h2 className={styles.sectionTitle}>Nosso Impacto</h2>
              <p className={styles.sectionSubtitle}>
                Resultados que nos orgulham e motivam a continuar
              </p>
            </div>

            <div className={styles.impactGrid}>
              <div className={styles.impactCard}>
                <div className={styles.impactNumber}>500+</div>
                <div className={styles.impactLabel}>Adoções Realizadas</div>
                <div className={styles.impactDescription}>
                  Famílias felizes formadas através do nosso trabalho
                </div>
              </div>

              <div className={styles.impactCard}>
                <div className={styles.impactNumber}>50+</div>
                <div className={styles.impactLabel}>ONGs Parceiras</div>
                <div className={styles.impactDescription}>
                  Instituições que confiam no nosso trabalho conjunto
                </div>
              </div>

              <div className={styles.impactCard}>
                <div className={styles.impactNumber}>95%</div>
                <div className={styles.impactLabel}>Taxa de Sucesso</div>
                <div className={styles.impactDescription}>
                  Adoções que permanecem estáveis após 6 meses
                </div>
              </div>

              <div className={styles.impactCard}>
                <div className={styles.impactNumber}>1000+</div>
                <div className={styles.impactLabel}>Vidas Salvas</div>
                <div className={styles.impactDescription}>
                  Animais resgatados e cuidados até encontrarem um lar
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.ctaSection}>
          <div className={styles.container}>
            <div className={styles.ctaContent}>
              <h2>Faça Parte Desta Missão</h2>
              <p>
                Seja você adotando um pet, se voluntariando ou apoiando
                financeiramente, cada contribuição faz a diferença na vida de um
                animal.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/nossos-animais" className={styles.ctaPrimary}>
                  <span className="material-symbols-outlined">pets</span>
                  Adotar Agora
                </Link>
                <Link href="/fale-conosco" className={styles.ctaSecondary}>
                  <span className="material-symbols-outlined">
                    contact_support
                  </span>
                  Fale Conosco
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
