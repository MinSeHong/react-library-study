'use client';

import React, { useEffect, useRef } from 'react';
import Matter, { Common, Composites, Constraint } from 'matter-js';

const CompositesChain: React.FC = () => {
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

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 추가된 내용 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//
    //Events//
    //물리 엔진 내부에서 발생하는 다양한 사건(예: 충돌, 업데이트, 마우스 클릭 등)을 감지하고,
    // 콜백 함수를 등록해 원하는 동작을 실행할 수 있게 해준다.
    const Events = Matter.Events;
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

    //Mouse//
    //마우스를 이용해 조작할 수 있는 기능을 제공한다.
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

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

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 추가된 내용 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//
    //Matter.Body.nextGroup(true);//
    //음수 그룹 ID를 생성한다.
    //그룹 ID가 음수이면 서로 충돌하지 않고, 양수이면 서로 충돌하게 된다.
    //Chain으로 Boxes 연결 했을 때, 서로 충돌하지 않도록 하기 위해서 사용해야한다.
    const group: number = Matter.Body.nextGroup(true);

    //[1] Composties.stack을 이용해서 1행 15열의 Box를 생성한다.
    var boxes = Composites.stack(
      160,
      290,
      15,
      1,
      0,
      0,
      function (x: number, y: number) {
        return Bodies.rectangle(x - 20, y, 53, 20, {
          collisionFilter: { group: group },
          density: 0.005,
          chamfer: { radius: 5 },
          frictionAir: 0.05,
          render: {
            strokeStyle: 'black',
            lineWidth: 2,
          },
        });
      }
    );

    //[2] Composties.stack으로 생성한 Box 사이에 Chain을 세팅한다.
    //인자의 순서에 따라
    //boxes 배열을 가져온다.
    // 0.3, 0 //
    // 바디의 오른쪽 끝 근처 (x = 0.3, y = 0)를 기준으로 연결한다.
    // -0.3, 0 //
    //다음 바디의 왼쪽 끝 근처 (x = -0.3, y = 0)를 기준으로 연결한다.
    Composites.chain(boxes, 0.3, 0, -0.3, 0, {
      stiffness: 0.99,
      length: 0.0001,
      render: {
        visible: false,
      },
    });
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

    //Composites.stack//
    //Bodies를 여러개 쌓는 역할을 한다//

    //인자는 다음과 같이 되어있다.//
    //Composites.stack(x, y, columns, rows, columnGap, rowGap, callback)//
    var stack = Composites.stack(
      250,
      50,
      6,
      3,
      0,
      0,
      function (x: number, y: number) {
        return Bodies.rectangle(x, y, 50, 50, {
          chamfer: { radius: 5 },
          render: {
            strokeStyle: 'black',
            lineWidth: 2,
          },
        });
      }
    );

    Composite.add(world, [
      boxes,
      stack,
      Bodies.rectangle(30, 490, 220, 380, {
        isStatic: true,
        chamfer: { radius: 20 },
        render: {
          fillStyle: 'green',
          strokeStyle: 'black',
          lineWidth: 2,
        },
      }),
      Bodies.rectangle(770, 490, 220, 380, {
        isStatic: true,
        chamfer: { radius: 20 },
        render: {
          fillStyle: 'green',
          strokeStyle: 'black',
          lineWidth: 2,
        },
      }),
      //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 추가된 내용 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//
      //Constraint.create//
      //바디와 바디, 또는 바디와 월드의 점을 스프링처럼 연결해준다.
      Constraint.create({
        pointA: { x: 140, y: 300 }, // 고정 지점을 지정한다.
        bodyB: boxes.bodies[0], // boxes 배열의 첫 번째 바디랑 연결한다.
        pointB: { x: -25, y: 0 }, // 바디의 왼쪽 끝 근처에 연결한다.
        length: 2, // 연결 거리 설정정
        stiffness: 0.9, // 스프링 연결 숫자는 1까지 있으며 높을수록 강성이 높은 스프링이다.
      }),
      Constraint.create({
        pointA: { x: 660, y: 300 },
        bodyB: boxes.bodies[boxes.bodies.length - 1],
        pointB: { x: 25, y: 0 },
        length: 2,
        stiffness: 0.9,
      }),
      //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//
    ]);

    //마우스 입력을 추적할 수 있도록 Mouse 객체를 생성한다.
    const mouse = Mouse.create(render.canvas);

    //마우스의 제약 조건을 설정한다.
    //engine: 현재 사용하는 Matter.js 엔진을 연결한다.
    //mouse: 위에서 만든 마우스 객체를 연결해준다.
    //constraint: 마우스로 물체를 잡을 때의 "물리적인 성질"을 정의해준다.
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false, // 클릭 했을때 선으로로 보이게 하려면 true로 변경한다.
        },
      },
    });

    //마우스 제약 조건을 월드에 추가해 마우스 기능을 사용할 수 있도록 한다.
    Composite.add(world, mouseConstraint);

    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■ 추가된 내용 ■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//
    // color 변수를 선언해 기본 색상을 담는 용도로 사용.
    let color: string = '';
    // 마우스 드래그 시 색상 변경
    Events.on(
      mouseConstraint,
      'startdrag',
      (event: Matter.IEvent<Matter.MouseConstraint>) => {
        const body = (event as any).body;
        //기본 색상을 저장한다.
        color = body.render.fillStyle;
        if (body) {
          body.render.fillStyle = 'green';
        }
      }
    );

    Events.on(
      mouseConstraint,
      'enddrag',
      (event: Matter.IEvent<Matter.MouseConstraint>) => {
        const body = (event as any).body;
        if (body) {
          body.render.fillStyle = color; //드래그가 끝나면 기존에 담았던 색상으로 변경한다.
        }
      }
    );
    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

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

export default CompositesChain;
