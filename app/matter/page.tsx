'use client';
import dynamic from 'next/dynamic';
import Header from '../_components/header';
import styles from '@/app/matter/matter.module.scss';
import MatterCanvas from './matterCanvas';

export default function HomePage() {
  return (
    <div className={styles.layout}>
    <Header/>
      <h1>TypeScript를 이용한 Matter 생성</h1>
      <MatterCanvas/>
    </div>
  );
}