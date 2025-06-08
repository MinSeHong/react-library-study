'use client';
import dynamic from 'next/dynamic';

const Wrapping = dynamic(() => import('./wrapping'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>Wrapping 기능</h1>
      <Wrapping></Wrapping>
    </main>
  );
}