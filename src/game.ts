import * as PIXI from 'pixi.js';
import { Board } from './entities/board';
import { Scoreboard } from './entities/scoreboard';
import { Button } from './entities/button';
import { PlinkoBackendService } from './backend/plinko-backend-service';

export class Game {
    private app: PIXI.Application;
    private scoreBoard: Scoreboard;
    private pegBoard: Board;
    private playButton: Button;
    private canvasWidth: number = 800;
    private canvasHeight: number = 600;
    private updateInterval: number = 1000;
    private lastUpdateTime: number = 0;
    private backendService: PlinkoBackendService = new PlinkoBackendService();

    async init() {
        this.app = new PIXI.Application();
        await this.app.init({
            width: this.canvasWidth,
            height: this.canvasHeight,
            backgroundColor: "#e1e1e1"
        });
        document.body.appendChild(this.app.canvas);

        this.scoreBoard = new Scoreboard(this.canvasWidth);
        this.pegBoard = new Board(this.canvasWidth, this.canvasHeight, 7);
        this.playButton = new Button(this.canvasWidth, this.canvasHeight, async () => {
            const response = await this.backendService.play(1, 10);
            this.scoreBoard.updateBalance(response.newBalance, response.slotEarnings, 10);
            this.pegBoard.dropBall(response.slot);
        });

        this.app.ticker.add(this.gameLoop.bind(this));
    }

    gameLoop(ticker: PIXI.Ticker): void {
        this.logic();
        this.draw();
    }

    logic(): void {
        const currentTime = Date.now();
        const elapsedTimeSinceLastUpdate = currentTime - this.lastUpdateTime;

        if (elapsedTimeSinceLastUpdate >= this.updateInterval) {
            this.lastUpdateTime = currentTime;
            this.pegBoard.moveBall(() => this.scoreBoard.displayLatestScore());
        }
    }

    draw(): void {
        this.scoreBoard.render(this.app.stage);
        this.pegBoard.render(this.app.stage);
        this.playButton.render(this.app.stage);

        this.app.renderer.render(this.app.stage);
    }
}
