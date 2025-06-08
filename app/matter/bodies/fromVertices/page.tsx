'use client';
import BodiesFromVertices from './bodiesFromVertices';


export default function HomePage() {
 console.log("부모 컴포넌트 렌더링");
  return (
    <main>
      <h1>BodiesFromVertices SVG 생성</h1>
      <BodiesFromVertices></BodiesFromVertices>
    </main>
  );
}