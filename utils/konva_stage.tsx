import React, { useState, useEffect } from "react";
import { Stage, Layer, Rect } from "react-konva";
import KonvaLoadingAnimation from "./konva_loading_animation";

const KonvaStage: React.FC = () => {
  const [size, setSize] = useState({ width: 640, height: 480 });

  useEffect(() => {
    setSize({ width: window.innerWidth, height: window.innerHeight });
    return () => {};
  }, [setSize]);

  return (
    <>
      <Stage width={size.width} height={size.height} className="main_canvas">
        <Layer>
          <Rect
            x={0}
            y={0}
            width={size.width}
            height={size.height}
            fill="#42424255"
          ></Rect>
          <KonvaLoadingAnimation></KonvaLoadingAnimation>
        </Layer>
      </Stage>
      <style jsx>{`
        .main_canvas {
          position: absolute;
          top: 0;
          left: 0;
        }
      `}</style>
    </>
  );
};

export default KonvaStage;
