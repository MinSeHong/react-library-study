'use client';

import React, { useEffect, useRef } from 'react';
import styles from './page.module.scss';
import Header from '../_components/header';

//흰자를 구성할 점
//원을 만드는 SVG {x,y} 개수를 생성하는 용도이다.
//NUM_POINTS가 많을수록 부드러운 곡선을 생성한다.
const NUM_POINTS = 24;

//기본 흰자 반지름
//흰자의 위 아래 반지름을 설정한다.
//가로는 80, 세로는 60까지 설정을 한다.
const BASE_RADIUS_X = 80;
const BASE_RADIUS_Y = 60;

// 흰자 곡선의 각 점을 위한 속성 추가
// Typescript의 interface을 이용하여 각 NUM_POINTS마다 속성을 추가한다.
interface Point {
  angle: number;  // 기준 원형 각도
  offset: number; // 개별 점의 진동 위상 오프셋
  speed: number;  // 움직임 속도
  amp: number;    // 진동 변수
}

//하나의 계란후라이를 표현하는 클래스 생성
class EggFry {
  center: { x: number; y: number };   // 계란후라이가 생성되는 중심
  velocity: { x: number; y: number }; // 이동 속도 (방향 포함)
  points: Point[] = [];               // 흰자 모양을 구성하는 포인트 속성
  birthTime: number;                  // 생성 시간을 이용해 계란후라이가 애니메이션 형태로 나오게 만듬
  scale = 0;                          // 생성 시점에서 점점 커지도록 하기 위한 크기

  group: SVGGElement;                 // 계란 전체를 담는 svg의 <g> 속성
  path: SVGPathElement;               // 흰자 부분을 나타내는 svg의 <path> 속성
  yolk: SVGCircleElement;             // 노른자를 나타내는 svg의 <circle> 속성



  //생성자
  constructor(x: number, y: number, svg: SVGSVGElement) {
    this.center = { x, y };               // 생성 좌표 설정
    this.birthTime = performance.now();   // 현재 시간 저장

    // 랜덤 속도 설정
    this.velocity = {
      x: (Math.random() - 0.5) * 0.6,
      y: (Math.random() - 0.5) * 0.6,
    };


    // SVG 요소 생성
    this.group = document.createElementNS('http://www.w3.org/2000/svg', 'g');// svg의 g 속성 생성
    this.path = document.createElementNS('http://www.w3.org/2000/svg', 'path');// 흰자로 사용하기 위한 path 생성
    this.path.setAttribute('class', 'white-part');// 흰자 속성으로 사용하기 위해 classname 생성
    this.yolk = document.createElementNS('http://www.w3.org/2000/svg', 'circle');// 노른자 생성
    this.yolk.setAttribute('class', 'yolk');// 노른자 속성으로 사용하기 위해 classname 생성

    // 그룹에 구성 요소 추가
    this.group.appendChild(this.path);
    this.group.appendChild(this.yolk);

    // 그룹을 SVG에 추가
    svg.appendChild(this.group);



    // 진동하는 곡선을 만들기 위해 포인트 초기화
    for (let i = 0; i < NUM_POINTS; i++) {
      const angle = (Math.PI * 2 / NUM_POINTS) * i; // 원형 각도 만들기
      const offset = Math.random() * Math.PI * 2;// 초기 위치 설정
      const speed = 0.6 + Math.random() * 0.5;// 움직임 속도
      const amp = 2 + Math.random() * 4;// 진폭으로 사용하기 위한 변수

      //각 점마다 무작위의 속성을 추가한다.
      this.points.push({ angle, offset, speed, amp });
    }
  }

  // 각 점의 진동 위치 계산
  getWobblePoint(p: Point, t: number, scaleX: number, scaleY: number) {
    const wobble = Math.sin(t * p.speed + p.offset) * p.amp; // 진동 계산
    const x = this.center.x + Math.cos(p.angle) * (scaleX + wobble); // 중심 기준 X
    const y = this.center.y + Math.sin(p.angle) * (scaleY + wobble); // 중심 기준 Y
    return { x, y };
  }

