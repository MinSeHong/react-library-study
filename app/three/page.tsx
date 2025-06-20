// app/page.tsx 또는 다른 페이지에서
import dynamic from 'next/dynamic';
import ThreeScene from './threescene';
import Header from '../_components/header';

export default function HomePage() {
  return (
    <>
      <Header />
      <h1 style={{ textAlign: 'center', paddingTop: '40px' }}>
        Hello Three.js in Next.js!
      </h1>
      <ThreeScene />
    </>
  );
}
