import {CollisionComponent} from './abstract/CollisionComponent';
import {GameManager} from '../../GameManager';
import {GameObject} from '../GameObject';
import {IntersectRect} from '../../utils/utils';
import {CollisionResults} from '../../collision/CollisionResults';
import {EdgeRectangles} from '../../collision/EdgeRectangles';
import {CollisionReport} from '../../collision/CollisionReport';

export class ActiveCollisionComponent extends CollisionComponent {
    protected static edgeThickness = 1;
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
            let intersection = IntersectRect(cRect, coll.getCollisionRect());
            if (intersection !== PIXI.Rectangle.EMPTY) {
                let collResult = cRectEdges.testIntersection(intersection);
                let collReport = new CollisionReport(coll, collResult, cRectEdges);
                console.log('Collision found:', collReport);
                this.emit('collision', collReport);
                results.join(collResult);
            }
        });
        return results;
    }
    public getCollisionResults() { return this.collisionResults; }
}
