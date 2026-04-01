'use client';

import TextField from '@/components/TextField';
import { useAuth } from '@/contexts/AuthContext';
import { useState } from 'react';
import styles from './styles.module.css';

export default function LoginModal({ open, onClose }: any) {
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
          <div style={{ textAlign: 'center', padding: '40px' }}>
            <div style={{ fontSize: '55px', marginBottom: '15px' }}>🍆</div>
            <h2 style={{ color: '#fb7084' }}>Login realizado!</h2>
            <p style={{ opacity: 0.7 }}>Bem-vindo de volta</p>
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

        <div style={{ display: 'flex', gap: '8px', marginBottom: '20px' }}>
          <button
            type='button'
            onClick={() => setTipo('usuario')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: tipo === 'usuario' ? '2px solid var(--primary, #fb7084)' : '2px solid #ccc',
              background: tipo === 'usuario' ? 'var(--primary, #fb7084)' : 'transparent',
              color: tipo === 'usuario' ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontWeight: 600
            }}
          >
            Sou Usuario
          </button>
          <button
            type='button'
            onClick={() => setTipo('ong')}
            style={{
              flex: 1,
              padding: '10px',
              borderRadius: '8px',
              border: tipo === 'ong' ? '2px solid var(--primary, #fb7084)' : '2px solid #ccc',
              background: tipo === 'ong' ? 'var(--primary, #fb7084)' : 'transparent',
              color: tipo === 'ong' ? '#fff' : 'inherit',
              cursor: 'pointer',
              fontWeight: 600
            }}
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
