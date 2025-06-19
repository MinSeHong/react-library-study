'use client';
import Header from '@/app/_components/header';
import dynamic from 'next/dynamic';
import styles from '@/app/matter/matter.module.scss';
import Slingshot from './slingshot';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header/>
      <main style={{display:"flex", flexDirection:"column", alignItems:"center",justifyItems:"center"}}>
        <h1 style={{color:"black"}}>앵그리버드 만들기</h1>
        <Slingshot></Slingshot>
      </main>
    </div>
  );
}