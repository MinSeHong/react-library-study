'use client';
import dynamic from 'next/dynamic';

const MouseConstraintEvent = dynamic(() => import('./mouseConstraintEvent'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>마우스 클릭시 Body 색상 변경</h1>
      <MouseConstraintEvent></MouseConstraintEvent>
    </main>
  );
}