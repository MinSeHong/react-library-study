'use client';
import Header from '@/app/_components/header';
import dynamic from 'next/dynamic';
import styles from '@/app/matter/matter.module.scss';
import CompositesStack from './compositesStack';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>Composites.stack을 이용한 생성</h1>
      <CompositesStack></CompositesStack>
    </div>
  );
}
