import React, { useEffect, useRef } from "react";
import InteractiveBezier from "./interactive_bezier";
import LoadingAnimation from "./loading_animation";
import BallAnimation from "./ball_animation";
import QuoteText from "./quote_text";

export type Coord = {
    x: number;
    y: number;
};

type CanvasObject = {
    time: number;
    bezier: InteractiveBezier;
    loading: LoadingAnimation;
    ball: BallAnimation;
    text: QuoteText;
};

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseCoord = useRef<Coord>({ x: 0, y: 0 });
    const rotate = useRef({ gamma: 0, beta: 0 });
    let objects: CanvasObject;
    const startTime = Date.now();

    const getContext = (): CanvasRenderingContext2D => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        return canvas.getContext("2d")!;
    };

    const initialize = () => {
        const canvas: any = canvasRef.current;
        canvas.width = 640;
        canvas.height = 480;
    };

    const normalize = (value: number, begin: number, end: number): number => {
        const half = (end - begin) / 2;
        const clamped = Math.min(Math.max(value, begin), end) - half;
        return clamped / half;
    };

    const canvasRender = (context: CanvasRenderingContext2D) => {
        if (!context) {
            return;
        }

        if (window.DeviceOrientationEvent) {
            mouseCoord.current.x = Math.min(
                Math.max(mouseCoord.current.x + rotate.current.gamma * 10, 0),
                480
            );
            mouseCoord.current.y = Math.min(
                Math.max(mouseCoord.current.y + rotate.current.beta * 10, 0),
                480
            );
        }

        context.fillStyle = "#424242";
        context.fillRect(0, 0, context.canvas.width, context.canvas.height);

        // objects?.bezier.render(mouseCoord.current);
        // objects.loading.render(objects.time);
        // objects.ball.render(objects.time);
        objects.text.render(objects.time);

        objects.time = Date.now() - startTime;
        requestAnimationFrame(() => {
            canvasRender(context);
        });
    };

    useEffect(() => {
        initialize();
        const context: CanvasRenderingContext2D = getContext();
        objects = {
            time: startTime,
            bezier: new InteractiveBezier(context),
            loading: new LoadingAnimation(context),
            ball: new BallAnimation(context),
            text: new QuoteText(context)
        };

        const onMouseMoved = (e: MouseEvent) => {
            mouseCoord.current.x = e.clientX;
            mouseCoord.current.y = e.clientY;
        };
        const onDeviceRolled = (e: DeviceOrientationEvent) => {
            rotate.current.gamma = normalize(e.gamma!, -90, 90);
            rotate.current.beta = normalize(e.beta!, 0, 90);
        };
        window.addEventListener("mousemove", e => onMouseMoved(e));
        window.addEventListener("deviceorientation", e => onDeviceRolled(e));

        canvasRender(context);

        return () => {
            window.removeEventListener("mousemove", onMouseMoved);
        };
    }, []);

    return (
        <>
            <canvas className="main_canvas" ref={canvasRef}></canvas>
        </>
    );
};

export default Canvas;
