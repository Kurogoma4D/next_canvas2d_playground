import { Coord } from "./canvas";
import BezierEasing from "bezier-easing";

class LoadingAnimation {
    context: CanvasRenderingContext2D;
    coord: Coord;
    begin: Coord[];
    easing = BezierEasing(0.165, 0.84, 0.44, 1);
    duration = 500;

    constructor(context: CanvasRenderingContext2D) {
        let width = context.canvas.width;
        let height = context.canvas.height;

        this.context = context;
        this.coord = {
            x: width / 2,
            y: height / 2
        };
        this.begin = [
            { x: width / 2 - 60, y: height / 2 - 60 },
            { x: width / 2 + 60, y: height / 2 - 60 },
            { x: width / 2 + 60, y: height / 2 + 60 },
            { x: width / 2 - 60, y: height / 2 + 60 }
        ];
    }

    drawCircle(radius: number, color: string) {
        if (color != null) {
            this.context.fillStyle = color;
        }

        this.context.beginPath();
        this.context.arc(
            this.coord.x,
            this.coord.y,
            radius,
            0.0,
            Math.PI * 2.0
        );
        this.context.closePath();
        this.context.fill();
    }

    render(tick: number) {
        let t = (tick % (this.duration * 4)) / this.duration;
        let ease = t - Math.floor(t);
        let b = this.begin[Math.floor(t)];
        let dest = this.begin[Math.floor((t + 1) % 4)];
        this.coord.x = (dest.x - b.x) * this.easing(ease) + b.x;
        this.coord.y = (dest.y - b.y) * this.easing(ease) + b.y;

        let radius = this.easing(ease) * 30;

        this.drawCircle(radius, "#424242");
    }
}

export default LoadingAnimation;
