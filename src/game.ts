import * as PIXI from 'pixi.js';

export class Game {
    private app: PIXI.Application;

    async init() {
        this.app = new PIXI.Application();
        await this.app.init();
        document.body.appendChild(this.app.canvas);

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
        // TODO: Call each entities render function to render it to the stage
        this.app.renderer.render(this.app.stage);
    }
}
