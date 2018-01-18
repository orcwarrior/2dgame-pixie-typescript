import * as PIXI from 'pixi.js';
import {InputManager} from './InputManager';
import {Updateable} from './interfaces/Updateable';
import {Renderable} from './interfaces/Renderable';
import {Player} from './gameObject/player/Player';
import {CollisionComponent} from './gameObject/components/abstract/CollisionComponent';
import {StaticObject} from './gameObject/objects/StaticObject';
import {GenericVisualComponent} from './gameObject/components/GenericVisualComponent';
import {Scene} from './scene/Scene';
import {firstSceneFactory} from './scene/firstSceneFactory';


export class GameManager {

    // TODO: Make it proper singleton
    public static instance: GameManager;
    private gameSize: PIXI.Rectangle;

    private gameWrapper: HTMLElement | null;
    private renderer: PIXI.WebGLRenderer | PIXI.CanvasRenderer;
    private ticker: PIXI.ticker.Ticker;
    // Managers:
    private inputMgr: InputManager;
    private scene: Scene;
    // Objects Collections/Containers:
    private rootContainer: PIXI.Container;
    private updateableObjects: Array<Updateable> = [];
    private renderableObjects: Array<Renderable> = [];
    private collideablesObjects: Array<CollisionComponent> = [];
    private player: Player;

    constructor(wrapperId: string) {
        this.gameSize = this.initializeGameWrapperElement(wrapperId);

        this.rootContainer = new PIXI.Container();
        this.rootContainer.name = 'PIXI-ROOT-CONTAINER';
        this.renderer = PIXI.autoDetectRenderer({width: this.gameSize.width, height: this.gameSize.height,
            clearBeforeRender: false, autoResize: true});
        if (this.gameWrapper) {
            this.gameWrapper.appendChild(this.renderer.view);
        }

        this.inputMgr = new InputManager();
        let updateTicker = this.ticker = PIXI.ticker.shared;
        updateTicker.add(this.update, this);
        GameManager.instance = this;
        this.player = new Player();
        this.scene = firstSceneFactory(this.gameSize, this.player);


    }

    public getInputManager() {
        return this.inputMgr;
    }
    private update(delta: number) {
        this.updateCollisions();

        this.updateableObjects.forEach((mob) => mob.update(delta));

        this.scene.render(this.renderer);

        this.renderableObjects.forEach((renderable) => renderable.render(this.renderer));

        // this.renderer.render(this.rootContainer);
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
    public addCollideable(collisionComponent: CollisionComponent) {
        this.collideablesObjects.push(collisionComponent);
    }

    // TODO: Extract functionality to new class
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
