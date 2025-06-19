'use clinet';
import { useEffect, useRef } from 'react';
import styles from './header.module.scss';
import Link from 'next/link';

type HeaderProps = {
  onMenuClick: (section: string) => void;
};

export default function Header() {

  return (
    <header className={styles.header}>

      <div className={styles.localNavigation}>
        <Link href="/upload">
          <nav>Upload</nav>
        </Link>
      </div>


      <div className={styles.localNavigation}>
        <nav>React-Redux</nav>
        <Link href="/react-redux/counter">
          <nav className={styles.subNavigation}>Counter</nav>
        </Link>
      </div>

      <div className={styles.localNavigation}>
        <nav>React-Query</nav>
        <Link href="/react-query/get">
          <nav className={styles.subNavigation}>Get</nav>
        </Link>
        <Link href="/react-query/post">
          <nav className={styles.subNavigation}>Post</nav>
        </Link>
      </div>

      <div className={styles.localNavigation}>
        <Link href="/matter">
          <nav>Matter.js</nav>
        </Link>
        <Link href="/matter/mouse-constraint">
          <nav className={styles.subNavigation}>Mouse</nav>
        </Link>
        <Link href="/matter/mouse-constraint/event">
          <nav className={styles.subNavigation}>Event</nav>
        </Link>
        <Link href="/matter/composite">
          <nav className={styles.subNavigation}>Composite</nav>
        </Link>
        <Link href="/matter/composite/stack">
          <nav className={styles.subNavigation}>Stack</nav>
        </Link>
        <Link href="/matter/composite/chain">
          <nav className={styles.subNavigation}>Chain</nav>
        </Link>
        <Link href="/matter/composite/angular">
          <nav className={styles.subNavigation}>Angular</nav>
        </Link>
        <Link href="/matter/composite/wrapping">
          <nav className={styles.subNavigation}>Wrapping</nav>
        </Link>
        <Link href="/matter/composite/slingshot">
          <nav className={styles.subNavigation}>SlingShot</nav>
        </Link>
      </div>

      <div className={styles.localNavigation}>
        <Link href="/three">
          <nav>Three.js</nav>
        </Link>
      </div>
    </header>
  );
}
