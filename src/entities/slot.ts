import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

/**
 * A slot for which a ball can fall into.
 */
export class Slot {
    private graphic: PIXI.Sprite;
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
        this.graphic = new PIXI.Sprite(PIXI.Assets.get("slot"));
        this.graphic.width = width;
        this.graphic.height = height;
        this.graphic.position.set(x, y);
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

        const yAdjustment = -2;
        this.text.x = this.graphic.x + (this.graphic.width - this.text.width) / 2;
        this.text.y = this.graphic.y + (this.graphic.height - this.text.height) / 2 + yAdjustment;
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
    /**
     * Sets the texture of this slot to the winning/losing slot texture based on its value.
     */
    setWinLossTexture() {
        if (this.slotValue == 10) {
            this.graphic.texture = PIXI.Assets.get("slot-win");
        } else {
            this.graphic.texture = PIXI.Assets.get("slot-loss");
        }
    }

    /**
     * Resets to the default texture for this slot.
     */
    resetTexture() {
        this.graphic.texture = PIXI.Assets.get("slot");
    }
}
