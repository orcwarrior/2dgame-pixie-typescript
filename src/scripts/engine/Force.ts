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
    private force: number;
    private easeFunction: Function;
    private _initTimestamp: Date;
    private directionVector: PIXI.Point;

    /* statics */
    public static constant = () => 1;
    public static easeLinear = (p: number) => p;
    public static decelerateLinear = (p: number) => 1 - p;


    constructor(dir: Direction | PIXI.Point, force: number, durationMS: number,
                easeFunction: Function = Force.easeLinear) {
        super();

        this.directionVector = this.getDirectionVector(dir);
        this.force = force;
        this.durationMS = durationMS;
        this.easeFunction = easeFunction || Force.easeLinear;

        this._initTimestamp = new Date();
    }

    public update(): PIXI.Point {
        let progress = this.getForceProgress();
        let actForce = this.force * this.easeFunction(progress);
        let forceVector = pointMul(this.directionVector, actForce);
        if (this.forceFinished(progress, actForce)) { this.emit('end', progress, forceVector); }
        return forceVector;
    }
    private forceFinished(progress: number, force: number) {
        return (progress >= 1 && force === 0);
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
        return Math.min(1, diff / this.durationMS);
    }
}
