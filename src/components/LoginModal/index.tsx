'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import TextField from '@/components/TextField';
import styles from './styles.module.css';

export default function LoginModal({ open, onClose }: any) {
  const { login } = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(email, pass);
      router.push('/dashboard');
      onClose(); // fecha o modal
    } catch (err) {
      alert("Email ou senha inválidos.");
    }
  }

  if (!open) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeBtn} onClick={onClose}>X</button>

        <h1 className={styles.titulo}>Login</h1>

        <form className={styles.form} onSubmit={handleSubmit}>
          <TextField
            label="E-mail"
            type="email"
            text={email}
            onChange={setEmail}
            required
          />

          <TextField
            label="Senha"
            type="password"
            text={pass}
            onChange={setPass}
            required
          />

          <button type="submit" className={styles.botao}>
            Entrar
          </button>

          <div className={styles.cadastroLink}>
            Não tem conta? <a href="/cadastro">Cadastre aqui</a>
          </div>
        </form>
      </div>
    </div>
  );
}
