export interface Renderable {
    render(renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer): void;
}
