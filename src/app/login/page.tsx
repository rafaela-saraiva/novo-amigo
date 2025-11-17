'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import TextField from '@/components/TextField';
import Header from '@/components/Header';
import styles from './styles.module.css';
import api from '@/services/api';
import Footer from '@/components/Footer';

export default function Login() {
  const auth = useAuth();
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
  
    const success = await auth.login(email, pass); // <- agora funciona
  
    if (success) {
      router.push('/dashboard');
    } else {
      alert("Email ou senha inválidos.");
    }
  }
  

  return (
    <>
      <Header />

      <div className={styles.pageContainer}>
        {/* Lado esquerdo com imagem */}
        <div className={styles.sideLeft}>
          <img
            src="https://i.postimg.cc/TPkhWCZW/AQM7-Zwx-Do-Exc-R1qqbs42-Oefj-Yt-Ql0-Rph38y-OD15-X4-qgwp2sx-TO00gu-Rok-Ip59-Q-rmf-Wfag-X0n-Pic-FUQLqnkr-PLidma5y-Fu-WOxi.jpg"
            alt="Logo Novo Amigo"
            className={styles.sideLeft}
          />
        </div>

        {/* Lado direito com o formulário */}
        <div className={styles.formContainer}>
          <h1 className={styles.titulo}>Login</h1>

          <form className={styles.formCadastrar} onSubmit={handleSubmit}>
            <TextField
              label="E-mail"
              type="email"
              text={email}
              onChange={setEmail}
              required
              autoComplete="email"
            />

            <TextField
              label="Senha"
              type="password"
              text={pass}
              onChange={setPass}
              required
              autoComplete="current-password"
            />

            <button type="submit" className={styles.botaoCadastrar}>
              Entrar
            </button>

            <div className={styles.cadastroLink}>
              Não tem conta?{' '}
              <span>
                <a href="/cadastro">Cadastre aqui</a>
              </span>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}
