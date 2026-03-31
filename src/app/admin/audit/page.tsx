'use client';

import { useEffect, useState } from "react";
import api from "@/services/api";

export default function AuditPage() {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    api.get('/audit').then(res => setLogs(res.data));
  }, []);

  return (
    <div>
      <h2>Auditoria 📊</h2>

      {logs.map((log: any, index) => (
        <div key={index}>
          <p>{log.user} - {log.action} - {log.date}</p>
        </div>
      ))}
    </div>
  );
}