class LoadingAnimation {
    context: CanvasRenderingContext2D;
    coord: { x: number; y: number };

    constructor(context: CanvasRenderingContext2D) {
        this.context = context;
        this.coord = {
            x: context.canvas.width,
            y: context.canvas.height
        };
    }
}

export default LoadingAnimation;
