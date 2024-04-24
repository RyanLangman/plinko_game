import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

/**
 * A peg to be placed on a board to affect the movement of a ball.
 */
export class Peg {
    private graphic: PIXI.Graphics;
    private colour: string = "red";

    /**
     * Creates an instance of Peg.
     * @param {number} x - The x-coordinate of the peg.
     * @param {number} y - The y-coordinate of the peg.
     * @param {number} radius - The radius of the peg.
     */
    constructor(x: number, y: number, radius: number) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(0, 0, radius);
        this.graphic.fill(this.colour);
        this.graphic.position.set(x, y);
    }

    /**
     * Gets the position of the peg.
     * @returns {Coordinate} The position of the peg as a coordinate array [x, y].
     */
    getPosition(): Coordinate {
        return [this.graphic.x, this.graphic.y] as Coordinate;
    }

    /**
     * Renders the peg on the specified container.
     * @param {PIXI.Container} container - The container to render the peg in.
     */
    render(container: PIXI.Container) {
        container.addChild(this.graphic);
    }
}
