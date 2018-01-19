
import {MoveableComponent} from './abstract/MoveableComponent';
import {GameObject} from '../GameObject';
import {Vector} from '../../utils/Vector';

export class GenericMoveableComponent extends MoveableComponent {

    constructor (parent: GameObject, velocity: Vector = new Vector()) {
        super(parent, velocity);
    }
    // Returns velocity vector:
    public update(parent: PIXI.DisplayObject, passedVelocity?: Vector): Vector {
        if (passedVelocity) {this.velocity = passedVelocity; }
        parent.x += this.velocity.x;
        parent.y += this.velocity.y;
        return this.velocity;
    }
}
