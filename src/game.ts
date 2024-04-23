import * as PIXI from 'pixi.js';
import { Board } from './entities/board';
import { Scoreboard } from './entities/scoreboard';
import { PlayButton } from './entities/play-button';
import { PlinkoBackendService } from './backend/plinko-backend-service';
import { Splash } from './entities/splash';
import { SoundPlayer } from './entities/sound-player';

export class Game {
    private app: PIXI.Application;
    private gameStarted: boolean = false;
    private splash: Splash;
    private scoreBoard: Scoreboard;
    private pegBoard: Board;
    private playButton: PlayButton;
    private canvasWidth: number = 800;
    private canvasHeight: number = 600;
    private updateInterval: number = 1000;
    private lastUpdateTime: number = 0;
    private backendService: PlinkoBackendService = new PlinkoBackendService();
    private shouldPlayWinningSlotSound: boolean;
    private soundPlayer: SoundPlayer = SoundPlayer.getInstance();

    async init() {
        this.app = new PIXI.Application();

        await this.app.init({
            width: this.canvasWidth,
            height: this.canvasHeight,
            backgroundColor: "#e1e1e1"
        });

        document.body.appendChild(this.app.canvas);

        this.loadAssets();

        this.splash = new Splash();
        await this.splash.init(this.canvasWidth, this.canvasHeight, async () => await this.startGame());

        this.app.renderer.render(this.app.stage);

        this.app.ticker.add(this.gameLoop.bind(this));
    }

    loadAssets() {

    }

    async startGame() {
        this.gameStarted = true;
        this.soundPlayer.play("backgroundMusic");
        this.splash.remove(this.app.stage);
        this.scoreBoard = new Scoreboard(this.canvasWidth);
        this.pegBoard = new Board(7);
        this.playButton = new PlayButton();
        await this.playButton.init(this.canvasWidth, this.canvasHeight, async () => {
            this.playButton.disable();

            const response = await this.backendService.play(1, 10);

            this.shouldPlayWinningSlotSound = response.isWinningSlot
            
            this.scoreBoard.updateBalance(response.newBalance, response.slotEarnings, 10);

            this.pegBoard.dropBall(response.slot);
        });
    }

    gameLoop(ticker: PIXI.Ticker): void {
        this.logic();
        this.draw();
    }

    logic(): void {
        if (this.gameStarted) {
            const currentTime = Date.now();
            const elapsedTimeSinceLastUpdate = currentTime - this.lastUpdateTime;

            if (elapsedTimeSinceLastUpdate >= this.updateInterval) {
                this.lastUpdateTime = currentTime;

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
    }

    draw(): void {
        if (this.gameStarted) {
            this.scoreBoard.render(this.app.stage);
            this.pegBoard.render(this.app.stage);
            this.playButton.render(this.app.stage);

            this.app.renderer.render(this.app.stage);
        } else {
            this.splash.render(this.app.stage);
        }
    }
}
