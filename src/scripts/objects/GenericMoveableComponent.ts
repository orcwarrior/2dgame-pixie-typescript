
import {MoveableComponent} from '../engine/gameObjectComponents/MoveableComponent';
import {GameObject} from './GameObject';
import {Vector} from '../engine/utils/Vector';

export class GenericMoveableComponent extends MoveableComponent {

    constructor (parent: GameObject, velocity: Vector = new Vector()) {
        super(parent, velocity);
    }
    // Returns velocity vector:
    public update(parentContainer: PIXI.Container): Vector {
        parentContainer.x += this.velocity.x;
        parentContainer.y += this.velocity.y;
        return this.velocity;
    }
}
