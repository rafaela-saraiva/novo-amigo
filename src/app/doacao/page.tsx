'use client';

import Button from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import TextField from "@/components/TextField";
import { useState } from 'react';
import styles from './styles.module.css';

export default function Doacao() {

  const [valor, setValor] = useState<string | number>('');
  const [nome, setNome] = useState('');
  const [mensagem, setMensagem] = useState('');
  const [carregando, setCarregando] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const pixChave = 'rafaela.saraiva100@hotmail.com';

  async function handleDoar(e: React.FormEvent) {
    e.preventDefault();
    if (!valor) return alert('Por favor, informe um valor de doação.');

    setCarregando(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1200));

      console.log({
        valor,
        nome,
        mensagem,
        pagamento: 'pix',
      });

      setSucesso(true);
      setValor('');
      setNome('');
      setMensagem('');
    } catch {
      alert('Ocorreu um erro. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  }

  // Função para copiar a chave Pix
  const copiarPix = async () => {
    try {
      await navigator.clipboard.writeText(pixChave);
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000); // reseta após 2s
    } catch {
      alert('Não foi possível copiar a chave Pix.');
    }
  };

  return (
    <div className={styles.doacaoContainer}>
      <Header />

      <Card className={styles.doacaoCard}>
        <CardContent>
          <h1 className={styles.titulo}>Faça uma Doação</h1>
          <p className={styles.descricao}>
            Sua contribuição ajuda a manter nossos projetos e apoiar quem mais precisa.
          </p>

          <form onSubmit={handleDoar} className={styles.form}>
            <TextField
              label="Valor da doação (R$)"
              type="text"
              text={String(valor)}
              onChange={(v) => setValor(v)}
              required
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

            {/* parte de pix */}
            <div className={styles.pixBox}>
              <p className={styles.pixInfo}>Escaneie o QR Code abaixo para doar via Pix:</p>
              <img
                src={`https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${pixChave}`}
                alt="QR Code Pix"
                className={styles.qrCode}
              />
              <p className={styles.pixChave}>
                💡 Chave Pix: <strong>{pixChave}</strong>
              </p>
              <Button type="button" onClick={copiarPix}>
                {copiado ? 'Chave copiada ✅' : 'Copiar chave Pix 📋'}
              </Button>
            </div>

            <Button type="submit" loading={carregando}>
              {carregando ? 'Processando...' : 'Confirmar doação 💝'}
            </Button>

            {sucesso && (
              <p className={styles.mensagemSucesso}>
                Obrigado pela sua doação! 💕
              </p>
            )}
          </form>
        </CardContent>
      </Card>
      <Footer/>
    </div>
  );
}
