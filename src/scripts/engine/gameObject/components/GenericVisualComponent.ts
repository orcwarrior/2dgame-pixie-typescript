import {VisualComponent} from './abstract/VisualComponent';
import DisplayObject = PIXI.DisplayObject;

export interface VisualComponentConfig {
    x?: number;
    y?: number;
    childs?: PIXI.DisplayObject[];
    parentContainer?: PIXI.Container;
}
export class GenericVisualComponent extends VisualComponent {
    constructor(vObj: PIXI.DisplayObject, config: VisualComponentConfig = {}, ) {
        super(vObj);
        this.visualObj.x = config.x || 0;
        this.visualObj.y = config.y || 0;
        //this.visualObj.setParent(config.parentContainer || GameManager.instance.getRootContainer());

        let asContainer = <PIXI.Container>vObj;
        if (config.childs && asContainer) {
            config.childs.forEach((child: DisplayObject) => asContainer.addChild(child));
        }
        // GameManager.instance.addRenderableObject(this);
    }

    public render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void {
        renderContext.render(this.visualObj);
    }
}
