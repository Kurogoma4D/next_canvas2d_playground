import { Mouse } from "./canvas";

class InteractiveBezier {
    context: CanvasRenderingContext2D;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
    }

    drawQuadraticBezier(
        context: CanvasRenderingContext2D,
        x1: number,
        y1: number,
        x2: number,
        y2: number,
        cx: number,
        cy: number,
        color?: string,
        width: number = 1
    ) {
        if (color != null) {
            context.strokeStyle = color;
        }

        context.lineWidth = width;
        context.beginPath();
        context.moveTo(x1, y1);
        context.quadraticCurveTo(cx, cy, x2, y2);
        context.closePath();
        context.stroke();
    }

    render(mouseCoord: Mouse) {
        this.drawQuadraticBezier(
            this.context,
            100,
            100,
            100,
            300,
            mouseCoord.x,
            mouseCoord.y,
            "#ff9900"
        );
    }
}

export default InteractiveBezier;
