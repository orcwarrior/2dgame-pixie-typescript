import EventEmitter = PIXI.utils.EventEmitter;
import {GameObject} from '../../objects/GameObject';
import {AnimsMap} from '../utils/utils';
import AnimatedSprite = PIXI.extras.AnimatedSprite;
import {MoveableComponent} from './MoveableComponent';

export enum AniType {
    idle = 'idle',
    run_down = 'run_down',
    run_up = 'run_up',
    run_left = 'run_left',
    run_right = 'run_right',
    slide_left = 'slide_left',
    slide_right = 'slide_right'
}

export abstract class AnimsComponent extends EventEmitter {
    protected parent: GameObject;
    protected parentContainer: PIXI.Container;
    protected anims: AnimsMap;
    protected currentAni: PIXI.extras.AnimatedSprite; // TODO: To display object

    constructor(parentObject: GameObject, parentContainer: PIXI.Container) {
        super();
        this.parent = parentObject;
        this.parentContainer = parentContainer;
    }
    public abstract update(moveableComponent: MoveableComponent): void;

    public addAni(name: AniType, animatedSprite: AnimatedSprite) {
        this.anims[name] = animatedSprite;
        this.parentContainer.addChild(animatedSprite);
        animatedSprite.visible = false;
    }
    public setAni(name: AniType, delayMS: number = 0) {
        if (this.anims[name] === this.currentAni) { return; }

        if (delayMS) {
            setTimeout(this._setAni.bind(this, name), delayMS);
        } else {
            this._setAni(name);
        }
    }

    private _setAni(name: AniType) {
        let ani = this.anims[name];
        console.log('Set ani: ', name);
        ani.play();
        ani.visible = true;
        if (this.currentAni) {
            this.currentAni.visible = false;
            this.currentAni.gotoAndStop(0);
        }
        this.currentAni = ani;
    }
}
