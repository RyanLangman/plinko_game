import * as PIXI from 'pixi.js';
import { Peg } from './peg';
import { Ball } from './ball';
import { Slot } from './slot';
import { Coordinate } from '../types/types';
import {Howl, Howler} from 'howler';

export class Board {
    private slots: Slot[];
    private pegs: Peg[][];
    private pegRadius: number = 5;
    private pegDiameter: number = this.pegRadius * 2;
    private ball: Ball;
    private ballTraversalCoordinates: Coordinate[] = [];
    private predeterminedSlot: Slot;

    constructor(levels: number = 3) {
        // TODO: Refactor to own method
        const maxPegsPerRow = 10;
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
        const slotValues = [10,5,2,1,0,1,2,5,10];
        for (let i = 0; i < totalSlots; i++) {
            let slot = new Slot(xPosition, yOffset, slotWidth, slotHeight, slotValues[i]);
            this.slots[i] = slot;
            xPosition += slotWidth + 2;
        }

        this.ball = new Ball(40 + (horSpaceBetweenPegs * 2), 30, [0, 2]);
    }

    dropBall(slotIndex: number) {
        let pegPath: Coordinate[] = [];
        this.ball.setPosition(40 + ((30 + this.pegDiameter) * 2), 30);
        
        this.predeterminedSlot = this.slots[slotIndex];

        const bottomPegRow = this.pegs.length - 1;
        if (Math.round(Math.random()) == 1) {
            pegPath.unshift([bottomPegRow, slotIndex]);
        } else {
            pegPath.unshift([bottomPegRow, slotIndex + 1]);
        }

        for (let i = this.pegs.length - 1; i > 0; i--) {
            if (i == 0) {
                break;
            }

            const lastCoordinate = pegPath[0];
            let aboveLeftPegCoord: Coordinate = [0,0];
            let aboveLeftPeg: Peg | undefined;
            let aboveRightPegCoord: Coordinate = [0,0];
            let aboveRightPeg: Peg | undefined;

            if (i % 2 != 0) {
                aboveLeftPegCoord = [i - 1, lastCoordinate[1]];
                aboveLeftPeg = this.pegs[aboveLeftPegCoord[0]][aboveLeftPegCoord[1]];

                aboveRightPegCoord = [i - 1, lastCoordinate[1] + 1];
                aboveRightPeg = this.pegs[aboveRightPegCoord[0]][aboveRightPegCoord[1]];
            } else {
                aboveLeftPegCoord = [i - 1, lastCoordinate[1] - 1];
                aboveLeftPeg = this.pegs[aboveLeftPegCoord[0]][aboveLeftPegCoord[1]];

                aboveRightPegCoord = [i - 1, lastCoordinate[1]];
                aboveRightPeg = this.pegs[aboveRightPegCoord[0]][aboveRightPegCoord[1]];
            }

            if (aboveLeftPeg != undefined && aboveRightPeg != undefined) {
                if (Math.round(Math.random()) == 1) {
                    pegPath.unshift(aboveLeftPegCoord);
                } else {
                    pegPath.unshift(aboveRightPegCoord);
                }
            } else if (aboveRightPegCoord == undefined) {
                pegPath.unshift(aboveLeftPegCoord);
            } else {
                pegPath.unshift(aboveRightPegCoord);
            }
        }

        pegPath.forEach((pegArrayPosition) => {
            const peg = this.pegs[pegArrayPosition[0]][pegArrayPosition[1]]

            if (peg == undefined) {
                console.error('Peg not found, cannot move ball.');
                return;
            }

            const nextPosition = peg.getPosition();
            nextPosition[1] -= 15;

            this.ballTraversalCoordinates.push(nextPosition);
        })

        this.ballTraversalCoordinates.push(this.predeterminedSlot.centerCoordinate);
        
        return this.predeterminedSlot.getSlotValue();
    }

    moveBall(onComplete: Function) {
        if (this.ballTraversalCoordinates.length > 0) {
            this.ball.setAnimationTimeline(this.ballTraversalCoordinates, () => onComplete());
            this.ballTraversalCoordinates = [];
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

        this.ball.render(container);
    }
}