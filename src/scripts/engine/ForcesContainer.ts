import {Updateable} from './interfaces/Updateable';
import {Force} from './Force';
import {pointsAdd} from './utils/utils';

export class ForcesContainer implements Updateable {
    private forcesContainer: any;
    private forcesVector: PIXI.Point;
    constructor() {
        this.forcesContainer = {};
    }
    public applyForce(id: string, force: Force) {
        this.forcesContainer[id] = force;
        force.on('end', () => {
            console.log(`Removing force: ${id}`);
            delete this.forcesContainer[id];
        });
    }
    public getForcesVector() {
        return this.forcesVector;
    }
    public update(delta: number): void {
        this.forcesVector = Object.keys(this.forcesContainer).reduce( (vec: PIXI.Point, forceId) => {
            return pointsAdd(vec, this.forcesContainer[forceId].getCurrentVector());
        }, new PIXI.Point(0, 0));
    }
}
