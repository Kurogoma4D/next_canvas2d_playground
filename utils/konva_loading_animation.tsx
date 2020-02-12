import React, { useRef, useEffect } from "react";
import { Coord } from "./canvas";
import { Circle } from "react-konva";
import Konva from "konva";

const KonvaLoadingAnimation: React.FC = () => {
  const coord = useRef<Coord>({ x: 0, y: 0 });
  const points = useRef<Coord[]>([]);
  const circle = useRef<Konva.Circle>(null);

  useEffect(() => {
    let width = window.innerWidth;
    let height = window.innerHeight;

    points.current = [
      { x: width / 2 - 60, y: height / 2 - 60 },
      { x: width / 2 + 60, y: height / 2 - 60 },
      { x: width / 2 + 60, y: height / 2 + 60 },
      { x: width / 2 - 60, y: height / 2 + 60 }
    ];

    coord.current = points.current[0];

    circle.current?.to({
      x: points.current[1].x,
      y: points.current[1].y,
      duration: 0.5
    });

    return () => {};
  }, [coord, points]);

  return (
    <Circle
      ref={circle}
      x={coord.current.x}
      y={coord.current.y}
      radius={20}
      fill="white"
    ></Circle>
  );
};

export default KonvaLoadingAnimation;
