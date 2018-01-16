
import {MoveableComponent} from '../engine/gameObjectComponents/MoveableComponent';
import {GameObject} from './GameObject';

export class GenericMoveableComponent extends MoveableComponent {

    constructor (parent: GameObject, velocity: PIXI.Point = new PIXI.Point(0, 0)) {
        super(parent, velocity);
    }
    // Returns velocity vector:
    public update(parentContainer: PIXI.Container): PIXI.Point {
        parentContainer.x += this.velocity.x;
        parentContainer.y += this.velocity.y;
        return this.velocity;
    }
}
