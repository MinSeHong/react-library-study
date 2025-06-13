'use client';
import Header from '@/app/_components/header';
import dynamic from 'next/dynamic';
import styles from '@/app/matter/matter.module.scss';

const MouseConstraintEvent = dynamic(() => import('./mouseConstraintEvent'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header/>
      <h1>마우스 클릭시 Bodies 색상 변경</h1>
      <MouseConstraintEvent></MouseConstraintEvent>
    </div>
  );
}