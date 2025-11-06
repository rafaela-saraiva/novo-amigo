// src/components/ConnectionStatus.tsx
'use client';
import { useConnectionTest } from '../hooks/useConnectionTest';

export default function ConnectionStatus() {
  const { testResult, testing, testConnection } = useConnectionTest();

  return (
    <div style={{ 
      position: 'fixed', 
      bottom: '20px', 
      right: '20px', 
      background: 'white', 
      padding: '15px', 
      border: '1px solid #ccc',
      borderRadius: '8px',
      boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
      zIndex: 1000,
      minWidth: '250px'
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
        <strong>Status da Conexão</strong>
        <button 
          onClick={testConnection} 
          disabled={testing}
          style={{ 
            padding: '5px 10px', 
            fontSize: '12px',
            background: testing ? '#ccc' : '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: testing ? 'not-allowed' : 'pointer'
          }}
        >
          {testing ? '🔄' : '🔍'}
        </button>
      </div>
      
      {testResult ? (
        <div style={{ 
          color: testResult.success ? 'green' : '#d63031',
          fontSize: '12px',
          fontWeight: 'bold'
        }}>
          {testResult.message}
        </div>
      ) : (
        <div style={{ color: '#666', fontSize: '12px' }}>
          Clique para testar a conexão
        </div>
      )}
    </div>
  );
}