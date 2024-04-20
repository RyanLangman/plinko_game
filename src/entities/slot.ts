import * as PIXI from 'pixi.js';

export class Slot {
    private graphic: PIXI.Graphics;
    private colour: string = "yellow";
    private text: PIXI.Text;

    constructor(x: number, y: number, width: number, height: number, text: string) {
        this.graphic = new PIXI.Graphics();
        this.graphic.rect(x, y, width, height);
        this.graphic.fill(this.colour);

        this.text = new PIXI.Text({
            text: text,
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

    render(container: PIXI.Container) {
        container.addChild(this.graphic);
        container.addChild(this.text);
    }
}