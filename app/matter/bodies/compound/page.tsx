'use client';
import Header from '@/app/_components/header';
import CompoundStack from './compoundStack';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>CompoundStack 생성</h1>
      <CompoundStack></CompoundStack>
      </div>
  );
}
