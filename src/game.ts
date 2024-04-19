import * as PIXI from 'pixi.js';
import { Board } from './entities/board';

export class Game {
    private app: PIXI.Application;
    private pegBoard: Board;
    private canvasWidth: number = 800;
    private canvasHeight: number = 600;

    async init() {
        this.app = new PIXI.Application();
        await this.app.init({
            width: this.canvasWidth,
            height: this.canvasHeight,
            backgroundColor: "#4a2899"
        });
        document.body.appendChild(this.app.canvas);

        this.pegBoard = new Board(this.canvasWidth, this.canvasHeight, 8);

        this.app.ticker.add(this.gameLoop.bind(this));
    }

    gameLoop(delta: number): void {
        this.logic();
        this.draw();
    }

    logic(): void {
        // TODO: Each tick of the game, call methods on entities to update their state
    }

    draw(): void {
        this.pegBoard.render(this.app.stage);
        this.app.renderer.render(this.app.stage);
    }
}
