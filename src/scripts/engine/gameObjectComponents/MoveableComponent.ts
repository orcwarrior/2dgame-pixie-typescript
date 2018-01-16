import EventEmitter = PIXI.utils.EventEmitter;
import {GameObject} from '../../objects/GameObject';

export abstract class MoveableComponent extends EventEmitter {
    protected velocity: PIXI.Point;
    protected parent: GameObject;

    constructor (parent: GameObject, velocity: PIXI.Point = new PIXI.Point(0, 0)) {
        super();
        this.parent = parent;
        this.velocity = velocity;
    }

    public abstract update(parentContainer: PIXI.Container): PIXI.Point;
    public getVelocityVector() {
        return new PIXI.Point(this.velocity.x, this.velocity.y);
    }
}
