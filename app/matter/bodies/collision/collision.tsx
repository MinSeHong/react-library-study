'use client';

import React, { useEffect, useRef } from 'react';
import Matter, { Body, Composites, Constraint, Vector } from 'matter-js';

//matter-wrap 사용
import MatterWrap from 'matter-wrap';
Matter.use(MatterWrap); // 등록



const Collision: React.FC = () => {
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


    //Events//
    //물리 엔진 내부에서 발생하는 다양한 사건(예: 충돌, 업데이트, 마우스 클릭 등)을 감지하고,
    // 콜백 함수를 등록해 원하는 동작을 실행할 수 있게 해준다.
    const Events = Matter.Events;

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
        //★★★★★★
        // 캔버스의 해상도를 디스플레이 해상도에 맞게 스케일 조정하는 기능이다.
        pixelRatio: window.devicePixelRatio || 1,

        //와이어프레임으로 보이게 할지 정의한다. 기본 값은 false이다.
        wireframes: false,

        //canvas의 색상을 설정한다. 색상을 투명하게 하고 싶으면 'transparent'를 넣는다.
        background: '#fafafa',
      },
    });


    //Wrapping 플러그인 생성 함수
    //물체가 오른쪽 화면 끝으로 나가면 왼쪽에서 다시 나타나도록 한다.
    const Wrapping = () =>{
      const allBodies =Composite.allBodies(world);
      for (let i = 0; i < allBodies.length; i++) {
        allBodies[i].plugin.wrap = {
          //
          min: { x: 0, y: 0 },
          max: { x: width, y: height },
        };
      }
    }

    //마우스 입력을 추적할 수 있도록 Mouse 객체를 생성한다.
    const mouse = Mouse.create(render.canvas);

    //마우스의 제약 조건을 설정한다.
    //engine: 현재 사용하는 Matter.js 엔진을 연결한다.
    //mouse: 위에서 만든 마우스 객체를 연결해준다.
    //constraint: 마우스로 물체를 잡을 때의 "물리적인 성질"을 정의해준다.
    const mouseConstraint:Matter.MouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false, // 클릭 했을때 선으로 보이게 하려면 true로 변경한다.
        },
      },
    });

    //pixelRatio를 해상도에 맞게 설정을 하면 마우스의 위치는 해상도에 맞게 바뀌지 않는다.
    //이때 Matter.Mouse.setScale을 사용한다.
    Matter.Mouse.setScale(mouse, {
      x: 1 / window.devicePixelRatio,
      y: 1 / window.devicePixelRatio,
    });

    //마우스 제약 조건을 월드에 추가해 마우스 기능을 사용할 수 있도록 한다.
    Composite.add(world, mouseConstraint);


    //■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■//

    // 색상 A,B String 생성
    var colorA:string = '#f55a3c',
        colorB:string = '#f5d259';

    // 충돌을 감지하는 colldier 사각형 생성
    var collider = Bodies.rectangle(400, 300, 350, 40, {
        isStatic: false,
        chamfer:{radius:15},
        //mass:관성에 대한 저항을 추가한다.
        mass:1,
        render: {
            fillStyle: 'green',
            lineWidth: 2,
            strokeStyle:"black"
        },
    });


    //setAngularVelocity는 지속적인 회전을 추가해준다.
    Events.on(engine, 'beforeUpdate', () => {
      Body.setAngularVelocity(collider, 0.1); // 지속적인 회전 추가.
    });




    // 렌더링 시작하자마자 원 생성.
    Composite.add(world,
        [Bodies.circle(400, 40, 20, {
            restitution:0.7
            ,
            render: {
                fillStyle: colorB,
                lineWidth: 2,
                strokeStyle:"black"
            }
        }),
        
      //Constraint.create//
      //collider의 가운데에 스프링을 연결해준다.
      Constraint.create({
        pointA: {x:400,y:600},
        bodyB:collider,
        stiffness:1,
        length:0,
      })]
    );

    Composite.add(world, [
        collider,
        Bodies.rectangle(400, 600, 800, 50, { 
            isStatic: true,
            render: {
                fillStyle: '#060a19',
                lineWidth: 0
            }
        })
    ]);


    Events.on(mouseConstraint,'mousedown', function(event){
      const position = event.mouse.position;

      Composite.add(world,
        Bodies.circle(position.x, position.y, Math.floor(Matter.Common.random(4,10)*2), {
            restitution:Matter.Common.random(0.7,0.9),
            frictionAir:Matter.Common.random(0.01,0.03)
            ,
            render: {
                fillStyle: colorB,
                lineWidth: 2,
                strokeStyle:"black"
            }
        })
      )
      //다시 Wrapping
      Wrapping();
    })

    //충돌을 확인하는 Events 기능 추가
    Events.on(engine, 'collisionStart', function(event) {
        //충돌이 감지된 객체를 모두 가져온다.
        var pairs = event.pairs;
        
        //충돌이 감지된 객체를 모두 순회하면서 collider 객체와 충돌했는지 확인한다.
        for (var i = 0, j = pairs.length; i != j; ++i) {
            var pair = pairs[i];
            //충돌이 된 body는 bodyA, bodyB로 구성된다.
            //bodyA가 collider이거나 bodyB가 collider될 수 있기 때문에 2가지 조건을 생성한다.
            if (pair.bodyA === collider) {
                //충돌이 된 Circle의 색상을 바꾼다.
                pair.bodyB.render.fillStyle = colorA;
            } else if (pair.bodyB === collider) {
              //충돌이 된 Circle의 색상을 바꾼다.
                pair.bodyA.render.fillStyle = colorA;
            }
        }
    });



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

export default Collision;
