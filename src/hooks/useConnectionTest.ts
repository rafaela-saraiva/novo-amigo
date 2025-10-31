// src/hooks/useConnectionTest.ts
'use client';
import { useState } from 'react';
import { animalService } from '@/services/animalService';

export function useConnectionTest() {
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [testing, setTesting] = useState(false);

  const testConnection = async () => {
    setTesting(true);
    setTestResult(null);
    
    try {
      const result = await animalService.testConnection();
      setTestResult(result);
    } catch (error) {
      setTestResult({
        success: false,
        message: '❌ Erro inesperado no teste de conexão'
      });
    } finally {
      setTesting(false);
    }
  };

  return {
    testResult,
    testing,
    testConnection
  };
}