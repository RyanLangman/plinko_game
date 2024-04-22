import * as PIXI from 'pixi.js';

export class Scoreboard {
    private board: PIXI.Graphics;
    private balance: number;
    private scoreTextsBuffer: Array<PIXI.Text> = [];
    private scoreTexts: Array<PIXI.Text> = [];
    private balanceText: PIXI.Text;
    private readonly textSpacerX: number = 10;
    private readonly textSpacerY: number = 15;
    private readonly startX: number;
    private readonly startY: number;
    private readonly boardWidth: number = 170;
    private readonly boardHeight: number = 400;
    private readonly paddingFromEdge: number = 40;

    constructor(canvasWidth: number) {
        this.balance = 100;
        this.startX = canvasWidth - (this.boardWidth + this.paddingFromEdge);
        this.startY = this.paddingFromEdge;

        this.board = new PIXI.Graphics();
        this.board.rect(this.startX, this.startY, this.boardWidth, this.boardHeight);
        this.board.fill("#a1a1a1");

        this.balanceText = new PIXI.Text({
            text: `Balance: ${this.balance}`,
            style: {
                fontFamily: 'Arial',
                fontSize: 20,
                fill: 0xff1010,
                align: 'center',
            },
            x: this.startX + this.textSpacerX,
            y: this.startY + this.textSpacerY
        });
    }
    
    updateBalance(newBalance: number, earnings: number, bet: number) {
        this.balance = newBalance;

        let scoreText = new PIXI.Text({
            text: earnings >= bet ?
                `Won ${earnings} credits` :
                `Lost ${bet - earnings} credits`,
            style: {
                fontFamily: 'Arial',
                fontSize: 14,
                fill: 0xff1010,
                align: 'center',
            }
        });

        scoreText.x = this.startX + this.textSpacerX;
        scoreText.y = this.startY + (this.textSpacerY * 2) + (this.textSpacerY * (this.scoreTexts.length + 1));

        this.scoreTextsBuffer.push(scoreText);
    }

    displayLatestScore() {
        this.balanceText.text = `Balance: ${this.balance}`;
        this.balanceText.text = `Balance: ${this.balance}`;

        const lastPlay = this.scoreTextsBuffer.shift();
        if (lastPlay) {
            this.scoreTexts.push(lastPlay);
        }
    }

    render(container: PIXI.Container) {
        container.addChild(this.board);
        container.addChild(this.balanceText);

        this.scoreTexts.forEach((scoreText) => {
            container.addChild(scoreText);
        })
    }
}