'use client';

import styles from "./styles.module.css";

export type FeedbackPopupVariant = "success" | "error" | "warning" | "info";
export type FeedbackPopupMode = "alert" | "confirm";

export interface FeedbackPopupState {
  title: string;
  message: string;
  variant?: FeedbackPopupVariant;
  mode?: FeedbackPopupMode;
  buttonLabel?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose?: () => void;
  onConfirm?: () => void;
  onCancel?: () => void;
}

interface FeedbackPopupProps {
  popup: FeedbackPopupState | null;
  onClose: () => void;
}

const iconByVariant: Record<FeedbackPopupVariant, string> = {
  success: "check_circle",
  error: "error",
  warning: "warning",
  info: "info",
};

export default function FeedbackPopup({ popup, onClose }: FeedbackPopupProps) {
  if (!popup) return null;

  const safePopup = popup;
  const variant = safePopup.variant ?? "info";
  const mode = safePopup.mode ?? "alert";

  function handleClose() {
    if (mode === "confirm") {
      safePopup.onCancel?.();
    } else {
      safePopup.onClose?.();
    }
    onClose();
  }

  function handleConfirm() {
    safePopup.onConfirm?.();
    onClose();
  }

  return (
    <div className={styles.overlay} onClick={handleClose}>
      <div
        className={`${styles.modal} ${styles[variant]}`}
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="feedback-popup-title"
      >
        <div className={styles.iconWrap}>
          <span className={`material-symbols-outlined ${styles.icon}`}>
            {iconByVariant[variant]}
          </span>
        </div>

        <div className={styles.content}>
          <h3 id="feedback-popup-title" className={styles.title}>
            {popup.title}
          </h3>
          <p className={styles.message}>{popup.message}</p>
        </div>

        {mode === "confirm" ? (
          <div className={styles.actions}>
            <button className={styles.secondaryButton} onClick={handleClose}>
              {popup.cancelLabel ?? "Cancelar"}
            </button>
            <button className={styles.button} onClick={handleConfirm}>
              {popup.confirmLabel ?? "Confirmar"}
            </button>
          </div>
        ) : (
          <button className={styles.button} onClick={handleClose}>
            {popup.buttonLabel ?? "Entendi"}
          </button>
        )}
      </div>
    </div>
  );
}
