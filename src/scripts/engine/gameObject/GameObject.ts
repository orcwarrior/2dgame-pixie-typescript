import EventEmitter = PIXI.utils.EventEmitter;
import {InputComponent} from './components/abstract/InputComponent';
import {AnimsComponent} from './components/abstract/AnimsComponent';
import {MoveableComponent} from './components/abstract/MoveableComponent';
import {VisualComponent} from './components/abstract/VisualComponent';
import {CollisionComponent} from './components/abstract/CollisionComponent';

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
