import * as PIXI from 'pixi.js';
import {InputManager} from './InputManager';
import {Updateable} from './interfaces/Updateable';
import {Player} from './gameObject/player/Player';
import {CollisionComponent} from './gameObject/components/abstract/CollisionComponent';
import {Scene} from './scene/Scene';
import {firstSceneFactory} from './scene/firstSceneFactory';
import {GameLogic} from './gameObject/GameLogic';
import {PlayerStats} from './gameObject/player/PlayerStats';
import EventEmitter = PIXI.utils.EventEmitter;


export enum GameState {
    MENU, PLAY, PAUSED, OVER
}
// DK: Event emmiter for easy communication with
// outside of game (UI) simply.
export class GameManager extends EventEmitter {

    // TODO: Make it proper singleton
    public static instance: GameManager;
    get gameSize(): PIXI.Rectangle { return new PIXI.Rectangle(0, 0, this._gameSize.width, this._gameSize.height); }
    private _scene: Scene;
    get scene() {return this._scene; }

    private _gameSize: PIXI.Rectangle;
    private logic: GameLogic;
    private _initialized: boolean;
    private gameWrapper: HTMLElement | null;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private _state: GameState;
    private set state(s: GameState) {
        this.emit('statechange', s);
        this._state = s;
    }
    // Managers:
    private inputMgr: InputManager;
    // Objects Collections/Containers:
    private updateableObjects: Array<Updateable> = [];
    private collideablesObjects: Array<CollisionComponent> = [];
    private player: Player;

    constructor(wrapperId: string) {
        super();
        GameManager.instance = this;
        this._gameSize = this.initializeGameWrapperElement(wrapperId);

        this.renderer = PIXI.autoDetectRenderer({width: this._gameSize.width, height: this._gameSize.height,
            clearBeforeRender: false, autoResize: true});
        if (this.gameWrapper) {
            this.gameWrapper.appendChild(this.renderer.view);
        }
        this.inputMgr = new InputManager();
        let updateTicker = PIXI.ticker.shared;
        updateTicker.add(this.update, this);
        this._scene = firstSceneFactory();
        this.player = new Player();
        this._scene.addPlayer(this.player);

        this.state = GameState.MENU;

    }
    public initialize() {
        if (this._initialized) { return; }

        this.logic = new GameLogic(this.player, this._scene);
        this._initialized = true;
        this.state = GameState.PLAY;
    }

    public getInputManager() {
        return this.inputMgr;
    }
    private update(delta: number) {
        if (this._state === GameState.PLAY) {
            this.updateCollisions();

            this.updateableObjects.forEach((mob) => mob.update(delta));
        }

        this._scene.render(this.renderer);
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
    public removeUpdateableObject(obj: Updateable) {
        this.updateableObjects = this.updateableObjects.filter((o) => o !== obj);
    }
    public addCollideable(collisionComponent: CollisionComponent) {
        this.collideablesObjects.push(collisionComponent);
    }
    public removeCollideable(cc: CollisionComponent) {
        this.collideablesObjects = this.collideablesObjects.filter((c) => c !== cc);
    }

    public getState(): GameState {return this._state; }
    public getStats(): PlayerStats {
        return this.player.stats;
    }
    public gameOver() { this.state = GameState.OVER; }
    public pause() { this.state = GameState.PAUSED; }
    public unpause() { this.state = GameState.PLAY; }
    // TODO: Extract functionality to new class (with resize)
    private initializeGameWrapperElement(wrapperId: string): PIXI.Rectangle {
        this.gameWrapper = document.getElementById(wrapperId);
        if (this.gameWrapper) {
            // this.handleWindowResize(this.gameWrapper);
            let bRect = this.gameWrapper.getBoundingClientRect();
            return new PIXI.Rectangle(0, 0, bRect.width, bRect.height);
        } else {
            throw Error(`Game wrapper with id: ${wrapperId} doesn't exist!`);
        }
    }
    // TODO: Resize is more problematic to achieve
    // http://www.html5gamedevs.com/topic/30645-rendererautoresize-doesnt-seem-to-work/
    // private handleWindowResize(wrapper: HTMLElement): any {
    //     window.addEventListener('resize', () => {
    //         let bRect = wrapper.getBoundingClientRect();
    //         this.renderer.resize(bRect.width, bRect.height);
    //     });
    // }
}
