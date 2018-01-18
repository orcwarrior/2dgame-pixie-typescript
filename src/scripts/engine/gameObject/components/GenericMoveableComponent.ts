
import {MoveableComponent} from './abstract/MoveableComponent';
import {GameObject} from '../GameObject';
import {Vector} from '../../utils/Vector';

export class GenericMoveableComponent extends MoveableComponent {

    constructor (parent: GameObject, velocity: Vector = new Vector()) {
        super(parent, velocity);
    }
    // Returns velocity vector:
    public update(parentContainer: PIXI.Container, passedVelocity?: Vector): Vector {
        if (passedVelocity) {this.velocity = passedVelocity; }
        parentContainer.x += this.velocity.x;
        parentContainer.y += this.velocity.y;
        return this.velocity;
    }
}
