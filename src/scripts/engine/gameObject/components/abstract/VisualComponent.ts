import {Renderable} from '../../../interfaces/Renderable';

export abstract class VisualComponent implements Renderable {
    protected visualObj: PIXI.DisplayObject;

    constructor(vObj: PIXI.DisplayObject = new PIXI.Container()) {
        this.visualObj = vObj;
    }
    public getVisual(): PIXI.DisplayObject {
        return this.visualObj;
    }
    public abstract render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void;
}
