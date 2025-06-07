'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const MatterCanvas: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

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

    Engine.run(engine);
    Render.run(render);

    const runner = Runner.create();
    Runner.run(runner, engine);

    // 클린업 함수수
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

export default MatterCanvas;
