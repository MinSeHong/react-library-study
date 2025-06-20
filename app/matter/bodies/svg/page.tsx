'use client';
import Header from '@/app/_components/header';
import SvgPathToVertices from './svgPathToVertices';
import styles from '@/app/matter/matter.module.scss';

export default function HomePage() {
  return (
    <div className={styles.layout}>
      <Header />
      <h1>SvgPathToVertices 생성</h1>
      <SvgPathToVertices></SvgPathToVertices>
    </div>
  );
}
