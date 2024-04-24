import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';
import * as TweenJs from '@tweenjs/tween.js'
import { SoundPlayer } from './sound-player';

/**
 * A ball/puck to be dropped on a board.
 */
export class Ball {
    private graphic: PIXI.Graphics;
    private ballRadius: number = 14;
    private ballDiameter: number = this.ballRadius * 2;
    private coordinate: Coordinate;
    private soundPlayer: SoundPlayer = SoundPlayer.getInstance();
    private gravity: number = 0.02;
    private velocityX: number = 0;
    private velocityY: number = 0;
    positionX: number = 0;
    positionY: number = 0;

    /**
     * Creates an instance of Ball.
     * @param {number} x - The x-coordinate of the ball.
     * @param {number} y - The y-coordinate of the ball.
     * @param {Coordinate} initialPosition - The initial position of the ball.
     */
    constructor(x: number, y: number, initialPosition: Coordinate) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(0, 0, this.ballRadius);
        this.graphic.fill("purple");
        this.graphic.position.set(x, y);
        this.coordinate = initialPosition;
    }

    /**
     * Sets the position of the ball.
     * @param {number} x - The x-coordinate of the ball.
     * @param {number} y - The y-coordinate of the ball.
     */
    setPosition(x: number, y: number) {
        this.graphic.position.set(x, y)
    }

    // Written with GPT's assistance
    /**
     * Updates the position of the ball based on physics simulation.
     */
    applyGravity() {
        // Apply gravity to the ball's velocity
        this.velocityY += this.gravity;

        // Update ball's position based on velocity
        this.graphic.x += this.velocityX;
        this.graphic.y += this.velocityY;

        // Update the coordinate
        this.coordinate = [this.graphic.x, this.graphic.y];
    }

    getBallProperties(): any {
        return [this.graphic.x, this.graphic.y, this.ballRadius, this.velocityX, this.velocityY];
    }

    // Written with GPT's assistance
    updateVelocity(newVelocityX: number, newVelocityY: number) {
        this.velocityX = newVelocityX;
        this.velocityY = newVelocityY;
    }
    
    /**
     * Renders the ball on the specified container.
     * @param {PIXI.Container} container - The container to render the ball in.
     */
    render(container: PIXI.Container) {
        container.addChild(this.graphic);
        TweenJs.update();
    }
}