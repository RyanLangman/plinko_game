import * as PIXI from 'pixi.js';

export class Button {
    private graphic: PIXI.Graphics;
    private colour: string = "blue";
    private readonly paddingFromEdge: number = 40;
    private buttonText: PIXI.Text;

    constructor(canvasWidth: number, canvasHeight: number) {
        this.graphic = new PIXI.Graphics();
        this.graphic.rect(this.paddingFromEdge, 
            canvasHeight - this.paddingFromEdge,
            canvasWidth - this.paddingFromEdge,
            canvasHeight - this.paddingFromEdge
        );
        this.graphic.fill(this.colour);

        this.buttonText = new PIXI.Text({
            text: "PLAY",
            style: {
                fontFamily: 'Arial',
                fontSize: 12,
                fill: 0xff1010,
                align: 'center',
            }
        });
    }
}