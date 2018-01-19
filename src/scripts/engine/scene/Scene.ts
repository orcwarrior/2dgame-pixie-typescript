import {Renderable} from '../interfaces/Renderable';
import Container = PIXI.Container;
import DisplayObject = PIXI.DisplayObject;
import {Player} from '../gameObject/player/Player';
import {VisualComponent} from '../gameObject/components/abstract/VisualComponent';

export class Scene implements Renderable {
    private visualsBackground: VisualComponent[];
    private visualsObjects: VisualComponent[];
    private visualsForeground: VisualComponent[];
    private player: DisplayObject;

    constructor(player?: Player) {
        // TODO: Some z-index of rendering library would be handy

        this.visualsBackground = [];
        this.visualsObjects = [];
        this.visualsForeground = [];

        if (player) { this.player = player.getVisuals(); }

    }


    public render(renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void {
        this.visualsBackground.forEach((v) => renderer.render(v.getVisual()));
        this.visualsObjects.forEach((v) => renderer.render(v.getVisual()));
        if (this.player) { renderer.render(this.player); }
        this.visualsForeground.forEach((v) => renderer.render(v.getVisual()));
    }

    public addBackground(v: VisualComponent, pos?: number) {
        this.visualsBackground.push(v);  }
    public addObject(v: VisualComponent, pos?: number)     {
        this.visualsObjects.push(v);  }
    public addForeground(v: VisualComponent, pos?: number)  {
        this.visualsForeground.push(v);  }
    public removeVisual(v: VisualComponent) {
        this.visualsBackground = this.visualsBackground.filter((vb) => v !== vb);
        this.visualsObjects = this.visualsObjects.filter((vo) => v !== vo);
        this.visualsForeground = this.visualsForeground.filter((vf) => v !== vf);

    }
    public addPlayer(p: Player) {this.player = p.getVisuals(); }


}
