import EventEmitter = PIXI.utils.EventEmitter;
import {InputComponent} from '../engine/gameObjectComponents/InputComponent';
import {AnimsComponent} from '../engine/gameObjectComponents/AnimsComponent';
import {MoveableComponent} from '../engine/gameObjectComponents/MoveableComponent';
import {VisualComponent} from '../engine/gameObjectComponents/VisualComponent';
import {CollisionComponent} from '../engine/gameObjectComponents/CollisionComponent';

export abstract class GameObject extends EventEmitter {
    protected inputComponent: InputComponent;
    protected aniComponent: AnimsComponent;
    protected moveableComponent: MoveableComponent;
    protected visualComponent: VisualComponent;
    protected collisionComponent: CollisionComponent;

    constructor() {
        super();
    }
    public abstract update(delta: number): void;
}
