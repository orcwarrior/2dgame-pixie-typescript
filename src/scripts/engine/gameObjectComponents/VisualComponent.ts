import {Renderable} from '../interfaces/Renderable';

export abstract class VisualComponent implements Renderable {
    protected container: PIXI.Container;

    constructor(container: PIXI.Container = new PIXI.Container()) {
        this.container = container;
    }
    public getContainer(): PIXI.Container {
        return this.container;
    }
    public abstract render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void;
}
