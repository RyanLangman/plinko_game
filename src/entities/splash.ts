import * as PIXI from 'pixi.js';

export class Splash {
  private startButton: PIXI.Sprite;
  private startText: PIXI.Text;

  async init(canvasWidth: number, canvasHeight: number, onClick: Function) {
    const texture = await PIXI.Assets.load('/assets/ui/btn-play-enabled.png');
    const disabledTexture = await PIXI.Assets.load('/assets/ui/btn-play-disabled.png');

    this.startButton = new PIXI.Sprite(texture);

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

  render(container: PIXI.Container) {
    container.addChild(this.startButton);
    container.addChild(this.startText);
  }

  remove(container: PIXI.Container) {
    container.removeChild(this.startButton);
    container.removeChild(this.startText);
  }
}