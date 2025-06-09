'use client';

import React, { useEffect, useRef } from 'react';
import Matter, { Common, Composites, Constraint } from 'matter-js';


const CompositesChain: React.FC = () => {
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
        showCollisions:false,
        showVelocity:false
      },
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

export default CompositesChain;