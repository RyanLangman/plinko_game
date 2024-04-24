import * as PIXI from 'pixi.js';

export class PlayButton {
    private playButton: PIXI.Sprite;
    private playText: PIXI.Text;
    private readonly paddingFromEdge: number = 40;
    private enabled: boolean = true;

    constructor(canvasWidth: number, canvasHeight: number, clickHandler: Function) {
        (async () => {
            this.playButton = new PIXI.Sprite(PIXI.Assets.get("btn-play-enabled"));

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
        })();
    }

    enable() {
        this.enabled = true;
        this.playButton.texture = PIXI.Assets.get("btn-play-enabled");
    };

    disable() {
        this.enabled = false;
        this.playButton.texture = PIXI.Assets.get("btn-play-disabled");
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