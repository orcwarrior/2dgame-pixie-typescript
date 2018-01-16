import {pointMul} from './utils/utils';

const ForceDir = {
    UP: (f: number) => new PIXI.Point(0, -f),
    RIGHT: (f: number) => new PIXI.Point(f, 0),
    DOWN: (f: number) => new PIXI.Point(0, f),
    LEFT: (f: number) => new PIXI.Point(-f, 0),
};

export enum Direction {
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    LEFT = 'LEFT'
}

export class Force extends PIXI.utils.EventEmitter {

    private durationMS: number;
    private _initialForce: number;
    private easeFunction: Function;
    private _initTimestamp: Date;
    private directionVector: PIXI.Point;

    /* statics */
    public static constant = function () {
        return 1;
    };
    public static easeLinear = function (p: number) {
        return p;
    };

    constructor(dir: Direction | PIXI.Point, initialForce: number, durationMS: number,
                easeFunction: Function = Force.easeLinear) {
        super();

        this.directionVector = this.getDirectionVector(dir);
        this._initialForce = initialForce;
        this.durationMS = durationMS;
        this.easeFunction = easeFunction || Force.easeLinear;

        this._initTimestamp = new Date();
    }

    public getCurrentVector() {
        let progress = this.getForceProgress();
        let force = this._initialForce * this.easeFunction(1 - progress);
        let forceVector = pointMul(this.directionVector, force);
        if (progress >= 1) { this.emit('end', progress, forceVector); }
        return forceVector;

    }
    private getDirectionVector(dir: Direction | PIXI.Point): PIXI.Point {
        let asDirection = (<Direction>dir);
        if (Direction[asDirection]) {
            return ForceDir[asDirection](1);
        } else {
            return <PIXI.Point>dir;
        }
    }
    private getForceProgress(): number {
        let curTimestamp: Date = new Date();
        let diff = (curTimestamp.getTime() - this._initTimestamp.getTime());
        return diff / this.durationMS;
    }
}
