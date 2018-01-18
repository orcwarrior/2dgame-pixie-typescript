
import {GameObject} from '../../GameObject';
import EventEmitter = PIXI.utils.EventEmitter;
import {InputManager} from '../../../InputManager';
import {GameManager} from '../../../GameManager';

export abstract class InputComponent extends EventEmitter {
    protected inputMgr: InputManager;
    constructor(parentObject: GameObject) {
        super();
        this.inputMgr = GameManager.instance.getInputManager();
    }

}
