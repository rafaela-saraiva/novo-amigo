'use client';

import TextField from '@/components/TextField';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import styles from './styles.module.css';

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function LoginModal({ open, onClose }: Props) {
  const { login, loginONG } = useAuth();

  const [tipo, setTipo] = useState<'usuario' | 'ong'>('usuario');
  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      if (tipo === 'ong') {
        await loginONG(email, pass);
      } else {
        await login(email, pass);
      }
      setSuccess(true);

      setTimeout(() => {
        setSuccess(false);
        onClose();
      }, 2000);

    } catch (err) {
      alert('Email ou senha invalidos.');
    } finally {
      setLoading(false);
    }
  }

  if (!open) return null;

  if (success) {
    return (
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <div className={styles.successBox}>
            <div className={styles.emoji}>🍆</div>
            <h2 className={styles.successTitle}>Login realizado!</h2>
            <p className={styles.successText}>Bem-vindo de volta</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>x</button>

        <h1 className={styles.titulo}>Login</h1>

        <div className={styles.tipoSwitch}>
          <button
            type='button'
            onClick={() => setTipo('usuario')}
            className={`${styles.tipoBtn} ${tipo === 'usuario' ? styles.tipoBtnActive : ''}`}
          >
            Sou Usuario
          </button>
          <button
            type='button'
            onClick={() => setTipo('ong')}
            className={`${styles.tipoBtn} ${tipo === 'ong' ? styles.tipoBtnActive : ''}`}
          >
            Sou ONG
          </button>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            label='E-mail'
            type='email'
            text={email}
            onChange={setEmail}
            required
          />

          <TextField
            label='Senha'
            type='password'
            text={pass}
            onChange={setPass}
            required
          />

          <button type='submit' className={styles.botao} disabled={loading}>
            {loading ? 'Entrando...' : 'Entrar'}
          </button>

          <div className={styles.cadastroLink}>
            Nao tem conta? <a href='/cadastro'>Cadastre aqui</a>
          </div>
        </form>
      </div>
    </div>
  );
}
