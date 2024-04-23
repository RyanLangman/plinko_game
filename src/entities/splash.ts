import * as PIXI from 'pixi.js';

export class Splash {
    private startButton: PIXI.Sprite;

    async init(canvasWidth: number, canvasHeight: number, onClick: Function) {
      const texture = await PIXI.Assets.load('/assets/ui/btn-play-enabled.png');
    
      this.startButton = new PIXI.Sprite(texture);

      this.startButton.anchor.set(0.5, 0.5);

      this.startButton.position.set(canvasWidth / 2, canvasHeight / 2);
      this.startButton.scale.set(0.5, 0.5)

      this.startButton.interactive = true;
      this.startButton.on('click', () => onClick());
    }
  
    render(container: PIXI.Container) {
      container.addChild(this.startButton);
    }

    remove(container: PIXI.Container) {
      container.removeChild(this.startButton);
    }
  }