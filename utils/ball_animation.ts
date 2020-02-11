import { Coord } from "./canvas";
import BezierEasing from "bezier-easing";

class BallAnimation {
    context: CanvasRenderingContext2D;
    coord: Coord[];
    begin: Coord[];
    easing = BezierEasing(0.165, 0.84, 0.44, 1);
    metrix: Coord;

    constructor(context: CanvasRenderingContext2D) {
        let width = context.canvas.width;
        let height = context.canvas.height;
        this.metrix = { x: width, y: height };

        this.context = context;
        this.coord = Array(5)
            .fill({})
            .map(() => ({
                x: Math.random() * width,
                y: height
            }));
        this.begin = [
            { x: width / 2 - 60, y: height / 2 - 60 },
            { x: width / 2 + 60, y: height / 2 - 60 },
            { x: width / 2 + 60, y: height / 2 + 60 },
            { x: width / 2 - 60, y: height / 2 + 60 }
        ];
    }

    drawCircle(x: number, y: number, radius: number, color: string) {
        if (color != null) {
            this.context.fillStyle = color;
        }

        this.context.beginPath();
        this.context.arc(x, y, radius, 0.0, Math.PI * 2.0);
        this.context.closePath();
        this.context.fill();
    }

    render(tick: number) {
        this.drawCircle(Math.sin(tick / 100), 200, 16, "#FFFFFF");
    }
}

export default BallAnimation;
