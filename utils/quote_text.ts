import BezierEasing from "bezier-easing";

// import { Coord } from "./canvas";

class QuoteText {
    context: CanvasRenderingContext2D;
    width: number;
    height: number;
    fontSize: number;
    quote: string[];
    easing = BezierEasing(0.71, 0.01, 0.79, 0.15);
    keyframe = 750;

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.width = this.context.canvas.width;
        this.height = this.context.canvas.height;
        this.fontSize = this.width / 14;
        this.quote = ["クリエイターなら、", "つくり続けた奴が正義だ。"];
    }

    render(tick: number) {
        let ease = Math.min(this.keyframe, tick);
        let transparent = Math.min(600, tick) / 600;
        this.context.fillStyle = `rgba(255, 255, 255, ${this.easing(
            transparent
        )})`;
        this.context.font = `${this.fontSize}px san-serif`;
        this.quote[0]
            .split("")
            .forEach((v, i) =>
                this.context.fillText(
                    v,
                    i * this.fontSize +
                        Math.exp(i * 1.8) *
                            (1.0 - this.easing(ease / this.keyframe)) +
                        Math.max(tick / this.keyframe, 1.0) * i * 0.4,
                    this.height / 2
                )
            );
        this.quote[1]
            .split("")
            .forEach((v, i) =>
                this.context.fillText(
                    v,
                    i * this.fontSize +
                        Math.exp(i * 1.8) *
                            (1.0 - this.easing(ease / this.keyframe)) +
                        Math.max(tick / this.keyframe, 1.0) * i * 0.2,
                    this.height / 2 + this.fontSize + 8
                )
            );
    }
}

export default QuoteText;
