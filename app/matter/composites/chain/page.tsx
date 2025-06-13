'use client';
import Header from '@/app/_components/header';
import dynamic from 'next/dynamic';
import styles from '@/app/matter/matter.module.scss';

const CompositesChain = dynamic(() => import('./compositesChain'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <div className={styles.layout}>
          <Header/>
      <h1>Composites.chain을 이용한 다리 생성</h1>
      <CompositesChain></CompositesChain>
    </div>
  );
}