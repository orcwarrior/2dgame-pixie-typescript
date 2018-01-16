import {Updateable} from './interfaces/Updateable';
import {Force} from './Force';
import {pointsAdd} from './utils/utils';

export class ForcesContainer implements Updateable {
    private forcesContainer: any;
    private forcesVector: PIXI.Point;

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

    public update(): PIXI.Point {
        let fV = this.forcesVector = Object.keys(this.forcesContainer)
            .reduce((vec: PIXI.Point, forceId) => {
                return pointsAdd(vec, this.forcesContainer[forceId].update());
            }, new PIXI.Point(0, 0));
        return new PIXI.Point(fV.x, fV.y);
    }
}
