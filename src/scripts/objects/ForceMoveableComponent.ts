import {MoveableComponent} from '../engine/gameObjectComponents/MoveableComponent';
import {GameObject} from './GameObject';
import {ForcesContainer} from '../engine/ForcesContainer';
import {Force} from '../engine/Force';

export class ForceMoveableComponent extends MoveableComponent {
    private forces: ForcesContainer;

    constructor(parentObject: GameObject, velocity?: PIXI.Point) {
        super(parentObject, velocity);
        this.forces = new ForcesContainer();
    }
    public update(parentContainer: PIXI.Container): PIXI.Point {
        this.velocity = this.forces.update();
        parentContainer.x += this.velocity.x;
        parentContainer.y += this.velocity.y;
        return this.velocity;
    }
    public applyForce(id: string, force: Force, overwriteForce?: boolean) {
        this.forces.applyForce(id, force, overwriteForce);
    }
}
