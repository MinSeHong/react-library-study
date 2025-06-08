'use client';
import dynamic from 'next/dynamic';

const CompositesStack = dynamic(() => import('./compositesStack'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>Composites.stack을 이용한 생성성</h1>
      <CompositesStack></CompositesStack>
    </main>
  );
}