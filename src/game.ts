import * as PIXI from 'pixi.js';
import { Board } from './entities/board';
import { Scoreboard } from './entities/scoreboard';
import { Button } from './entities/button';

export class Game {
    private app: PIXI.Application;
    private scoreBoard: Scoreboard;
    private pegBoard: Board;
    private playButton: Button;
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

        this.scoreBoard = new Scoreboard(this.canvasWidth);
        this.pegBoard = new Board(this.canvasWidth, this.canvasHeight, 3);
        this.playButton = new Button(this.canvasWidth, this.canvasHeight, () => {
            if (this.scoreBoard.deductCredits(10)) {
                this.pegBoard.dropBall();
            }
        });

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
        this.scoreBoard.render(this.app.stage);
        this.pegBoard.render(this.app.stage);
        this.playButton.render(this.app.stage);
        this.app.renderer.render(this.app.stage);
    }
}
