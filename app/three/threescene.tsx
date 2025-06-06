'use client'; // 필수! Three.js는 브라우저 API를 사용하므로 client component로 지정

import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ThreeScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!mountRef.current) return;

    // 1. Scene 생성
    const scene = new THREE.Scene();

    // 2. Camera 생성
    const camera = new THREE.PerspectiveCamera(
      75, // FOV
      window.innerWidth / window.innerHeight, // Aspect ratio
      0.1, // Near
      1000 // Far
    );
    camera.position.z = 5;

    // 3. Renderer 생성
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 4. Mesh 생성 (기본 큐브)
    const geometry = new THREE.BoxGeometry();
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    const cube = new THREE.Mesh(geometry, material);
    scene.add(cube);

    // 5. 애니메이션 루프
    const animate = () => {
      requestAnimationFrame(animate);

      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      renderer.render(scene, camera);
    };
    animate();

    // 6. 클린업
    return () => {
      mountRef.current?.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ThreeScene;
