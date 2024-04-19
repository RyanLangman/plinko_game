import * as PIXI from 'pixi.js';

export class Peg {
    private graphic: PIXI.Graphics;
    private colour: string = "red";

    constructor(x, y, radius) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(x, y, radius);
        this.graphic.fill(this.colour);
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic)
    }
}