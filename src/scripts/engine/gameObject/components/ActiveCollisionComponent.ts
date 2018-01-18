import {CollisionComponent} from './abstract/CollisionComponent';
import {GameManager} from '../../GameManager';
import {GameObject} from '../GameObject';
import {IntersectRect, rectangleIsEmpty} from '../../utils/utils';
import {CollisionResults} from '../../collision/CollisionResults';
import {EdgeRectangles} from '../../collision/EdgeRectangles';
import {CollisionReport} from '../../collision/CollisionReport';

export class ActiveCollisionComponent extends CollisionComponent {
    protected static edgeThickness = 1;
    protected static minimalCollision: number = 0.05;
    protected collisionResults: CollisionResults;

    constructor(parentObject: GameObject, getCollisionRect: () => PIXI.Rectangle, onCollide?: (g: GameObject) => void) {
        super(parentObject, getCollisionRect, onCollide);
        GameManager.instance.addCollideable(this);
    }
    public update(otherColls: CollisionComponent[]): CollisionResults {
        let results = this.collisionResults = new CollisionResults();
        let cRect: PIXI.Rectangle = this.getCollisionRect();
        let cRectEdges = new EdgeRectangles(cRect, ActiveCollisionComponent.edgeThickness);

        otherColls.forEach((coll) => {
            let otherBounds = coll.getCollisionRect();
            let intersection = IntersectRect(cRect, otherBounds);
            if (!rectangleIsEmpty(intersection)
            && (this.isCollidedPartBigEnough(cRect, intersection)
            ||  this.isCollidedPartBigEnough(otherBounds, intersection))  ) {
                // TODO: Create some collision-pass-through field
                // and ignore then results.join(collResults)
                let collResult = cRectEdges.testIntersection(intersection);
                let collReport = new CollisionReport(coll, collResult, cRectEdges);
                // console.log('Collision found:', collResult);
                this.emit('collision', collReport);
                results.join(collResult);
            }
        });
        return results;
    }
    public getCollisionResults() { return this.collisionResults; }
    private isCollidedPartBigEnough(selfRect: PIXI.Rectangle, intersect: PIXI.Rectangle) {
        return (intersect.width * intersect.height) / (selfRect.width * selfRect.height) >= ActiveCollisionComponent.minimalCollision;
    }
}
