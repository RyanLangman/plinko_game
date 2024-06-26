import * as PIXI from 'pixi.js';
import { Board } from './entities/board';
import { Scoreboard } from './entities/scoreboard';
import { PlayButton } from './entities/play-button';
import { PlinkoBackendService } from './backend/plinko-backend-service';
import { Splash } from './entities/splash';
import { SoundPlayer } from './entities/sound-player';
import { SoundKey } from './enums/sound-keys';

/**
 * Primary game object that loads assets, instantiates necessary game objects and initializes game loop.
 */
export class Game {
    private app: PIXI.Application;
    private gameStarted: boolean = false;
    private splash: Splash;
    private scoreBoard: Scoreboard;
    private pegBoard: Board;
    private playButton: PlayButton;
    private canvasWidth: number = 800;
    private canvasHeight: number = 600;
    private backendService: PlinkoBackendService = new PlinkoBackendService();
    private shouldPlayWinningSlotSound: boolean;
    private soundPlayer: SoundPlayer;

    /**
     * Initializes the game, loading assets, creating the initial splash screen and binding gameloop to the PixiJS ticker.
     */
    async init() {
        this.app = new PIXI.Application();

        await this.app.init({
            width: this.canvasWidth,
            height: this.canvasHeight,
            backgroundColor: "#e1e1e1"
        });

        document.body.appendChild(this.app.canvas);
        
        await this.loadAssets();
        await this.setupSplash();

        this.app.renderer.render(this.app.stage);

        this.app.ticker.add(this.gameLoop.bind(this));
    }

    /**
     * Loads assets for the game including sounds, sprite sheet and setting canvas background.
     */
    async loadAssets() {
        this.soundPlayer = SoundPlayer.getInstance();

        const sheetTexture = await PIXI.Assets.load('assets/ui/spritesheet.png');

        PIXI.Assets.add({
            alias: 'plinko-sheet',
            src: 'assets/ui/spritesheet.json',
            data: {texture: sheetTexture}
        });

        await PIXI.Assets.load('plinko-sheet')

        const background = await PIXI.Assets.load('assets/ui/background.jpg');
        const graphic = new PIXI.Sprite(background);
        graphic.position.set(0, 0);
        graphic.width = this.canvasWidth;
        graphic.height = this.canvasHeight;

        this.app.stage.addChild(graphic);
    }

    async setupSplash() {
        this.splash = new Splash();
        await this.splash.init(this.canvasWidth, this.canvasHeight, async () => await this.startGame());
    }

    /**
     * Starts the game.
     */
    async startGame() {
        this.gameStarted = true;

        this.splash.remove(this.app.stage);

        this.scoreBoard = new Scoreboard(this.canvasWidth);

        this.pegBoard = new Board(7);

        this.playButton = new PlayButton(this.canvasWidth, this.canvasHeight, async () => {
            this.playButton.disable();

            const response = await this.backendService.play(1, 10);

            this.shouldPlayWinningSlotSound = response.isWinningSlot
            
            this.scoreBoard.updateBalance(response.newBalance, response.slotEarnings, 10);

            this.pegBoard.dropBall(response.slot);
        });

        this.soundPlayer.play(SoundKey.BackgroundMusic);
    }

    /**
     * The game loop calls logic and draw for performing game logic and drawing.
     */
    gameLoop(): void {
        this.logic();
        this.draw();
    }

    /**
     * Performs game logic.
     */
    logic(): void {
        if (this.gameStarted) {
            this.pegBoard.moveBall(() => {
                this.scoreBoard.displayLatestScore();
                this.playButton.enable();
                
                if (this.shouldPlayWinningSlotSound) {
                    this.soundPlayer.play("winningSlotSound");
                } else {
                    this.soundPlayer.play("losingSlotSound");
                }
            });
        }
    }

    /**
     * Draws game elements.
     */
    draw(): void {
        if (this.gameStarted) {
            this.scoreBoard.render(this.app.stage);
            this.pegBoard.render(this.app.stage);
            this.playButton.render(this.app.stage);
        } else {
            this.splash.render(this.app.stage);
        }
    }
}
