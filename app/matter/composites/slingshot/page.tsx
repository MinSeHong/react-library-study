'use client';
import dynamic from 'next/dynamic';

const Slingshot = dynamic(() => import('./slingshot'), {
  ssr: false,
});


export default function HomePage() {
  return (
    <main style={{display:"flex", flexDirection:"column", alignItems:"center",justifyItems:"center"}}>
      <h1 style={{color:"black"}}>Slingshot</h1>
      <Slingshot></Slingshot>
    </main>
  );
}