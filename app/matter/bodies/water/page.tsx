'use client';
import Header from '@/app/_components/header';
import Water from './water';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>Water 생성 예제</h1>
      <Water></Water>
      </div>
  );
}
