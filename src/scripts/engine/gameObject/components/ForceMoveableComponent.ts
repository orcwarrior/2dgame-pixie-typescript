import {MoveableComponent} from './abstract/MoveableComponent';
import {GameObject} from '../GameObject';
import {ForcesContainer} from '../../force/ForcesContainer';
import {Force} from '../../force/Force';
import {Vector} from '../../utils/Vector';

export class ForceMoveableComponent extends MoveableComponent {
    private forces: ForcesContainer;

    constructor(parentObject: GameObject, velocity?: Vector, forceContainer?: ForcesContainer) {
        super(parentObject, velocity);
        this.forces = forceContainer || new ForcesContainer();
    }
    public update(parentContainer: PIXI.Container, passedVelocity?: Vector): Vector {
        this.velocity = passedVelocity || this.forces.update();
        parentContainer.x += this.velocity.x;
        parentContainer.y += this.velocity.y;
        return this.velocity;
    }
    public applyForce(id: string, force: Force, overwriteForce?: boolean) {
        this.forces.applyForce(id, force, overwriteForce);
    }
    public getForceVelocity(forceId: string): Vector {
        return this.forces.getForceVelocity(forceId);
    }
}
