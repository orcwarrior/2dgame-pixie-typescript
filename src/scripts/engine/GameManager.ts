import * as PIXI from 'pixi.js';
import {InputManager} from './InputManager';
import {Updateable} from './interfaces/Updateable';
import {moveableFactory} from '../factories/MoveableFactory';
import {Renderable} from './interfaces/Renderable';
import {playerFactory} from '../factories/PlayerFactory';
import {CollisionComponent} from './gameObjectComponents/CollisionComponent';

let goombaRes = require('file-loader!res/sprites/goomba.png');

export class GameManager {
    // TODO: Make it proper singleton
    public static instance: GameManager;

    private gameWrapper: HTMLElement | null;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private ticker: PIXI.ticker.Ticker;
    // Managers:
    private inputMgr: InputManager;
    // Factories:
    private moveableObjsFactory: Function;
    private playerFactory: Function;
    // Objects Collections/Containers:
    private rootContainer: PIXI.Container;
    private updateableObjects: Array<Updateable> = [];
    private renderableObjects: Array<Renderable> = [];
    private collideablesObjects: Array<CollisionComponent> = [];
    private player: object;

    constructor(wrapperId: string) {
        GameManager.instance = this;
        let app = this.renderer = PIXI.autoDetectRenderer({width: 800, height: 600, clearBeforeRender: false});
        // this.objects = new PIXI.Container();
        this.inputMgr = new InputManager();
        let updateTicker = this.ticker = PIXI.ticker.shared;
        updateTicker.add(this.update, this);

        this.gameWrapper = document.getElementById(wrapperId);
        if (this.gameWrapper) {
            this.gameWrapper.appendChild(this.renderer.view);
        }
        this.moveableObjsFactory = moveableFactory(this);
        this.playerFactory = playerFactory(this);

        this.rootContainer = new PIXI.Container();
        this.rootContainer.name = 'PIXI-ROOT-CONTAINER';

        this.player = this.playerFactory();
    }

    public getInputManager() {
        return this.inputMgr;
    }
    public getRootContainer() {
        return this.rootContainer;
    }
    public getMoveableFactory() {
        return this.moveableObjsFactory;
    }

    private update(delta: number) {
        // this.renderer.clear('#000000');
        this.updateableObjects.forEach((mob) => mob.update(delta));
        this.renderableObjects.forEach((renderable) => renderable.render(this.renderer));

        this.renderer.render(this.rootContainer);
    }

    public addUpdateableObject(obj: Updateable) {
        this.updateableObjects.push(obj);
    }
    public addRenderableObject(renderable: Renderable) {
        this.renderableObjects.push(renderable);
    }

    public addCollideable(collisionComponent: CollisionComponent) {
        this.collideablesObjects.push(collisionComponent);

    }
}
