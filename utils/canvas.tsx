import React, { useEffect, useRef } from "react";

const Canvas: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseCoord = useRef({ x: 0, y: 0 });
    const rotate = useRef({ alpha: 0, beta: 0 });

    const getContext = (): CanvasRenderingContext2D => {
        const canvas: HTMLCanvasElement = canvasRef.current!;
        return canvas.getContext("2d")!;
    };

    const initialize = () => {
        const canvas: any = canvasRef.current;
        canvas.width = 640;
        canvas.height = 480;
    };

    const drawQuadraticBezier = (
        context: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        cx: number,
        cy: number,
        color?: string,
        width: number = 1
    ) => {
        if (color != null) {
            context.strokeStyle = color;
        }

        context.lineWidth = width;
        context.beginPath();
        context.moveTo(x1, y1);
        context.quadraticCurveTo(cx, cy, x2, y2);
        context.closePath();
        context.stroke();
    };

    const canvasRender = (context: CanvasRenderingContext2D) => {
        if (!context) {
            return;
        }

        if (window.DeviceOrientationEvent) {
            mouseCoord.current.x = Math.min(
                Math.max(
                    mouseCoord.current.x + (rotate.current.alpha / 90) * 10,
                    0
                ),
                480
            );
            mouseCoord.current.y = Math.min(
                Math.max(
                    mouseCoord.current.y +
                        (rotate.current.beta / 180 - 0.5) * 10,
                    0
                ),
                480
            );
        }

        context.fillStyle = "#ffffff";
        context.fillRect(
            0,
            0,
            canvasRef.current!.width,
            canvasRef.current!.height
        );
        drawQuadraticBezier(
            context,
            100,
            100,
            100,
            300,
            mouseCoord.current.x,
            mouseCoord.current.y,
            "#ff9900"
        );

        requestAnimationFrame(() => {
            canvasRender(context);
        });
    };

    useEffect(() => {
        initialize();
        const context: CanvasRenderingContext2D = getContext();
        const onMouseMoved = (e: MouseEvent) => {
            mouseCoord.current.x = e.clientX;
            mouseCoord.current.y = e.clientY;
        };
        const onDeviceRolled = (e: DeviceOrientationEvent) => {
            rotate.current.alpha = e.alpha!;
            rotate.current.beta = e.beta!;
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
