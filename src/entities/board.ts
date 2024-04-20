import * as PIXI from 'pixi.js';
import { Peg } from './peg';
import { Ball } from './ball';

export class Board {
    private pegs: Peg[][];
    private pegRadius: number = 5;
    private pegDiameter: number = this.pegRadius * 2;

    constructor(canvasWidth: number, canvasHeight: number, levels: number = 3) {
        this.pegs = [];

        // TODO: Even rows should have 1 less peg
        for (let x = 0; x < levels; x++) {
            this.pegs[x] = [];
        }

        let xOffset = 40;
        const horSpaceBetweenPegs = 30 + this.pegDiameter;
        const oddRowOffset = (this.pegDiameter * 2) + horSpaceBetweenPegs;
        let yOffset = 60;
        const verSpaceBetweenPegs = 30 + this.pegDiameter;
    
        for (let i = 0; i < 3; i++) {
            if (i % 2 === 0) {
                xOffset = 40;
            } else {
                xOffset = oddRowOffset;
            }

            let xPosition = xOffset;
            for (let j = 0; j < 5; j++) {
                xPosition = xPosition + horSpaceBetweenPegs;
    
                let peg = new Peg(xPosition, yOffset, this.pegRadius);
                this.pegs[i][j] = peg;
            }
    
            yOffset += verSpaceBetweenPegs;
        }
    }

    render(container: PIXI.Container) {
        this.pegs.forEach((row) => {
            row.forEach((peg) => {
                peg.render(container);
            });
        });
    }
}