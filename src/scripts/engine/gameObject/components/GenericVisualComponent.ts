import {VisualComponent} from './abstract/VisualComponent';
import {GameManager} from '../../GameManager';
import DisplayObject = PIXI.DisplayObject;

export interface VisualComponentConfig {
    x: number;
    y: number;
    childs?: PIXI.DisplayObject[];
}
export class GenericVisualComponent extends VisualComponent {
    constructor(config: VisualComponentConfig = {x: 0, y: 0}, container?: PIXI.Container,
                parentContainer?: PIXI.Container, ) {
        super(container);
        this.container.x = config.x;
        this.container.y = config.y;
        this.container.setParent(parentContainer || GameManager.instance.getRootContainer());
        if (config.childs) {
            config.childs.forEach((child: DisplayObject) => this.container.addChild(child));
        }
        GameManager.instance.addRenderableObject(this);
    }

    public render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void {
        renderContext.render(this.container);
    }
}
