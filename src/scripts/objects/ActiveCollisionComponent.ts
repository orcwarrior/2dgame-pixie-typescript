import {CollisionComponent} from '../engine/gameObjectComponents/CollisionComponent';
import {GameManager} from '../engine/GameManager';
import {GameObject} from './GameObject';
import {IntersectRect} from '../engine/utils/utils';
import {CollisionResults} from '../engine/collision/CollisionResults';
import {EdgeRectangles} from '../engine/collision/EdgeRectangles';
import {CollisionReport} from '../engine/collision/CollisionReport';

export class GenericCollisionComponent extends CollisionComponent {
    protected static edgeThickness = 1;

    constructor(parentObject: GameObject, getCollisionRect: () => PIXI.Rectangle, onCollide?: (g: GameObject) => void) {
        super(parentObject, getCollisionRect, onCollide);

        GameManager.instance.addCollideable(this);
    }

    public update(otherColls: CollisionComponent[]): CollisionResults {
        let results = new CollisionResults();
        let cRect: PIXI.Rectangle = this.getCollisionRect();
        let cRectEdges = new EdgeRectangles(cRect, GenericCollisionComponent.edgeThickness);

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
}
