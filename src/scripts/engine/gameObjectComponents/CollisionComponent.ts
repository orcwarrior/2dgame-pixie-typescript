import {GameObject} from '../../objects/GameObject';
import EventEmitter = PIXI.utils.EventEmitter;

export abstract class CollisionComponent extends EventEmitter {
    protected parent: GameObject;
    public getCollisionRect: () => PIXI.Rectangle;
    public onCollide: (g: GameObject) => void;
    constructor(parentObject: GameObject, getCollisionRect: () => PIXI.Rectangle,
                onCollide?: (g: GameObject) => void) {
        super();
        this.parent = parentObject;
        if (onCollide) {this.onCollide = onCollide; }
        // Passing function make possible to refresh bounding rectangle of object
        // and provides better encapsulation than passing whole PIXI.Container
        this.getCollisionRect = getCollisionRect;
    }
    public abstract update(otherColls: CollisionComponent[]): void;
}
