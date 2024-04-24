import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

/**
 * A slot for which a ball can fall into.
 */
export class Slot {
    private graphic: PIXI.Graphics;
    private colour: string = "yellow";
    private text: PIXI.Text;
    private slotValue: number = 0;
    public coordinate: Coordinate = [0, 0];
    public centerCoordinate: Coordinate = [0, 0];

    /**
     * Creates an instance of Slot.
     * @param {number} x - The x-coordinate of the slot.
     * @param {number} y - The y-coordinate of the slot.
     * @param {number} width - The width of the slot.
     * @param {number} height - The height of the slot.
     * @param {number} slotValue - The value associated with the slot.
     */
    constructor(x: number, y: number, width: number, height: number, slotValue: number) {
        this.graphic = new PIXI.Graphics();
        this.graphic.rect(x, y, width, height);
        this.graphic.fill(this.colour);
        this.coordinate = [x, y];
        this.centerCoordinate = [x + width / 2, y + height / 2];
        this.slotValue = slotValue;

        this.text = new PIXI.Text({
            text: slotValue.toString(),
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 0xff1010,
                align: 'center',
            }
        });

        this.text.x = x + 5;
        this.text.y = y + 5;
    }

    /**
     * Gets the value associated with the slot.
     * @returns {number} The value of the slot.
     */
    getSlotValue(): number {
        return this.slotValue;
    }

    /**
     * Renders the slot on the specified container.
     * @param {PIXI.Container} container - The container to render the slot in.
     */
    render(container: PIXI.Container) {
        container.addChild(this.graphic);
        container.addChild(this.text);
    }
}
