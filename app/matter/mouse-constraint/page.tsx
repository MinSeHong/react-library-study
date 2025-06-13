'use client';
import Header from '@/app/_components/header';
import dynamic from 'next/dynamic';
import styles from '@/app/matter/matter.module.scss';
import MouseConstraint from './mouseConstraint';


export default function HomePage() {
  return (
    <div className={styles.layout}>
        <Header/>
      <h1>마우스 드래그 기능</h1>
      <MouseConstraint></MouseConstraint>
    </div>
  );
}