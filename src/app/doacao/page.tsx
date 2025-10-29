'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Button from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import Header from "@/components/Header";
import TextField from "@/components/TextField";
import styles from './styles.module.css';

export default function Doacao() {
  const router = useRouter();

  const [valor, setValor] = useState<string | number>('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  async function handleDoar(e: React.FormEvent) {
    e.preventDefault();
    if (!valor) return alert('Por favor, informe um valor de doação.');

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));
      setSucesso(true);
      setValor('');
      setNome('');
      setMensagem('');
    } catch (err) {
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  return (
    <div className={styles.doacaoContainer}>
      <Header />

      <Card className={styles.doacaoCard}>
        <CardContent>
          <h1 className={styles.titulo}>💖 Faça uma Doação</h1>
          <p className={styles.descricao}>
            Sua contribuição ajuda a manter nossos projetos e apoiar quem mais precisa.
          </p>

          <form onSubmit={handleDoar} className={styles.form}>
            <TextField
              label="Valor da doação (R$)"
              type="number"
              text={valor}
              onChange={setValor}
              required
              autoComplete="off"
            />

            <TextField
              label="Seu nome (opcional)"
              text={nome}
              onChange={setNome}
            />

            <TextField
              label="Mensagem (opcional)"
              text={mensagem}
              onChange={setMensagem}
              multiline
            />

            <Button type="submit" loading={carregando}>
              {carregando ? 'Processando...' : 'Doar agora 💝'}
            </Button>

            {sucesso && (
              <p className={styles.mensagemSucesso}>
                Obrigado pela sua doação! 💕
              </p>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
