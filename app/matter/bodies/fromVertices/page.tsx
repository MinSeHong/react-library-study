'use client';
import Header from '@/app/_components/header';
import BodiesFromVertices from './bodiesFromVertices';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>BodiesFromVertices 생성</h1>
      <BodiesFromVertices></BodiesFromVertices>
    </div>
  );
}
