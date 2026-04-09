import styles from "./LoadingState.module.css";

interface LoadingStateProps {
  title?: string;
  subtitle?: string;
  /** "page" = centralizado, grande | "inline" = compacto, dentro de seção */
  variant?: "page" | "inline";
}

export default function LoadingState({
  title = "Carregando...",
  subtitle,
  variant = "page",
}: LoadingStateProps) {
  return (
    <div className={`${styles.wrap} ${variant === "inline" ? styles.inline : styles.page}`}>
      <div className={styles.spinner}>
        <span className="material-symbols-outlined">sync</span>
      </div>
      <p className={styles.title}>{title}</p>
      {subtitle && <p className={styles.subtitle}>{subtitle}</p>}
    </div>
  );
}
