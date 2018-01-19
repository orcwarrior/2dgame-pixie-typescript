import {Renderable} from '../../../interfaces/Renderable';
import {GameManager} from '../../../GameManager';

export abstract class VisualComponent implements Renderable {
    protected visualObj: PIXI.DisplayObject;

    constructor(vObj: PIXI.DisplayObject = new PIXI.Container()) {
        this.visualObj = vObj;
    }
    public abstract render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void;

    public getVisual(): PIXI.DisplayObject { return this.visualObj; }

    public destroy() {
        GameManager.instance.scene.removeVisual(this);
        // if ((<PIXI.Container>this.visualObj).children) {
        //     (<PIXI.Container>this.visualObj).destroy({children: true});
        // } else {
        //     this.visualObj.destroy();
        // }
    }
}
