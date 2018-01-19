import {GameObject} from '../GameObject';
import {VisualComponent} from '../components/abstract/VisualComponent';
import {PassiveCollisionComponent} from '../components/PassiveCollisionComponent';
import {ActiveCollisionComponent} from '../components/ActiveCollisionComponent';
import {ForcesContainer} from '../../force/ForcesContainer';
import {ForceMoveableComponent} from '../components/ForceMoveableComponent';
import Rectangle = PIXI.Rectangle;
import {GameManager} from '../../GameManager';
import {onCollideFunction} from '../components/abstract/CollisionComponent';

interface CollisionDefiner {
    on?: onCollideFunction;
    enabled?: boolean;
}
export class DynamicObject extends GameObject {
    constructor(visual: VisualComponent,
                collision: CollisionDefiner,
                forcesContainer?: ForcesContainer) {
        super();
        this.visualComponent = visual;
        let containerBoundingRect = visual.getVisual().getBounds.bind(visual.getVisual());

        this.initializeCollision(collision, containerBoundingRect);

        if (forcesContainer) { this.moveableComponent = new ForceMoveableComponent(this, undefined, forcesContainer); }
        GameManager.instance.addUpdateableObject(this);
    }
    public update(delta: number): void {
        if (this.moveableComponent) {
            this.moveableComponent.update(this.visualComponent.getVisual());
        }
    }
    public destroy(): void {
        return;
    }

    private initializeCollision(collision: CollisionDefiner, containerBoundingRect: () => Rectangle) {
        if (collision.on) {
            this.collisionComponent = new ActiveCollisionComponent(this, containerBoundingRect, collision.on);
        } else if (collision.enabled) {
            this.collisionComponent = new PassiveCollisionComponent(this, containerBoundingRect);
        }
    }
}
