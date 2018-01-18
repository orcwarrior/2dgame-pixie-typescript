import * as PIXI from 'pixi.js';
import {InputManager} from './InputManager';
import {Updateable} from './interfaces/Updateable';
import {Renderable} from './interfaces/Renderable';
import {Player} from './gameObject/player/Player';
import {CollisionComponent} from './gameObject/components/abstract/CollisionComponent';
import {StaticObject} from './gameObject/objects/StaticObject';
import {GenericVisualComponent} from './gameObject/components/GenericVisualComponent';

let goombaRes = require('file-loader!res/sprites/goomba.png');

export class GameManager {
    // TODO: Make it proper singleton
    public static instance: GameManager;

    private gameWrapper: HTMLElement | null;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private ticker: PIXI.ticker.Ticker;
    // Managers:
    private inputMgr: InputManager;
    // Objects Collections/Containers:
    private rootContainer: PIXI.Container;
    private updateableObjects: Array<Updateable> = [];
    private renderableObjects: Array<Renderable> = [];
    private collideablesObjects: Array<CollisionComponent> = [];
    private player: Player;

    constructor(wrapperId: string) {
        this.rootContainer = new PIXI.Container();
        this.rootContainer.name = 'PIXI-ROOT-CONTAINER';
        let app = this.renderer = PIXI.autoDetectRenderer({width: 800, height: 600, clearBeforeRender: false});

        this.inputMgr = new InputManager();
        let updateTicker = this.ticker = PIXI.ticker.shared;
        updateTicker.add(this.update, this);
        GameManager.instance = this;

        this.gameWrapper = document.getElementById(wrapperId);
        if (this.gameWrapper) {
            this.gameWrapper.appendChild(this.renderer.view);
        }


        this.player = new Player();

        const goombaSprite = PIXI.Sprite.fromImage(goombaRes);
        goombaSprite.width = 50;
        goombaSprite.height = 50;
        let goomba = new StaticObject(new GenericVisualComponent({x: 600, y: 495, childs: [goombaSprite]}));

    }

    public getInputManager() {
        return this.inputMgr;
    }
    public getRootContainer() {
        return this.rootContainer;
    }

    private update(delta: number) {
        this.updateCollisions();

        this.updateableObjects.forEach((mob) => mob.update(delta));
        this.renderableObjects.forEach((renderable) => renderable.render(this.renderer));

        this.renderer.render(this.rootContainer);
    }
    private updateCollisions() {
        this.collideablesObjects.forEach((collideable) => {
            let otherColls = this.collideablesObjects
                .filter((coll) => coll !== collideable);
            collideable.update(otherColls);
        });
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
