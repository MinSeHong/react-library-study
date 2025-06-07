'use client';
import dynamic from 'next/dynamic';

const MouseConstraint = dynamic(() => import('./mouseConstraint'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>마우스 드래그 기능 추가</h1>
      <MouseConstraint></MouseConstraint>
    </main>
  );
}