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
    public static constant = function () {
        return 1;
    };
    public static easeLinear = function (p) {
        return p;
    };

    private durationMS: number;
    private _initialForce: number;
    private easeFunction: Function;
    private direction: Direction;
    private _initTimestamp: Date;

    constructor(dir: Direction, initialForce: number, durationMS: number, easeFunction?: Function) {
        super();
        this.direction = dir;
        this._initialForce = initialForce;
        this.durationMS = durationMS;
        this.easeFunction = easeFunction || Force.easeLinear;

        this._initTimestamp = new Date();
    }

    public getCurrentVector() {
        let progress = this.getForceProgress();
        let force = this._initialForce * this.easeFunction(1 - progress);
        let forceVector = ForceDir[this.direction](force);
        if (progress >= 1) { this.emit('end', progress, forceVector); }
        return forceVector;

    }

    private getForceProgress() {
        let curTimestamp: Date = new Date();
        let diff = (curTimestamp.getTime() - this._initTimestamp.getTime());
        return diff / this.durationMS;
    }
}