'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const mouseConstraint: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    //마우스 객체 생성
    const Mouse = Matter.Mouse;
    const MouseConstraint = Matter.MouseConstraint;

    const engine = Engine.create();
    const world = engine.world;

    const width = 800;
    const height = 600;

    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options: {
        width,
        height,
        wireframes: false,
        background: '#fafafa',
      },
    });

    const ground = Bodies.rectangle(width / 2, height, width, 40, {
      isStatic: true,
      render: { fillStyle: '#333' },
    });

    const box = Bodies.rectangle(400, 0, 80, 80, {
      restitution: 0.5,
      render: { fillStyle: '#3498db' },
    });

    Composite.add(world, [ground, box]);


    //마우스 제어 생성
    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseConstraint.create(engine, {
      mouse,
      constraint: {
        stiffness: 0.2,
        render: {
          visible: false, // 클릭 시 선을 보이게 하려면 true로 변경
        },
      },
    });
    Composite.add(world, mouseConstraint);



    Engine.run(engine);
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 💥 클린업
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

export default mouseConstraint;
