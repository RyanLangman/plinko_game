import * as PIXI from 'pixi.js';

/**
 * Represents a play button that actions a game event based on the clickHandler.
 */
export class PlayButton {
    private playButton: PIXI.Sprite;
    private playText: PIXI.Text;
    private readonly paddingFromEdge: number = 40;
    private enabled: boolean = true;

    /**
     * Creates an instance of PlayButton.
     * @param {number} canvasWidth - The width of the canvas.
     * @param {number} canvasHeight - The height of the canvas.
     * @param {Function} clickHandler - The function to call when the button is clicked.
     */
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

    /**
     * Enables the play button.
     */
    enable() {
        this.enabled = true;
        this.playButton.texture = PIXI.Assets.get("btn-play-enabled");
    };

    /**
     * Disables the play button.
     */
    disable() {
        this.enabled = false;
        this.playButton.texture = PIXI.Assets.get("btn-play-disabled");
    }

    /**
     * Renders the play button on the specified container.
     * @param {PIXI.Container} container - The container to render the play button in.
     */
    render(container: PIXI.Container) {
        container.addChild(this.playButton);
        container.addChild(this.playText);
    }

    /**
     * Removes the play button from the specified container.
     * @param {PIXI.Container} container - The container to remove the play button from.
     */
    remove(container: PIXI.Container) {
        container.removeChild(this.playButton);
        container.removeChild(this.playText);
    }
}
