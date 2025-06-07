'use client';
import dynamic from 'next/dynamic';

const MatterCanvas = dynamic(() => import('./matterCanvas'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main>
      <h1>Matter.js in Next.js + TypeScript</h1>
      <MatterCanvas></MatterCanvas>
    </main>
  );
}