import * as PIXI from 'pixi.js';

export class Button {
    private graphic: PIXI.Graphics;
    private colour: string = "blue";
    private readonly paddingFromEdge: number = 40;
    private buttonText: PIXI.Text;

    constructor(canvasWidth: number, canvasHeight: number, clickHandler: Function) {
        this.graphic = new PIXI.Graphics();
        this.graphic.rect(this.paddingFromEdge, 
            canvasHeight - (this.paddingFromEdge * 2),
            canvasWidth - (this.paddingFromEdge * 2),
            40
        );
        this.graphic.fill(this.colour);
        this.graphic.interactive = true;
        this.graphic.on('pointerdown', (event) => clickHandler());

        this.buttonText = new PIXI.Text({
            text: "PLAY",
            style: {
                fontFamily: 'Arial',
                fontSize: 24,
                fill: 0xff1010,
                align: 'center',
                fontWeight: 'bold'
            }
        });

        this.buttonText.anchor.set(0.5, 0.5);
        this.buttonText.position.set(
            canvasWidth / 2,
            canvasHeight - (this.paddingFromEdge + 20)
        );
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic);
        container.addChild(this.buttonText);
    }
}