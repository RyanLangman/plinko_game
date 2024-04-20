import * as PIXI from 'pixi.js';
import { Peg } from './peg';
import { Ball } from './ball';
import { Slot } from './slot';

export class Board {
    private slots: Slot[];
    private pegs: Peg[][];
    private pegRadius: number = 5;
    private pegDiameter: number = this.pegRadius * 2;

    constructor(canvasWidth: number, canvasHeight: number, levels: number = 3) {
        // TODO: Refactor to own method
        const pegsPerRow = 5;
        this.pegs = [];
        this.slots = [];

        // TODO: Even rows should have 1 less peg
        for (let x = 0; x < levels; x++) {
            this.pegs[x] = [];
        }

        let xOffset = 40;
        const horSpaceBetweenPegs = 30 + this.pegDiameter;
        const oddRowOffset = (this.pegDiameter * 2) + horSpaceBetweenPegs;
        let yOffset = 60;
        const verSpaceBetweenPegs = 30 + this.pegDiameter;
    
        for (let i = 0; i < levels; i++) {
            if (i % 2 === 0) {
                xOffset = 40;
            } else {
                xOffset = oddRowOffset;
            }

            let xPosition = xOffset;
            for (let j = 0; j < pegsPerRow; j++) {
                xPosition = xPosition + horSpaceBetweenPegs;
    
                let peg = new Peg(xPosition, yOffset, this.pegRadius);
                this.pegs[i][j] = peg;
            }
    
            yOffset += verSpaceBetweenPegs;
        }

        // TODO: Refactor to own method
        const totalSlots = pegsPerRow - 1
        const slotWidth = 39;
        const slotHeight = 30;
        yOffset = (yOffset + this.pegDiameter) - verSpaceBetweenPegs;
        let xPosition = 80;
        for (let i = 0; i < totalSlots; i++) {
            const slotValue = i === 0 || i === totalSlots - 1 ? "10" : "0";
            let slot = new Slot(xPosition, yOffset, slotWidth, slotHeight, slotValue);
            this.slots[i] = slot;
            xPosition += slotWidth + 2;
        }
    }

    render(container: PIXI.Container) {
        this.pegs.forEach((row) => {
            row.forEach((peg) => {
                peg.render(container);
            });
        });

        this.slots.forEach((slot) => {
            slot.render(container);
        });
    }
}