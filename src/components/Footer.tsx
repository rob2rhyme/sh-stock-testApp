import React from 'react';
import styles from '../styles/Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <span>© {currentYear} | Made for Smokers Haven by </span>
        <a 
          href="https://github.com/rob2rhyme/sh-stock-tracking/tree/main/src/data" 
          target="_blank" 
          rel="noopener noreferrer"
          className={styles.link}
        >
          Robin Thapa
        </a>
      </div>
    </footer>
  );
};

export default Footer;