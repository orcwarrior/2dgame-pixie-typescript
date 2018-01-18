import {Updateable} from '../interfaces/Updateable';
import {Force} from './Force';
import {Vector} from '../utils/Vector';

export class ForcesContainer implements Updateable {
    private forcesContainer: {[id: string]: Force};
    private forcesVector: Vector;

    constructor() {
        this.forcesContainer = {};
    }

    public applyForce(id: string, force: Force, overwriteForce: boolean = false) {
        if (this.forcesContainer[id] && !overwriteForce) { return; }
        this.forcesContainer[id] = force;
        force.on('end', () => {
            console.log(`Removing force: ${id}`);
            delete this.forcesContainer[id];
        });
    }
    public getForceVelocity(forceId: string): Vector {
        return (this.forcesContainer[forceId] && this.forcesContainer[forceId].update());
    }

    public update(): Vector {
        let fV = this.forcesVector = Object.keys(this.forcesContainer)
            .reduce((vec: Vector, forceId) => {
                return vec.add(this.forcesContainer[forceId].update());
            }, new Vector());
        return new Vector(fV.x, fV.y);
    }
}
