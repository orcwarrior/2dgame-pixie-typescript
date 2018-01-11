import * as PIXI from 'pixi.js';
import {InputManager} from './InputManager';

let goombaUrl = require('file-loader!../../res/sprites/goomba.png');

export class GameManager {
    private app: any;
    private gameWrapper: HTMLElement | null;
    private objects: PIXI.Container;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private ticker: PIXI.ticker.Ticker;
    // Managers:
    private inputMgr: InputManager;

    constructor(wrapperId: string) {
        let app = this.renderer = PIXI.autoDetectRenderer({width: 800, height: 600});
        this.objects = new PIXI.Container();
        this.inputMgr = new InputManager();
        let updateTicker = this.ticker = PIXI.ticker.shared;
        updateTicker.add(this.update, this);

        this.gameWrapper = document.getElementById(wrapperId);
        if (this.gameWrapper) {
            this.gameWrapper.appendChild(this.renderer.view);
        }

        const goomba = PIXI.Sprite.fromImage(goombaUrl);
        goomba.anchor.set(0.5);
        goomba.x = app.screen.width / 2;
        goomba.y = app.screen.height / 2;
        goomba.width = 40;
        goomba.height = 40;

        this.objects.addChild(goomba);
        let goombaTicker = new PIXI.ticker.Ticker();
        goombaTicker.add((deltaTime) => {
            goomba.x += 1;
        });
        goombaTicker.start();
    }

    private update() {
        this.renderer.render(this.objects);
    }
}
