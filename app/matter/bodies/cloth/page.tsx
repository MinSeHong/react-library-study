'use client';
import Header from '@/app/_components/header';
import Cloth from './cloth';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>Cloth 생성 예제</h1>
      <Cloth></Cloth>
      </div>
  );
}
