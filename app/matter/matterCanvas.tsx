'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const MatterCanvas: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //Engine//
    //물리 계산을 담당하는 엔진이다.
    //중력, 충돌, 속도, 마찰 같은 물리 법칙에 따른 시뮬레이션 계산을 수행한다.
    const Engine = Matter.Engine;

    //Render//
    //Three js의 Renderer와 같다.
    //Matter.js의 물리 시뮬레이션 결과를 브라우저에 시각적으로 보여주는 역할을 한다.
    const Render = Matter.Render;

    //Runner//
    //시간에 따라 물리 시뮬레이션이 계속되도록 한다. 애니메이션 프레임 루프인 requestAnimationFrame을 내부적으로 사용한다.
    const Runner = Matter.Runner;

    //Bodies//
    //실제로 화면에 나오는 사각형, 원, 다각형 등의 물체를 만드는 도구이다.
    const Bodies = Matter.Bodies;

    //Composite//
    //Composite는 여러 개의 바디를 하나의 그룹으로 묶는 역할을 한다.
    const Composite = Matter.Composite;


    //물리 엔진 인스턴스를 생성한다.
    const engine = Engine.create();


    //시뮬레이션에 등장할 객체(바디)들을 담는 역할을 한다.
    //Bodies를 넣기 위해 Composite.add(world, [Boides])형태로 넣는다.
    const world = engine.world;

    //Matter JS의 Canvas 크기를 지정한다.
    const width = 800;
    const height = 600;


    //시각적 출력을 위한 렌더러를 생성한다.
    const render = Render.create({
      //렌더링 할 DOM요소를 선택한다.
      //즉 return 부분에 있는 div안에 cavnas를 생성한다.
      element: sceneRef.current!,

      //렌더링 할 요소를 선택한다. Matter.Engine.create()의 값을 사용한다.
      engine: engine,

      //기본 속성을 정의한다.
      options: {
        //캔버스의 width, height 설정
        width,
        height,

        //와이어프레임으로 보이게 할지 정의한다. 기본 값은 false이다.
        wireframes: false,

        //canvas의 색상을 설정한다. 색상을 투명하게 하고 싶으면 'transparent'를 넣는다.
        background: '#fafafa',
      },
    });


    //바닥 역할을 하는 사각형을 생성한다.
    //Bodies.rectangle은 Matter에서 기본적으로 제공하는 사각형 물체이다.
    const ground = Bodies.rectangle(width / 2, height, width, 40, {
      //isStatic//
      //물리적으로 움직이지 않게 설정한다.
      isStatic: true,

      //render//
      //렌더링되는 ground의 속성을 정의한다.
      render: { fillStyle: '#333' },
    });


    //박스 역할을 하는 정사각형을 생성한다.
    const box = Bodies.rectangle(400, 0, 80, 80, {
      //restitution//
      //공기 저항을 지정한다. 기본값은 1이고 낮을수록 떨어지는 속도가 줄어든다.
      restitution: 0.5,
      render: { fillStyle: '#3498db' },
    });


    //바닥인 ground와 박스인 box를 world에 생성한다.
    Composite.add(world, [ground, box]);


    //Engine.run//
    // 물리 계산을 시작한다.
    Engine.run(engine);

    //Render.run//
    // 화면에 실제로 렌더링을 하도록한다.
    Render.run(render);


    //Runner는 시간 간격으로 자동 업데이트를 해준다.
    //RequestAnimationFrame 기능이라고 보면 된다.
    const runner = Runner.create();
    Runner.run(runner, engine);

    // 클린업 함수
    return () => {
      Render.stop(render); // 렌더링 중지
      Runner.stop(runner); // 러너 중지
      Composite.clear(engine.world, false); // 월드 내 객체 제거
      Engine.clear(engine); // 엔진 자체 초기화
      render.canvas.remove(); // 캔버스 DOM 제거
      render.textures = {}; // 텍스처 캐시 초기화
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default MatterCanvas;
