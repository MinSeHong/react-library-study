'use client';
import dynamic from 'next/dynamic';

const Angular = dynamic(() => import('./angular'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>Angular 기능</h1>
      <Angular></Angular>
    </main>
  );
}