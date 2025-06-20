'use client';
import Header from '@/app/_components/header';
import Collision from './collision';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>Collision 생성</h1>
      <Collision></Collision>
      </div>
  );
}
