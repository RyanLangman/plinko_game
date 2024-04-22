import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

export class Slot {
    private graphic: PIXI.Graphics;
    private colour: string = "yellow";
    private text: PIXI.Text;
    private slotValue: number = 0;
    public coordinate: Coordinate = [0, 0];
    public centerCoordinate: Coordinate = [0, 0];

    constructor(x: number, y: number, width: number, height: number, slotValue: number) {
        this.graphic = new PIXI.Graphics();
        this.graphic.rect(x, y, width, height);
        this.graphic.fill(this.colour);
        this.coordinate = [x, y];
        this.centerCoordinate = [x + width / 2, y + height / 2];
        this.slotValue = slotValue;

        this.text = new PIXI.Text({
            text: slotValue,
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 0xff1010,
                align: 'center',
            }
        })

        this.text.x = x + 5;
        this.text.y = y + 5;
    }

    getSlotValue() {
        return this.slotValue;
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic);
        container.addChild(this.text);
    }
}