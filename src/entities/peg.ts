import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';

/**
 * A peg to be placed on a board to affect the movement of a ball.
 */
export class Peg {
    private graphic: PIXI.Graphics;
    private colour: string = "red";
    private radius: number;

    /**
     * Creates an instance of Peg.
     * @param {number} x - The x-coordinate of the peg.
     * @param {number} y - The y-coordinate of the peg.
     * @param {number} radius - The radius of the peg.
     */
    constructor(x: number, y: number, radius: number) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(0, 0, radius);
        this.graphic.fill(this.colour);
        this.graphic.position.set(x, y);
        this.radius = radius;
    }

    /**
     * Gets the position of the peg.
     * @returns {Coordinate} The position of the peg as a coordinate array [x, y].
     */
    getPosition(): Coordinate {
        return [this.graphic.x, this.graphic.y] as Coordinate;
    }

    // Written with GPT's assistance
    /**
     * Checks if the ball collides with this peg.
     * @param {number} ballX - The x-coordinate of the ball.
     * @param {number} ballY - The y-coordinate of the ball.
     * @param {number} ballRadius - The radius of the ball.
     * @returns {boolean} True if collision occurs, false otherwise.
     */
    collidesWithBall(ballX: number, ballY: number, ballRadius: number): boolean {
        const distanceSquared = (ballX - this.graphic.x) ** 2 + (ballY - this.graphic.y) ** 2;
        const radiusSquared = (this.radius + ballRadius) ** 2;
        return distanceSquared <= radiusSquared;
    }

    // Written with GPT's assistance
    /**
     * Applies a force to the ball based on the collision with this peg.
     * @param {number} ballX - The x-coordinate of the ball.
     * @param {number} ballY - The y-coordinate of the ball.
     * @param {number} ballRadius - The radius of the ball.
     * @param {number} ballVelocityX - The current velocity of the ball along the x-axis.
     * @param {number} ballVelocityY - The current velocity of the ball along the y-axis.
     * @param {number} force - The magnitude of the force to apply.
     */
    applyCollisionForce(ballX: number, ballY: number, ballRadius: number, ballVelocityX: number, ballVelocityY: number, force: number) {
        // Calculate direction of force
        const dx = ballX - this.graphic.x;
        const dy = ballY - this.graphic.y;
        const distance = Math.sqrt(dx ** 2 + dy ** 2);
        const nx = dx / distance; // Normalized direction vector x-component
        const ny = dy / distance; // Normalized direction vector y-component

        // Apply force to the ball
        const accelerationX = (force / ballRadius) * nx; // F = ma, solve for a
        const accelerationY = (force / ballRadius) * ny; // F = ma, solve for a
        ballVelocityX += accelerationX;
        ballVelocityY += accelerationY;

        return [ballVelocityX, ballVelocityY]
    }

    /**
     * Renders the peg on the specified container.
     * @param {PIXI.Container} container - The container to render the peg in.
     */
    render(container: PIXI.Container) {
        container.addChild(this.graphic);
    }
}
