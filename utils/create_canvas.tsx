/// <reference types="../node_modules/@types/createjs/" />

import React, { useEffect, useRef } from "react";
import { buildTextline } from "./splash_animation";
import SimplexNoise from "simplex-noise";

export type Coord = {
  x: number;
  y: number;
};

const CreateCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stage = useRef<createjs.Stage>(null);
  const simplex = new SimplexNoise(Math.random);
  let tick = 0.0;

  const initialize = () => {
    const canvas = canvasRef.current!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  const buildStage = () => {
    const canvas = canvasRef.current!;
    let s = stage.current;

    s = new createjs.Stage(canvas);

    const background = new createjs.Shape();
    const text = new createjs.Container();

    background.graphics
      .beginFill("#F5D4D3")
      .drawRect(0, 0, canvas.width, canvas.height);

    text.scaleX = text.scaleY = 0.6;
    text.regX = canvas.width / 2;
    text.regY = canvas.height / 2;
    text.y = canvas.height / 2;

    text.addChild(
      buildTextline(
        canvas.width,
        "クリエイターなら、",
        canvas.height / 3,
        100,
        "#F78E8A"
      )
    );
    text.addChild(
      buildTextline(
        canvas.width,
        "つくり続けた奴が正義だ。",
        canvas.height / 2.2,
        1300,
        "#754342"
      )
    );

    createjs.Tween.get(background)
      .wait(70 * 12 + 1700)
      .to({ alpha: 0 }, 500);

    createjs.Tween.get(text)
      .wait(70 * 9 + 400)
      .to({ scale: 1 }, 320, createjs.Ease.getBackInOut(2));

    s.addChild(background);
    s.addChild(text);

    createjs.Ticker.framerate = 60;
    createjs.Ticker.addEventListener("tick", canvasRender);

    function canvasRender() {
      tick += 0.01;
      text.x = canvas.width / 2 + simplex.noise2D(tick, 0) * 12 + 40;
      text.y = canvas.height / 2 + simplex.noise2D(0, tick) * 12;
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
