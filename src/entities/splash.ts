import * as PIXI from 'pixi.js';

/**
 * Splash screen with a start game button to begin the game.
 */
export class Splash {
  private startButton: PIXI.Sprite;
  private startText: PIXI.Text;

  /**
   * Initializes the splash screen.
   * @param {number} canvasWidth - The width of the canvas.
   * @param {number} canvasHeight - The height of the canvas.
   * @param {Function} onClick - The click event handler for the start button.
   */
  async init(canvasWidth: number, canvasHeight: number, onClick: Function) {
    this.startButton = new PIXI.Sprite(PIXI.Assets.get("btn-play-enabled"));

    this.startButton.anchor.set(0.5, 0.5);

    this.startButton.position.set(canvasWidth / 2, canvasHeight / 2);
    this.startButton.scale.set(0.5, 0.5)

    this.startButton.interactive = true;
    this.startButton.on('click', () => onClick());

    this.startText = new PIXI.Text({
      text: "START",
      style: {
        fontFamily: "Arial",
        fontSize: 24,
        fill: "#FFF",
        align: "center"
      }
    });

    this.startText.anchor.set(0.5, 0.5);
    this.startText.position.set(this.startButton.x, this.startButton.y);
  }

  /**
   * Renders the splash screen onto the PIXI container.
   * @param {PIXI.Container} container - The PIXI container to render onto.
   */
  render(container: PIXI.Container) {
    container.addChild(this.startButton);
    container.addChild(this.startText);
  }

  /**
   * Removes the splash screen from the PIXI container.
   * @param {PIXI.Container} container - The PIXI container to remove from.
   */
  remove(container: PIXI.Container) {
    container.removeChild(this.startButton);
    container.removeChild(this.startText);
  }
}
