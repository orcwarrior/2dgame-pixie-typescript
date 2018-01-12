import * as PIXI from 'pixi.js';
import {InputManager} from './InputManager';
import {Updateable} from './interfaces/Updateable';
import {moveableObjectFactory} from '../factories/MoveableObjectFactory';
import {Key} from 'ts-keycode-enum';

let goombaUrl = require('file-loader!../../res/sprites/goomba.png');

export class GameManager {
    private gameWrapper: HTMLElement | null;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private ticker: PIXI.ticker.Ticker;
    // Managers:
    private inputMgr: InputManager;
    // Factories:
    private moveableObjsFactory: Function;
    // Objects:
    private objects: PIXI.Container;
    private updateableObjects: Array<Updateable> = [];

    constructor(wrapperId: string) {
        let app = this.renderer = PIXI.autoDetectRenderer({width: 800, height: 600});
        // this.objects = new PIXI.Container();
        this.inputMgr = new InputManager();
        let updateTicker = this.ticker = PIXI.ticker.shared;
        updateTicker.add(this.update, this);

        this.gameWrapper = document.getElementById(wrapperId);
        if (this.gameWrapper) {
            this.gameWrapper.appendChild(this.renderer.view);
        }
        this.moveableObjsFactory = moveableObjectFactory(this);
        this.objects = new PIXI.Container();



        const goombaSprite = PIXI.Sprite.fromImage(goombaUrl);
        goombaSprite.anchor.set(0.5);
        goombaSprite.x = app.screen.width / 2;
        goombaSprite.y = app.screen.height / 2;
        goombaSprite.width = 40;
        goombaSprite.height = 40;

        const goomba = this.moveableObjsFactory(goombaSprite);
        this.inputMgr.addKeyEventListener('keydown', Key.UpArrow, () => goomba.my = -1);
        this.inputMgr.addKeyEventListener('keydown', Key.DownArrow, () => goomba.my = 1);
        this.inputMgr.addKeyEventListener('keydown', Key.LeftArrow, () => goomba.mx = -1);
        this.inputMgr.addKeyEventListener('keydown', Key.RightArrow, () => goomba.mx = 1);
        this.inputMgr.addKeyEventListener('keyup', Key.UpArrow, () => goomba.my = 0);
        this.inputMgr.addKeyEventListener('keyup', Key.DownArrow, () => goomba.my = 0);
        this.inputMgr.addKeyEventListener('keyup', Key.LeftArrow, () => goomba.mx = 0);
        this.inputMgr.addKeyEventListener('keyup', Key.RightArrow, () => goomba.mx = 0);

    }
    public getInputManager() {
        return this.inputMgr;
    }

    private update(delta: number) {
        this.updateableObjects.forEach((mob) => mob.update(delta));
        this.renderer.render(this.objects);
    }

    public addUpdateableObject(obj: Updateable) {
        this.updateableObjects.push(obj);
    }
    public addRenderedSprite(sprite: PIXI.Sprite) {
        this.objects.addChild(sprite);
    }

}
