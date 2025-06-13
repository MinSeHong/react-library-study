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
      <Link href="/react-redux/counter">
          <nav>React-Query</nav>
      </Link>

      <nav>React-Redux</nav>
      <Link href="/matter">
        <nav>Matter JS</nav>
      </Link>
      <nav>Upload</nav>
      <div className={styles.iconBox}>
        <div>
          <a
            href="https://www.notion.so/minsehong/Story-of-Minsehong-2044339956d080119278d19d365a900e?source=copy_link"
            target="_blank"
          >
            <img src="/assets/icons/notion-icon.png" />
          </a>
        </div>
        <div>
          <a href="https://github.com/MinSeHong" target="_blank">
            <img src="/assets/icons/github-icon.svg" />
          </a>
        </div>
      </div>
    </header>
  );
}
