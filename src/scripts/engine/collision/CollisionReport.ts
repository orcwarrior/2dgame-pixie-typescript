import {CollisionComponent} from '../gameObjectComponents/CollisionComponent';
import {CollisionResults} from './CollisionResults';
import {EdgeRectangles} from './EdgeRectangles';

export class CollisionReport {
    public otherColl: CollisionComponent;
    public result: CollisionResults;
    public edges: EdgeRectangles;
    constructor(otherColl: CollisionComponent, result: CollisionResults, edges: EdgeRectangles) {

        this.otherColl = Object.assign({}, otherColl);
        this.result = Object.assign({}, result);
        this.edges = Object.assign({}, edges);

    }
}
