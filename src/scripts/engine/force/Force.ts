import {Vector} from '../utils/Vector';
import _ = require('lodash');

const ForceDir = {
    UP: (f: number) => new Vector(0, -f),
    RIGHT: (f: number) => new Vector(f, 0),
    DOWN: (f: number) => new Vector(0, f),
    LEFT: (f: number) => new Vector(-f, 0),
};

export enum Direction {
    UP = 'UP',
    RIGHT = 'RIGHT',
    DOWN = 'DOWN',
    LEFT = 'LEFT'
}
export let directionEnumKeys = (function () {
    let dirKeys = Object.keys(Direction);
    return _.chain(dirKeys).uniq().map((dir) => <Direction>dir).value();
})();

export class Force extends PIXI.utils.EventEmitter {

    private durationMS: number;
    private force: number;
    private easeFunction: Function;
    private _initTimestamp: Date;
    private directionVector: Vector;

    /* statics */
    public static constant = () => 1;
    public static easeLinear = (p: number) => p;
    public static decelerateLinear = (p: number) => 1 - p;
    // tslint:disable-next-line
    public static gravity = new Force(Direction.DOWN, 2, 0, Force.constant);


    constructor(dir: Direction | Vector, force: number, durationMS: number,
                easeFunction: Function = Force.easeLinear) {
        super();

        this.directionVector = this.getDirectionVector(dir);
        this.force = force;
        this.durationMS = durationMS;
        this.easeFunction = easeFunction || Force.easeLinear;

        this._initTimestamp = new Date();
    }

    public update(): Vector {
        let progress = this.getForceProgress();
        let actForce = this.force * this.easeFunction(progress);
        let forceVector = this.directionVector.scalarMul(actForce);
        if (this.forceFinished(progress, actForce)) { this.emit('end', progress, forceVector); }
        return forceVector;
    }
    private forceFinished(progress: number, force: number) {
        return (progress >= 1 && force === 0);
    }
    private getDirectionVector(dir: Direction | Vector): Vector {
        let asDirection = (<Direction>dir);
        if (Direction[asDirection]) {
            return ForceDir[asDirection](1);
        } else {
            return <Vector>dir;
        }
    }
    private getForceProgress(): number {
        let curTimestamp: Date = new Date();
        let diff = (curTimestamp.getTime() - this._initTimestamp.getTime());
        return Math.min(1, diff / this.durationMS);
    }
}
