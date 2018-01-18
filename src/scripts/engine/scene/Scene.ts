import {Renderable} from '../interfaces/Renderable';
import Container = PIXI.Container;
import DisplayObject = PIXI.DisplayObject;
import {Player} from '../gameObject/player/Player';

export class Scene implements Renderable {
    private background: Container;
    private objects: Container;
    private foreground: Container;
    private player: DisplayObject;

    constructor(player: Player, initBg?: (c: Container) => DisplayObject[],
                initObjs?: (c: Container) => DisplayObject[],
                initFg?: (c: Container) => DisplayObject[]) {
        // TODO: Some z-index of rendering library would be handy
        this.background = new PIXI.Container();
        this.objects = new PIXI.Container();
        this.foreground = new PIXI.Container();
        if (initBg) { initBg(this.background); }
        if (initObjs) { initObjs(this.background); }
        if (initFg) { initFg(this.background); }

        this.player = player.getVisuals();

    }


    public render(renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void {
        // Simply stacking of layers, but z-index plugin for PIXI would be handy
        renderer.render(this.background);
        renderer.render(this.objects);
        renderer.render(this.player);
        renderer.render(this.foreground);
    }

    public addBackground(d: DisplayObject, pos?: number) { this.addToContainer(d, this.background, pos); }
    public addObject(d: DisplayObject, pos?: number)     { this.addToContainer(d, this.objects, pos); }
    public addBackgrund(d: DisplayObject, pos?: number)  { this.addToContainer(d, this.foreground, pos); }

    private addToContainer(d: DisplayObject, c: Container, pos?: number) {
        if (pos && 0 >= pos && pos < c.children.length ) {
            c.addChildAt(d, pos);
        } else {
            c.addChild(d);
        }
    }
}
