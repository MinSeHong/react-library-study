// app/page.tsx 또는 다른 페이지에서
import dynamic from 'next/dynamic';
import ThreeScene from './threescene';

export default function HomePage() {
  return (
    <main>
      <h1>Hello Three.js in Next.js!</h1>
      <ThreeScene />
    </main>
  );
}