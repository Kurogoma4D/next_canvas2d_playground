/// <reference types="../node_modules/@types/createjs/" />

import React, { useEffect, useRef } from "react";

export type Coord = {
  x: number;
  y: number;
};

const CreateCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = useRef<createjs.Stage>(null);
  const duration = 500;

  let begin: Coord[] = [];

  const getContext = (): CanvasRenderingContext2D => {
    const canvas: HTMLCanvasElement = canvasRef.current!;
    return canvas.getContext("2d")!;
  };

  const initialize = () => {
    const canvas = canvasRef.current!;
    canvas.width = 640;
    canvas.height = 480;

    begin = [
      { x: canvas.width / 2 - 60, y: canvas.height / 2 - 60 },
      { x: canvas.width / 2 + 60, y: canvas.height / 2 - 60 },
      { x: canvas.width / 2 + 60, y: canvas.height / 2 + 60 },
      { x: canvas.width / 2 - 60, y: canvas.height / 2 + 60 }
    ];
  };

  const sample = () => {
    const canvas = canvasRef.current!;
    let s = stage.current;

    s = new createjs.Stage(canvas);
    let circle = new createjs.Shape();
    circle.graphics.beginFill("DeepSkyBlue").drawCircle(0, 0, 20);
    circle.x = begin[0].x;
    circle.y = begin[0].y;

    createjs.Tween.get(circle, { loop: -1 })
      .to(begin[1], duration, createjs.Ease.cubicOut)
      .to(begin[2], duration, createjs.Ease.cubicOut)
      .to(begin[3], duration, createjs.Ease.cubicOut)
      .to(begin[0], duration, createjs.Ease.cubicOut);

    s.addChild(circle);
    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", s);
  };

  const canvasRender = (context: CanvasRenderingContext2D) => {
    if (!context) {
      return;
    }
    requestAnimationFrame(() => {
      canvasRender(context);
    });
  };

  useEffect(() => {
    initialize();
    const context: CanvasRenderingContext2D = getContext();
    sample();

    canvasRender(context);

    return () => {};
  }, []);

  return (
    <>
      <canvas className="main_canvas" ref={canvasRef}></canvas>
    </>
  );
};

export default CreateCanvas;
