import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

export class Ball {
    private graphic: PIXI.Graphics;
    private ballRadius: number = 10;
    private ballDiameter: number = this.ballRadius * 2;
    private coordinate: Coordinate;

    constructor(x: number, y: number, initialPosition: Coordinate) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(0, 0, this.ballRadius);
        this.graphic.fill("purple");
        this.graphic.position.set(x, y);
        this.coordinate = initialPosition;
    }

    setPosition(coordinate: Coordinate) {
        console.log(`Current position: ${this.graphic.x},${this.graphic.y}. New position: ${coordinate}.`)
        this.graphic.position.set(
            coordinate[0],
            coordinate[1]
        );
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic);
    }
}