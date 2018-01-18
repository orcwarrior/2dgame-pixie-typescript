import {GameObject} from '../GameObject';
import {VisualComponent} from '../components/abstract/VisualComponent';
import {PassiveCollisionComponent} from '../components/PassiveCollisionComponent';

export class StaticObject extends GameObject {
    constructor(visual: VisualComponent) {
        super();
        this.visualComponent = visual;
        let containerBoundingRect = visual.getContainer().getBounds.bind(visual.getContainer());

        this.collisionComponent = new PassiveCollisionComponent(this, containerBoundingRect);

    }
    public update(delta: number): void { return; }
}
