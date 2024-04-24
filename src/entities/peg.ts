import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

/**
 * A peg to be placed on a board to affect the movement of a ball.
 */
export class Peg {
    private graphic: PIXI.Sprite;

    /**
     * Creates an instance of Peg.
     * @param {number} x - The x-coordinate of the peg.
     * @param {number} y - The y-coordinate of the peg.
     * @param {number} radius - The radius of the peg.
     */
    constructor(x: number, y: number, radius: number) {
        const diameter = radius * 2;

        this.graphic = new PIXI.Sprite(PIXI.Assets.get("peg"));
        this.graphic.anchor.set(0.5, 0.5);
        this.graphic.position.set(x, y);
        this.graphic.width = diameter;
        this.graphic.height = diameter;
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
