/// <reference types="../node_modules/@types/createjs/" />

import React, { useEffect, useRef } from "react";
import SimplexNoise from "simplex-noise";
import { buildText, buildKawaii, buildCactus } from "./kawaii";

export type Coord = {
  x: number;
  y: number;
};

const CreateCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = useRef<createjs.Stage>(null);
  const simplex = new SimplexNoise(Math.random);
  let tick = 0.0;
  let cactusPositionY = 0.0;

  const initialize = () => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const buildStage = () => {
    const canvas = canvasRef.current!;
    let s = stage.current;

    s = new createjs.Stage(canvas);

    const container = new createjs.Container();
    container.regX = container.x = canvas.width / 2;
    container.regY = container.y = canvas.height / 2;

    const text = buildText(canvas.width, canvas.height);
    container.addChild(text);

    const kawaii = buildKawaii(canvas.width, canvas.height);
    container.addChild(kawaii);

    const cactus = buildCactus(canvas.width, canvas.height);
    cactusPositionY = cactus.y;
    container.addChild(cactus);

    s.addChild(container);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", canvasRender);

    function canvasRender() {
      tick += 0.01;

      container.x = canvas.width / 2 + simplex.noise2D(tick, 0) * 10;
      container.y = canvas.height / 2 + simplex.noise2D(0, tick) * 10;

      let sin = Math.sin(tick * 10);
      cactus.y = cactusPositionY - Math.abs(sin) * 18;
      cactus.rotation = sin * 18;

      container.scaleX = Math.abs(sin) * 0.2 + 1;
      container.scaleY = Math.abs(sin) * 0.2 + 1;

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

export default CreateCanvas;
