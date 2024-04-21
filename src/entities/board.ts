import * as PIXI from 'pixi.js';
import { Peg } from './peg';
import { Ball } from './ball';
import { Slot } from './slot';
import { Coordinate } from './types';

export class Board {
    private slots: Slot[];
    private pegs: Peg[][];
    private pegRadius: number = 5;
    private pegDiameter: number = this.pegRadius * 2;
    private ball: Ball;

    constructor(canvasWidth: number, canvasHeight: number, levels: number = 3) {
        // TODO: Refactor to own method
        const maxPegsPerRow = 5;
        this.pegs = [];
        this.slots = [];

        for (let x = 0; x < levels; x++) {
            this.pegs[x] = [];
        }

        let xOffset = 40;
        const horSpaceBetweenPegs = 30 + this.pegDiameter;
        const oddRowOffset = (this.pegDiameter * 2) + horSpaceBetweenPegs;
        let yOffset = 60;
        const verSpaceBetweenPegs = 30 + this.pegDiameter;
    
        let pegsPerRow = maxPegsPerRow;
        for (let i = 0; i < levels; i++) {
            if (i % 2 === 0) {
                xOffset = 40;
                pegsPerRow = maxPegsPerRow;
            } else {
                xOffset = oddRowOffset;
                pegsPerRow = maxPegsPerRow - 1;
            }

            let xPosition = xOffset;
            for (let j = 0; j < pegsPerRow; j++) {
                let peg = new Peg(xPosition, yOffset, this.pegRadius);
                this.pegs[i][j] = peg;

                xPosition = xPosition + horSpaceBetweenPegs;
            }
    
            yOffset += verSpaceBetweenPegs;
        }

        // TODO: Refactor to own method
        const totalSlots = maxPegsPerRow - 1
        const slotWidth = 39;
        const slotHeight = 30;
        yOffset = (yOffset + this.pegDiameter) - verSpaceBetweenPegs;
        let xPosition = 40;
        for (let i = 0; i < totalSlots; i++) {
            const slotValue = i === 0 || i === totalSlots - 1 ? 10 : 0;
            let slot = new Slot(xPosition, yOffset, slotWidth, slotHeight, slotValue);
            this.slots[i] = slot;
            xPosition += slotWidth + 2;
        }

        this.ball = new Ball(40 + (horSpaceBetweenPegs * 2), 30, [0, 2]);
    }

    dropBall() {
        // reflect the score on the score board
        const maxIndex = this.slots.length - 1;
        const slotToFallInto = Math.floor(Math.random() * (maxIndex - 0 + 1)) + 0;
        const slot = this.slots[slotToFallInto];

        console.log(`Puck lands in: ${slotToFallInto}`);
        
        this.ball.setPosition(this.slots[slotToFallInto].centerCoordinate);

        return slot.getSlotValue();
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

        this.ball.render(container);
    }
}