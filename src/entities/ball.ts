import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';
import * as TweenJs from '@tweenjs/tween.js'
import { SoundPlayer } from './sound-player';

/**
 * A ball/puck to be dropped on a board.
 */
export class Ball {
    private graphic: PIXI.Sprite;
    private ballRadius: number = 10;
    private ballDiameter: number = this.ballRadius * 2;
    private soundPlayer: SoundPlayer = SoundPlayer.getInstance();

    /**
     * Creates an instance of Ball.
     * @param {number} x - The x-coordinate of the ball.
     * @param {number} y - The y-coordinate of the ball.
     * @param {Coordinate} initialPosition - The initial position of the ball.
     */
    constructor(x: number, y: number) {
        this.graphic = new PIXI.Sprite(PIXI.Assets.get("puck"));
        this.graphic.width = this.ballDiameter;
        this.graphic.height = this.ballDiameter;
        this.graphic.anchor.set(0.5, 0.5);
        this.graphic.position.set(x, y);
    }
    /**
     * Creates a chained set of tweens to animate the ball smoothly.
     * @param {Coordinate[]} coordinates - The coordinates to animate the ball to.
     * @param {Function} onComplete - The function to call when the animation completes.
     */
    setAnimationTimeline(coordinates: Coordinate[], onComplete: Function) {
        const firstCoordinate = coordinates.shift();

        if (firstCoordinate == undefined) {
            throw new Error("Unable to tween, missing coordinates.");
        }

        const speed = 2.5;

        let firstTween = new TweenJs.Tween(this.graphic)
            .to({ x: firstCoordinate[0], y: firstCoordinate[1] })
            .duration(10)
            .easing(TweenJs.Easing.Quadratic.Out)
            .onComplete(() => {
                this.soundPlayer.play("pegCollideSound1");
            });

        let currentTween = firstTween;

        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            const nextCoord = coordinates[i + 1];

            const tween = new TweenJs.Tween(this.graphic)
                .to({ x: coord[0], y: coord[1] })
                .duration(75 * speed)
                .easing(TweenJs.Easing.Quadratic.In)
                .onStart(() => {
                    this.soundPlayer.play("pegCollideSound1");
                });

            currentTween.chain(tween);
            currentTween = tween;

            if (nextCoord != undefined) {
                if (Math.random() > 0.5) {
                    const bounceUp = new TweenJs.Tween(this.graphic)
                    .to({ x: coord[0], y: coord[1] - 15 })
                    .duration(100 * speed)
                    .easing(TweenJs.Easing.Quadratic.Out);

                    currentTween.chain(bounceUp);
                    currentTween = bounceUp;

                    const bounceDown = new TweenJs.Tween(this.graphic)
                        .to({ x: coord[0], y: coord[1] })
                        .duration(100 * speed)
                        .easing(TweenJs.Easing.Quadratic.In)
                        .onStart(() => {
                            this.soundPlayer.play("pegCollideSound2");
                        });

                    currentTween.chain(bounceDown);
                    currentTween = bounceDown;
                }

                const xBounceModifier = nextCoord[0] > coord[0] ?
                    15 : -15;

                const bounceBackTween = new TweenJs.Tween(this.graphic)
                    .to({ x: coord[0] + xBounceModifier, y: coord[1] - 10 })
                    .duration(100 * speed)
                    .easing(TweenJs.Easing.Quadratic.Out);

                currentTween.chain(bounceBackTween);
                currentTween = bounceBackTween;
            }
            else {
                currentTween.onComplete(() => onComplete());
            }
        }

        firstTween.start();
    }

    /**
     * Sets the position of the ball.
     * @param {number} x - The x-coordinate of the ball.
     * @param {number} y - The y-coordinate of the ball.
     */
    setPosition(x: number, y: number) {
        this.graphic.position.set(x, y)
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