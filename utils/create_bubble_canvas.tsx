/// <reference types="../node_modules/@types/createjs/" />

import React, { useEffect, useRef } from "react";
import SimplexNoise from "simplex-noise";

export type Coord = {
  x: number;
  y: number;
};

const CreateBubbleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = useRef<createjs.Stage>(null);
  const simplex = new SimplexNoise(Math.random);
  let tick = 0.0;

  const initialize = () => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight * 2;
  };

  const buildStage = () => {
    const canvas = canvasRef.current!;
    let s = stage.current;

    s = new createjs.Stage(canvas);

    const baseCircle: createjs.Shape[] = [];
    for (let i = 0; i < 3; i++) {
      const c = new createjs.Shape();
      c.graphics
        .beginFill("#8e8e8eaa")
        .drawCircle(0, 0, (canvas.height * 0.9) / 2);
      c.x = canvas.width / 2;
      c.y = canvas.height / 2;
      c.rotation = Math.random() * 360;
      baseCircle.push(c);
    }

    s.addChild(...baseCircle);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", canvasRender);

    function canvasRender() {
      tick += 0.01;
      let fixedTick = tick / 8;
      baseCircle.forEach((circle, index) => {
        circle.scaleX =
          0.2 * Math.abs(simplex.noise2D(fixedTick + 1000 * index, 0)) + 0.9;
        circle.scaleY =
          0.2 * Math.abs(simplex.noise2D(0, fixedTick + 1000 * index)) + 0.9;
      });

      s?.update();
    }
  };

  useEffect(() => {
    initialize();
    buildStage();

    return () => {};
  }, []);

  return (
    <>
      <canvas className="main_canvas" ref={canvasRef}></canvas>
    </>
  );
};

export default CreateBubbleCanvas;
