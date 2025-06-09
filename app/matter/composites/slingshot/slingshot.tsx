'use client';

import React, { useEffect, useRef } from 'react';
import Matter, { Common, Composites, Constraint } from 'matter-js';


//matter-wrap 사용
import MatterWrap from 'matter-wrap';
Matter.use(MatterWrap); // 등록


function drawGrid(canvas:HTMLCanvasElement, spacing:number = 50) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;
  
  const width = canvas.width;
  const height = canvas.height;

  ctx.save();
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 0.5;
  ctx.font = '10px Arial';
  ctx.fillStyle = 'black';

  // 세로
  for (let x = 0; x <= width; x += spacing) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, height);
    ctx.stroke();
    ctx.fillText(String(x), x + 2, 10); // 좌표
  }

  // 가로
  for (let y = 0; y <= height; y += spacing) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
    ctx.fillText(String(y), 2, y - 2); // 좌표
  }

  ctx.restore();
}

const Slingshot: React.FC = () => {
  const sceneRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const Engine = Matter.Engine;
    const Render = Matter.Render;
    const Runner = Matter.Runner;
    const Bodies = Matter.Bodies;
    const Composite = Matter.Composite;

    const Mouse = Matter.Mouse;
    const MouseContraint = Matter.MouseConstraint;

    const Events = Matter.Events;

    const engine = Engine.create()
    const world = engine.world;

    const width = 1000;
    const height = 800;

    const render = Render.create({
      element: sceneRef.current!,
      engine: engine,
      options:{
        width,
        height,
        wireframes:false,
        background:"#fafafa",
        showCollisions:false,
        showVelocity:false
      }
    });

    const ground = [
      Bodies.rectangle(width/2,height,width,50,{
        isStatic:true,
        render:{
          fillStyle:"green",
          strokeStyle:"black",
          lineWidth:2
        }
      }),
      Bodies.rectangle(200,300,200,50,{
        isStatic:true,
        render:{
          fillStyle:"green",
          strokeStyle:"black",
          lineWidth:2
        }
      })
  ]

  Composite.add(world,ground);




    var pyramid = Composites.pyramid(500,500,5,4,0,0,(x:number, y:number)=>{
      return Bodies.rectangle(x, y, 30, 30, {
            chamfer: { radius: 5 },
            frictionAir: 0.01,
            render: { 
              strokeStyle: 'black',
              lineWidth:2
            }
        });
    });



    Composite.add(world,[pyramid]);

    const mouse = Mouse.create(render.canvas);
    const mouseConstraint = MouseContraint.create(engine,{
      mouse,
      constraint:{
        stiffness:0.2,
        render:{
          visible:false
        }
      }
    });
    Composite.add(world, mouseConstraint);

    let color:string = '';
    Events.on(mouseConstraint, 'startdrag',(event:Matter.IEvent<Matter.MouseConstraint>)=>{
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

    const allBodies = Composite.allBodies(world);
    for (let i =0; i < allBodies.length; i++){
      allBodies[i].plugin.wrap ={
          min: { x: 0, y: 0 },
          max: { x: width, y: height }
      }
    }

    Events.on(render, 'afterRender', function() {
      drawGrid(render.canvas, 50); // 100px 간격
    });


    Engine.run(engine);
    Render.run(render);
    
    const runner = Runner.create();
    Runner.run(runner,engine);


    return () =>{
      Render.stop(render);
      Runner.stop(runner);
      Composite.clear(engine.world, false);
      
      Engine.clear(engine);
      render.canvas.remove();
      render.textures = {};
    }
  },[]);

  return (
    <div style={{border:"3px solid black"}} ref={sceneRef} />
  )
};

export default Slingshot;