'use client';
import Header from '@/app/_components/header';
import dynamic from 'next/dynamic';
import styles from '@/app/matter/matter.module.scss';
import Angular from './angular';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>Angular 기능</h1>
      <Angular></Angular>
    </div>
  );
}
