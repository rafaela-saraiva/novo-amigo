'use client';

import React from 'react';
import styles from './styles.module.css';


interface CardProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export function Card({ children, className = '' }: CardProps) {
    return <div className={`card ${className}`}>{children}</div>;
  }
  
  export function CardContent({ children, className = '' }: CardProps) {
    return <div className={`card-content ${className}`}>{children}</div>;
  }