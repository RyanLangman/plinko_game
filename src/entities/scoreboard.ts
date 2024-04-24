import * as PIXI from 'pixi.js';

/**
 * Scoreboard indicates the player's score as they play the game.
 */
export class Scoreboard {
    private topLeftBoard: PIXI.Sprite;
    private topRightBoard: PIXI.Sprite;
    private leftBoards: PIXI.Sprite[] = [];
    private rightBoards: PIXI.Sprite[] = [];
    private bottomLeftBoard: PIXI.Sprite;
    private bottomRightBoard: PIXI.Sprite;
    private balance: number;
    private scoreTextsBuffer: PIXI.Text[] = [];
    private scoreTexts: PIXI.Text[] = [];
    private balanceText: PIXI.Text;
    private readonly textSpacerX: number = 20;
    private readonly textSpacerY: number = 20;
    private readonly startX: number;
    private readonly startY: number;
    private readonly boardWidth: number = 170;
    private readonly paddingFromEdge: number = 40;

    /**
     * Creates an instance of Scoreboard.
     * @param {number} canvasWidth - The width of the canvas.
     */
    constructor(canvasWidth: number) {
        this.balance = 100;
        this.startX = canvasWidth - (this.boardWidth + this.paddingFromEdge);
        this.startY = this.paddingFromEdge;

        let bottomBoardsStartY = this.startY;

        this.topLeftBoard = new PIXI.Sprite(PIXI.Assets.get("top-left"));
        this.topLeftBoard.position.set(this.startX, this.startY);

        this.topRightBoard = new PIXI.Sprite(PIXI.Assets.get("top-right"));
        this.topRightBoard.position.set(this.startX + 50, this.startY);

        bottomBoardsStartY += this.topLeftBoard.height - 1;

        const midBoardStartY = this.startY + this.topLeftBoard.height - 1;
        for (let i = 0; i < 3; i++) {
            const leftBoard = new PIXI.Sprite(PIXI.Assets.get("mid-left"));
            leftBoard.position.set(this.startX, midBoardStartY + (leftBoard.height * i) - i);
            this.leftBoards.push(leftBoard);

            const rightBoard = new PIXI.Sprite(PIXI.Assets.get("mid-right"));
            rightBoard.position.set(this.startX + 50, midBoardStartY + (leftBoard.height * i) - i);
            this.rightBoards.push(rightBoard);

            bottomBoardsStartY += leftBoard.height - 1;
        }

        this.bottomLeftBoard = new PIXI.Sprite(PIXI.Assets.get("bottom-left"));
        this.bottomLeftBoard.position.set(this.startX, bottomBoardsStartY);

        this.bottomRightBoard = new PIXI.Sprite(PIXI.Assets.get("bottom-right"));
        this.bottomRightBoard.position.set(this.startX + 50, bottomBoardsStartY);

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

    /**
     * Updates the balance and adds a score text to the buffer.
     * @param {number} newBalance - The new balance.
     * @param {number} earnings - The earnings.
     * @param {number} bet - The bet amount.
     */
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

    /**
     * Displays the latest score by updating the balance and moving the score text to the display.
     */
    displayLatestScore() {
        this.balanceText.text = `Balance: ${this.balance}`;

        const lastPlay = this.scoreTextsBuffer.shift();
        if (lastPlay) {
            this.scoreTexts.push(lastPlay);
        }
    }

    /**
     * Renders the scoreboard on the specified container.
     * @param {PIXI.Container} container - The container to render the scoreboard in.
     */
    render(container: PIXI.Container) {
        container.addChild(this.topLeftBoard);
        container.addChild(this.topRightBoard);

        this.leftBoards.forEach((board) => {
            container.addChild(board);
        });

        this.rightBoards.forEach((board) => {
            container.addChild(board);
        });

        container.addChild(this.bottomLeftBoard);
        container.addChild(this.bottomRightBoard);

        container.addChild(this.balanceText);

        this.scoreTexts.forEach((scoreText) => {
            container.addChild(scoreText);
        });
    }
}
