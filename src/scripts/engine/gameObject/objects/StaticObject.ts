import {GameObject} from '../GameObject';
import {VisualComponent} from '../components/abstract/VisualComponent';
import {PassiveCollisionComponent} from '../components/PassiveCollisionComponent';

export class StaticObject extends GameObject {
    constructor(visual: VisualComponent, collision: boolean = true) {
        super();
        this.visualComponent = visual;
        let containerBoundingRect = visual.getVisual().getBounds.bind(visual.getVisual());

        if (collision) {
            this.collisionComponent = new PassiveCollisionComponent(this, containerBoundingRect);
        }
    }
    public update(delta: number): void { return; }
}
