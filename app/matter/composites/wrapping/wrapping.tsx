'use client';

import React, { useEffect, useRef } from 'react';
import Matter, { Common, Composites, Constraint } from 'matter-js';

//matter-wrap 사용
import MatterWrap from 'matter-wrap';
Matter.use(MatterWrap); // 등록


const Wrapping: React.FC = () => {
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
      }
    });


    
    const group: number = Matter.Body.nextGroup(true);

    var boxes = Composites.stack(160, 290, 15, 1, 0, 0, function(x:number, y:number) {
        return Bodies.rectangle(x-20, y, 53, 20, {
            collisionFilter: { group: group },
            density: 0.005,
            chamfer: { radius: 5 },
            frictionAir: 0.05,
            render: { 
              strokeStyle: 'black',
              lineWidth:2
            }
        });
    });


    Composites.chain(boxes, 0.3, 0, -0.3, 0, { 
        stiffness: 0.99,
        length: 0.0001,
        render: {
            visible: false
            
        }
    });

    var stack = Composites.stack(250, 50, 6, 3, 0, 0, function(x:number, y:number) {
        return Bodies.rectangle(x, y, 50, 50,  {
            chamfer:{radius:5},
            render: {
              strokeStyle: 'black',
              lineWidth:2
            }
        });
    });

    

    Composite.add(world, [boxes,stack,
        Bodies.rectangle(30, 490, 220, 380, { 
            isStatic: true, 
            chamfer: { radius: 20 },
            render:{
              fillStyle:"green",
              strokeStyle:"black",
              lineWidth:2
            }
        }),
        Bodies.rectangle(770, 490, 220, 380, { 
            isStatic: true, 
            chamfer: { radius: 20 },
            render:{
              fillStyle:"green",
              strokeStyle:"black",
              lineWidth:2
            }
        }),
        Constraint.create({ 
            pointA: { x: 140, y: 300 }, 
            bodyB: boxes.bodies[0], 
            pointB: { x: -25, y: 0 },
            length: 2,
            stiffness: 0.9
        }),
        Constraint.create({ 
            pointA: { x: 660, y: 300 }, 
            bodyB: boxes.bodies[boxes.bodies.length - 1], 
            pointB: { x: 25, y: 0 },
            length: 2,
            stiffness: 0.9
        })
    ]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint:Matter.MouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false,
        },
      },
    });
    Composite.add(world, mouseConstraint);

    // 마우스 드래그 시 색상 변경 저장용

    let color:string = '';
    // 마우스 드래그 시 색상 변경
    Events.on(mouseConstraint, 'startdrag', (event: Matter.IEvent<Matter.MouseConstraint>) => {
      const body = (event as any).body;
      //기본 색상을 저장한다.
      color = body.render.fillStyle;
      if (body) {
        body.render.fillStyle = 'green';
      }
    });

    Events.on(mouseConstraint, 'enddrag', (event: Matter.IEvent<Matter.MouseConstraint>) => {
      const body = (event as any).body;
      if (body) {
        body.render.fillStyle = color;
      }
    });

    //마우스 클릭 이벤트
    Events.on(mouseConstraint, 'mousedown', (event) => {
      const mousePosition = event.mouse.position;

      const newBody = Bodies.rectangle(mousePosition.x, mousePosition.y, 40, 40, {
        render: {
          strokeStyle: 'black',
          lineWidth: 2,
        },
      });

      Composite.add(world, newBody);
      const allBodies = Composite.allBodies(world);
      for (let i = 0; i < allBodies.length; i++) {
        allBodies[i].plugin.wrap = {
          min: { x: 0, y: 0 },
          max: { x: width, y: height }
        };
      }

    });


    const allBodies = Composite.allBodies(world);
    for (let i = 0; i < allBodies.length; i++) {
      allBodies[i].plugin.wrap = {
        min: { x: 0, y: 0 },
        max: { x: width, y: height }
      };
    }







    Engine.run(engine);
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    return () => {
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    };
  }, []);

  return <div ref={sceneRef} />;
};

export default Wrapping;