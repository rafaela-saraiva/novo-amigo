'use client';

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    api.get('/messages').then(res => setMessages(res.data));
  }, []);

  return (
    <div>
      <h2>Mensagens 📩</h2>

      {messages.map((msg: any) => (
        <div key={msg.id}>
          <p><strong>{msg.nome}</strong>: {msg.mensagem}</p>
        </div>
      ))}
    </div>
  );
}