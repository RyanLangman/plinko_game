import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

export class Peg {
    private graphic: PIXI.Graphics;
    private colour: string = "red";

    constructor(x, y, radius) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(0, 0, radius);
        this.graphic.fill(this.colour);
        this.graphic.position.set(x, y);
    }

    getPosition(): Coordinate {
        return [this.graphic.x, this.graphic.y] as Coordinate;
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic)
    }
}