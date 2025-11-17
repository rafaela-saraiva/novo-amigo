'use client';
import { createContext, useState, useEffect, ReactNode } from 'react';
import { jwtDecode } from 'jwt-decode';
import api from '@/services/api';

type JwtPayload = {
  sub: string;
  name: string;
  email: string;
};

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  login(email: string, senha: string): Promise<void>;
  logout(): void;
  isAuthenticated: boolean;
};

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [user, setUser] = useState<User | null>(null);

  // ✅ restaura login ao recarregar
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwtDecode<JwtPayload>(token);
        setUser({
          id: decoded.sub,
          name: decoded.name,
          email: decoded.email,
        });
      } catch (err) {
        console.error('Token inválido ou expirado:', err);
        localStorage.removeItem('token');
      }
    }
  }, []);

  // ✅ login com persistência
  async function login(email: string, password: string): Promise<void> {
    try {
      const res = await api.post('/user/login', {
        email,
        pass: password
      });
      const token = res.data.token;
  
      localStorage.setItem('token', token);
  
      const decoded = jwtDecode<JwtPayload>(token);
      setUser({
        id: decoded.sub,
        name: decoded.name,
        email: decoded.email,
      });
    } catch (err) {
      alert('Credenciais inválidas.');
      throw err;
    }
  }
  

  function logout(): void {
    localStorage.removeItem('token');
    setUser(null);
    window.location.href = '/'; // ✅ volta pra home
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  );
}
