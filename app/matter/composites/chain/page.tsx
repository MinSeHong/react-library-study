'use client';
import dynamic from 'next/dynamic';

const CompositesChain = dynamic(() => import('./compositesChain'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>Composites.chain을 이용한 다리 생성</h1>
      <CompositesChain></CompositesChain>
    </main>
  );
}