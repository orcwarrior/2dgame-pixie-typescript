
import {InputComponent} from '../abstract/InputComponent';
import {GameObject} from '../../GameObject';
import {Key} from 'ts-keycode-enum';

export class PlayerInputComponent extends InputComponent {
    constructor(parentObject: GameObject) {
        super(parentObject);

        this.applyPlayerKeybindings();
    }

    private applyPlayerKeybindings() {
        // TODO: Emit keydown only when it was actually depressed.
        const keyEvent = this.inputMgr.addKeyEventListener;
        this.inputMgr.addKeyEventListener('keydown', Key.LeftArrow, () => this.emit('moveleft'));
        this.inputMgr.addKeyEventListener('keydown', Key.RightArrow, () => this.emit('moveright'));

        this.inputMgr.addKeyEventListener('keyup', Key.LeftArrow, () => this.emit('moveleftstop'));
        this.inputMgr.addKeyEventListener('keyup', Key.RightArrow, () => this.emit('moverightstop'));
    }
}
