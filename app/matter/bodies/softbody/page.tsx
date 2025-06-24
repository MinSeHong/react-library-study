'use client';
import Header from '@/app/_components/header';
import Cloth from './cloth';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>Cloth Body 생성</h1>
      <Cloth></Cloth>
      </div>
  );
}
