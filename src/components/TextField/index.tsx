'use client';
import { useState, ChangeEvent } from 'react';
import styles from './styles.module.css';

type Props = {
  label: string;
  type?: 'text' | 'email' | 'senha';
  text?: string;
  required?: boolean;
  autoComplete?: string;
  multiline?: boolean;
  onChange?(texto: string): void;
};

export default function TextField({
  label,
  type = 'text',
  text = '',
  required = false,
  autoComplete,
  multiline = false,
  onChange,
}: Props) {
  // Permite uso controlado (com prop text) ou não controlado (interno)
  const [valor, setValor] = useState(text);

  function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    const novoTexto = e.target.value;
    setValor(novoTexto);
    if (onChange) onChange(novoTexto);
  }

  const value = onChange ? text : valor;

  return (
    <span className={styles.root}>
      <label>
        <span className={styles.label}>{label}:</span>
        {multiline ? (
          <textarea
            placeholder={label}
            value={value}
            onChange={handleChange}
            required={required}
            autoComplete={autoComplete}
          />
        ) : (
          <input
            type={type}
            placeholder={label}
            value={value}
            onChange={handleChange}
            required={required}
            autoComplete={autoComplete}
          />
        )}
      </label>
    </span>
  );
}
