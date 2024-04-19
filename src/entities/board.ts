import * as PIXI from 'pixi.js';
import { Peg } from './peg';
import { Ball } from './ball';

export class Board {
    private pegs: Array<Peg> = new Array<Peg>();
    private pegRadius: number = 7;
    private pegDiameter: number = this.pegRadius * 2;

    constructor(canvasWidth: number, canvasHeight: number, levels: number = 8) {
        // Set the spacing horizontally and vertically between pegs on a row and between rows.
        const horizontalSpaceBetweenPegs = 30;
        const verticalSpaceBetweenPegs = 30;
        
        const maxWidth = levels * (this.pegDiameter + horizontalSpaceBetweenPegs);
        const maxHeight = levels * (this.pegDiameter + verticalSpaceBetweenPegs);

        const startX = (canvasWidth - maxWidth) / 2;
        const startY = (canvasHeight - maxHeight) / 2;

        for (let i = 1; i < levels; i++) {
            const pegsInRow = i + 2;
            const rowXOffset = (levels + 1 - pegsInRow) * (this.pegDiameter + horizontalSpaceBetweenPegs) / 2;
            
            for (let j = 0; j < pegsInRow; j++) {
                const x = startX + rowXOffset + j * (this.pegDiameter + horizontalSpaceBetweenPegs);
                const y = startY + i * (this.pegDiameter + verticalSpaceBetweenPegs);
                const peg = new Peg(x, y, this.pegRadius);
                this.pegs.push(peg);
            }
        }
    }

    render(container: PIXI.Container) {
        this.pegs.forEach((peg) => {
            peg.render(container);
        });
    }
}