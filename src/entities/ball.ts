import * as PIXI from 'pixi.js';

export class Ball {
    private graphic: PIXI.Graphics;
    private ballRadius: number = 10;
    private ballDiameter: number = this.ballRadius * 2;

    constructor(x: number, y: number) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(x, y, this.ballRadius);
        this.graphic.fill("#FFF");
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic);
    }
}