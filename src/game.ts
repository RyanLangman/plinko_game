export class Game {
    canvas: HTMLCanvasElement;
    context: CanvasRenderingContext2D;

    constructor(canvasId: string) {
        this.canvas = document.getElementById(canvasId) as HTMLCanvasElement;
        this.context = this.canvas.getContext('2d') as CanvasRenderingContext2D;
    }

    init(): void {
        this.gameLoop();
    }

    gameLoop(): void {
        this.logic();
        this.draw();

        window.requestAnimationFrame(() => this.gameLoop());
    }

    logic(): void {
        // TODO: Calculate and position all the things.
    }

    draw(): void {
        // TODO: Draw all the things.
    }
}
