import EventEmitter = PIXI.utils.EventEmitter;
import {GameObject} from '../../GameObject';
import {Vector} from '../../../utils/Vector';

export abstract class MoveableComponent extends EventEmitter {
    protected velocity: Vector;
    protected parent: GameObject;

    constructor (parent: GameObject, velocity: Vector = new Vector()) {
        super();
        this.parent = parent;
        this.velocity = velocity;
    }

    public abstract update(parent: PIXI.DisplayObject, passedVelocity?: Vector): Vector;
    public getVelocityVector() {
        return new Vector(this.velocity.x, this.velocity.y);
    }
}
