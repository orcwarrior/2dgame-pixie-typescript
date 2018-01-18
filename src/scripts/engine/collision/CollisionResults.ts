import {Vector} from '../utils/Vector';
import {Direction, directionEnumKeys} from '../force/Force';

// NOTE: CollisionVector is the way to note
// about collision (or no collision) in one of four directions
// example x-axis:
// -1: collision from left
//  0: no collision
//  1: collision from right
// If you dont get it simpy use filterVelocityVector method.
// NOTE2: In more platformer-like enviroment simple vector could be
// not enough
export class CollisionResults {
    protected collisionSides: {[side: string]: boolean};
    constructor() {
        this.collisionSides = {};
    }
    public collideSide(side: Direction) {
        this.collisionSides[side] = true;
    }
    public isSideCollided(side: Direction) {
        return this.collisionSides[side];
    }
    public join(collRes: CollisionResults): void {
        directionEnumKeys.forEach((dirName) =>
            this.collisionSides[dirName] = this.collisionSides[dirName] || collRes.isSideCollided(dirName)
        );
    }

    public filterVelocityVector(v: Vector) {
        let out = new Vector(v.x, v.y);
        let signs = v.signVector();
        if (signs.x === -1 && this.collisionSides[Direction.LEFT]) { out.x = 0; }
        if (signs.x === 1 && this.collisionSides[Direction.RIGHT]) { out.x = 0; }
        if (signs.y === -1 && this.collisionSides[Direction.UP]) { out.y = 0; }
        if (signs.y === 1 && this.collisionSides[Direction.DOWN]) { out.y = 0; }
        return out;
    }
}
