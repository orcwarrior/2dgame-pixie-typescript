import {VisualComponent} from './abstract/VisualComponent';
import {GameManager} from '../../GameManager';

export class GenericVisualComponent extends VisualComponent {
    constructor(container?: PIXI.Container, config = {x: 0, y: 0}, parentContainer?: PIXI.Container) {
        super(container);
        this.container.x = config.x;
        this.container.y = config.y;
        this.container.setParent(parentContainer || GameManager.instance.getRootContainer());
        GameManager.instance.addRenderableObject(this);
    }
    public render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void {
        renderContext.render(this.container);
    }
}
