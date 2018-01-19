import {CollisionComponent} from '../gameObject/components/abstract/CollisionComponent';
import {CollisionResults} from './CollisionResults';
import {EdgeRectangles} from './EdgeRectangles';

export class CollisionReport {
    public otherColl: CollisionComponent;
    public result: CollisionResults;
    public edges: EdgeRectangles;

    constructor(otherColl: CollisionComponent, result: CollisionResults, edges: EdgeRectangles) {
        this.otherColl = otherColl;
        this.result = result;
        this.edges = edges;

    }
}
