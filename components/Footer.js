import React from 'react';
import Link from 'next/link';
import styles from '@/styles/Footer.module.css';
export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>Copyright &copy; DJ Events 2025</p>
      <p>
        <Link href='/about'>About This Project</Link>
      </p>
    </footer>
  );
}