  // 계란을 화면에 그리는 용도
  draw(t: number) {
    const age = t - this.birthTime; // 생성 후 경과 시간
    const growth = Math.min(1, age / 500);// 0.5초 동안 점점 커지기
    this.scale = growth;

    //scale 기능
    const scaleX = BASE_RADIUS_X * growth;
    const scaleY = BASE_RADIUS_Y * growth;

    // 중심 좌표를 움직이도록 한다.
    this.center.x += this.velocity.x;
    this.center.y += this.velocity.y;

    //화면 밖으로 나가지 않게 반사 처리
    const margin = 80;
    const maxX = window.innerWidth - margin;
    const maxY = window.innerHeight - margin;
    if (this.center.x < margin || this.center.x > maxX) {
      this.velocity.x *= -1; // X축 반전
    }
    if (this.center.y < margin || this.center.y > maxY) {
      this.velocity.y *= -1; // Y축 반전
    }

    // 흰자 곡선 경로를 생성한다.
    let d = '';
    for (let i = 0; i < this.points.length; i++) {
      const p1 = this.getWobblePoint(this.points[i], t * 0.005, scaleX, scaleY);
      const p2 = this.getWobblePoint(this.points[(i + 1) % NUM_POINTS], t * 0.005, scaleX, scaleY);
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      // 각 점을 Q 커브로 연결해 부드러운 곡선 만들기
      d += i === 0
        ? `M ${midX} ${midY} `
        : `Q ${p1.x} ${p1.y} ${midX} ${midY} `;
    }
    d += 'Z'; // 경로를 닫는다.

    // 흰자 SVG path 적용
    this.path.setAttribute('d', d);
    this.path.setAttribute('fill', 'white');
    this.path.setAttribute('stroke', '#ccc');
    this.path.setAttribute('stroke-width', '1');
    this.path.setAttribute('filter', 'drop-shadow(0 0 10px rgba(0,0,0,0.1))');

    // 노른자 SVG circle 적용
    this.yolk.setAttribute('cx', this.center.x.toString());
    this.yolk.setAttribute('cy', this.center.y.toString());
    this.yolk.setAttribute('r', (20 * growth).toString());
    this.yolk.setAttribute('fill', '#facc15');
    this.yolk.setAttribute('stroke', '#eab308');
    this.yolk.setAttribute('stroke-width', '1');
    this.yolk.setAttribute('filter', 'drop-shadow(2px 2px 4px rgba(0,0,0,0.2))');
  }
}

// React 컴포넌트 정의
const EggFryCanvas: React.FC = () => {
  const svgRef = useRef<SVGSVGElement | null>(null); // SVG 참조
  const eggsRef = useRef<EggFry[]>([]); // 생성된 계란 리스트 저장용 ref

  useEffect(() => {
    const svg = svgRef.current;
    if (!svg) return;

    // 마우스 클릭 시 계란 생성
    const handleClick = (e: MouseEvent) => {
      const rect = svg.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const egg = new EggFry(x, y, svg);// 새 계란 생성
      eggsRef.current.push(egg);// 배열에 추가
    };

    svg.addEventListener('click', handleClick); // 클릭 이벤트 등록

    // 매 프레임마다 계란들을 draw
    const animate = () => {
      const now = performance.now(); // 현재 시각
      eggsRef.current.forEach((egg) => egg.draw(now)); // 모든 계란 그리기
      requestAnimationFrame(animate); // 다음 프레임 요청
    };

    animate(); // 애니메이션 루프 시작

    //컴포넌트 언마운트
    return () => {
      svg.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <>
      <Header />
      <h1 style={{ textAlign: 'center', left:"0", right:"0",margin:"auto", marginTop: '80px', position:"absolute" }}>
        계란후라이 생성하기
      </h1>
      <svg ref={svgRef} className={styles.svg}></svg>
    </>
  );
};

export default EggFryCanvas;