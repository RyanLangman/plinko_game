import * as PIXI from 'pixi.js';

export class PlayButton {
    private playButton: PIXI.Sprite;
    private playText: PIXI.Text;
    private graphic: PIXI.Graphics;
    private colour: string = "blue";
    private readonly paddingFromEdge: number = 40;
    private buttonText: PIXI.Text;
    private enabled: boolean = true;
    private enabledTexture: PIXI.Texture;
    private disabledTexture: PIXI.Texture;

    async init(canvasWidth: number, canvasHeight: number, clickHandler: Function) {
        const disabledTexture = await PIXI.Assets.load('/assets/ui/btn-play-disabled.png');
        this.disabledTexture = disabledTexture;

        const enabledTexture = await PIXI.Assets.load('/assets/ui/btn-play-enabled.png');
        this.enabledTexture = enabledTexture;

        this.playButton = new PIXI.Sprite(this.enabledTexture);

        this.playButton.anchor.set(0.5, 0.5);

        this.playButton.position.set(canvasWidth / 2, canvasHeight - this.paddingFromEdge);
        this.playButton.scale.set(0.35, 0.35)

        this.playButton.interactive = true;
        this.playButton.on('click', (event) => {
            if (this.enabled) {
                clickHandler();
                this.enable
            }
        });

        this.playText = new PIXI.Text({
            text: "DROP",
            style: {
                fontFamily: "Arial",
                fontSize: 18,
                fill: "#FFF",
                align: "center"
            }
        });

        this.playText.anchor.set(0.5, 0.5);
        this.playText.position.set(this.playButton.x, this.playButton.y);
    }

    enable() {
        this.enabled = true;
        this.playButton.texture = this.enabledTexture;
    };

    disable() {
        this.enabled = false;
        this.playButton.texture = this.disabledTexture;
    }

    render(container: PIXI.Container) {
        container.addChild(this.playButton);
        container.addChild(this.playText);
    }

    remove(container: PIXI.Container) {
        container.removeChild(this.playButton);
        container.removeChild(this.playText);
    }
}