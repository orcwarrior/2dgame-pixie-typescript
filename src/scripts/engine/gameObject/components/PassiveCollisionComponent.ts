import {CollisionComponent} from './abstract/CollisionComponent';
import {GameObject} from '../GameObject';
import {GameManager} from '../../GameManager';

export class PassiveCollisionComponent extends CollisionComponent {

    constructor(parentObject: GameObject, getCollisionRect: () => PIXI.Rectangle,
                onCollide?: (g: GameObject) => void) {
        super(parentObject, getCollisionRect, onCollide);

        GameManager.instance.addCollideable(this);
    }

    // Passive collision component doesn't check collision with other collideables.
    public update(otherColls: CollisionComponent[]): void {
        return;
    }
}
