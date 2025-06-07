'use client';

import React, { useEffect, useRef } from 'react';
import Matter from 'matter-js';

const MouseConstraintEvent: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;
    const Events = Matter.Events;
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

    // 마우스 드래그 시 색상 변경
    Events.on(mouseConstraint, 'startdrag', (event: Matter.IEvent<Matter.MouseConstraint>) => {
      const body = (event as any).body;
      if (body) {
        body.render.fillStyle = '#e74c3c'; // 드래그 시작 시 빨간색
      }
    });

    Events.on(mouseConstraint, 'enddrag', (event: Matter.IEvent<Matter.MouseConstraint>) => {
      const body = (event as any).body;
      if (body) {
        body.render.fillStyle = '#3498db'; // 드래그 끝나면 원래 색상
      }
    });

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

export default MouseConstraintEvent;