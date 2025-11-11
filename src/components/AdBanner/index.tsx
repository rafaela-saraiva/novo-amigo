'use client';

import { useEffect } from 'react';
import styles from './styles.module.css';

interface AdBannerProps {
  position: 'left' | 'right';
}

export default function AdBanner({ position }: AdBannerProps) {
  useEffect(() => {
    try {
      // Aguarda o script do AdSense carregar
      const loadAds = () => {
        // @ts-expect-error - AdSense global
        if (typeof window !== 'undefined' && window.adsbygoogle) {
          // @ts-expect-error - AdSense script
          (window.adsbygoogle = window.adsbygoogle || []).push({});
          // @ts-expect-error - AdSense script
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        }
      };

      // Delay para garantir que o script carregou
      const timer = setTimeout(loadAds, 300);
      return () => clearTimeout(timer);
    } catch (err) {
      console.log('AdSense error:', err);
    }
  }, []);

  return (
    <div className={`${styles.adContainer} ${position === 'left' ? styles.left : styles.right}`}>
      {/* Banner Grande - Google AdSense (teste 2) */}
      <div className={styles.adContent}>
        <span className={styles.adLabel}>AD</span>
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3232590255400417"
          data-ad-slot="4708495259"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
      
      {/* Banner Médio - Google AdSense (teste 2) */}
      <div className={styles.adContent}>
        <span className={styles.adLabel}>AD</span>
        <ins 
          className="adsbygoogle"
          style={{ display: 'block' }}
          data-ad-client="ca-pub-3232590255400417"
          data-ad-slot="4708495259"
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </div>
  );
}
