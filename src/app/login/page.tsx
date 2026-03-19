'use client';

import Footer from '@/components/Footer';
import Header from '@/components/Header';
import TextField from '@/components/TextField';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import styles from './styles.module.css';

export default function Login() {
  const { login } = useAuth(); // PEGA A FUNÇÃO CERTA DO CONTEXT
  const router = useRouter();

  const [email, setEmail] = useState('');
  const [pass, setPass] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      await login(email, pass); // USA O LOGIN DO AUTHCONTEXT
      router.push('/dashboard'); 
    } catch (err) {
      alert("Email ou senha inválidos.");
    }
  }

  return (
    <>
      <Header />

      <div className={styles.pageContainer}>

        <div className={styles.sideLeft}>
          <img
            src="https://i.postimg.cc/TPkhWCZW/AQM7-Zwx-Do-Exc-R1qqbs42-Oefj-Yt-Ql0-Rph38y-OD15-X4-qgwp2sx-TO00gu-Rok-Ip59-Q-rmf-Wfag-X0n-Pic-FUQLqnkr-PLidma5y-Fu-WOxi.jpg"
            alt="Logo Novo Amigo"
            className={styles.sideLeft}
          />
        </div>

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