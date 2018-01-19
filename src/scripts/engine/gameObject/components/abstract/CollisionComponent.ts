import {GameObject} from '../../GameObject';
import EventEmitter = PIXI.utils.EventEmitter;
import {CollisionReport} from '../../../collision/CollisionReport';
import {GameManager} from '../../../GameManager';

export type onCollideFunction = (o: GameObject, r: CollisionReport) => void;
export abstract class CollisionComponent extends EventEmitter {
    protected parent: GameObject;
    public getCollisionRect: () => PIXI.Rectangle;
    public onCollide: onCollideFunction;
    constructor(parentObject: GameObject, getCollisionRect: () => PIXI.Rectangle,
                onCollide?: onCollideFunction) {
        super();
        this.parent = parentObject;
        if (onCollide) {this.onCollide = onCollide; }
        // Passing function make possible to refresh bounding rectangle of object
        // and provides better encapsulation than passing whole PIXI.Container
        this.getCollisionRect = getCollisionRect;
    }
    public abstract update(otherColls: CollisionComponent[]): void;
    public destroy(): void {
        GameManager.instance.removeCollideable(this);
    }
    public getParent() { return this.parent; }
}
