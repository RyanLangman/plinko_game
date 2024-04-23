import * as PIXI from 'pixi.js';
import { Coordinate } from '../types/types';
import * as TweenJs from '@tweenjs/tween.js'

export class Ball {
    private graphic: PIXI.Graphics;
    private ballRadius: number = 10;
    private ballDiameter: number = this.ballRadius * 2;
    private coordinate: Coordinate;

    constructor(x: number, y: number, initialPosition: Coordinate) {
        this.graphic = new PIXI.Graphics();
        this.graphic.circle(0, 0, this.ballRadius);
        this.graphic.fill("purple");
        this.graphic.position.set(x, y);
        this.coordinate = initialPosition;
    }

    setAnimationTimeline(coordinates: Coordinate[], onComplete: Function) {
        const firstCoordinate = coordinates.shift();

        if (firstCoordinate == undefined) {
            throw new Error("Unable to tween, missing coordinates.");
        }

        let firstTween = new TweenJs.Tween(this.graphic)
            .to({ x: firstCoordinate[0], y: firstCoordinate[1] })
            .duration(600)
            .easing(TweenJs.Easing.Exponential.Out);

        let currentTween = firstTween;

        for (let i = 0; i < coordinates.length; i++) {
            const coord = coordinates[i];
            const nextCoord = coordinates[i + 1];

            const tween = new TweenJs.Tween(this.graphic)
                .to({ x: coord[0], y: coord[1] })
                .duration(400)
                .easing(TweenJs.Easing.Quadratic.InOut);

            currentTween.chain(tween);
            currentTween = tween;

            if (nextCoord != undefined) {
                const xBounceModifier = nextCoord[0] > coord[0] ?
                    15 : -15;

                const bounceBackTween = new TweenJs.Tween(this.graphic)
                    .to({ x: coord[0] + xBounceModifier, y: coord[1] - 5 })
                    .duration(400)
                    .easing(TweenJs.Easing.Cubic.InOut)

                currentTween.chain(bounceBackTween);
                currentTween = bounceBackTween;
            }
            else {
                currentTween.onComplete(() => onComplete());
            }
        }

        firstTween.start();
    }

    setPosition(x: number, y: number) {
        this.graphic.position.set(x, y)
    }

    render(container: PIXI.Container) {
        container.addChild(this.graphic);
        TweenJs.update();
    }
}