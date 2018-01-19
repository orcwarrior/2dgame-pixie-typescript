import {Key} from 'ts-keycode-enum';
import {GameManager, GameState} from './GameManager';

export enum keyEvents {
    // NOTE: keydown acts differently than normal DOM KeyboardEvent, it's fired
    // by InputManager only once, when key is actually pressed.
    keydown = 'keydown',
    keyup = 'keyup',
    // keypress = 'keypress' // keypress event make inputevents concepts blurry -> not used.
}
export class InputManager extends PIXI.utils.EventEmitter {
    private keypressed: {[key: string]: boolean};

    constructor() {
        super();
        const keyEventsNames = Object.keys(keyEvents).map(k => k.toString());
        this.keypressed = {};
        keyEventsNames.forEach((eventName) => this.convertBrowserKeyEvent(eventName));

        this.mainGameKeyevents();
    }

    public addKeyEventListener(keyEvent: keyEvents | string, keyName: Key, fn: Function, context?: any) {
        this.addListener(this.composeEventName(keyEvent.toString(), keyName), fn, context);
    }

    private convertBrowserKeyEvent(eventName: string) {

        window.addEventListener(eventName.toString(), (kbEvent: KeyboardEvent | any) => {
            let keyName = Key[kbEvent.keyCode]; // DK: Using ts-keycode-enum since keyvalues can differ in different browsers
            let newEventName = this.composeEventName(eventName, keyName);

            if (this.letKeydownEmitOnce(keyName, eventName)) {
                console.log('InpMgr: emitting: ' + newEventName);
                this.emit(newEventName, kbEvent);
                this.keypressed[keyName] = (eventName !== keyEvents.keyup); // set keypressed depending on event
                console.log(this.keypressed);
            }
        });
    }

    // TODO: I Don't like this piece of code there
    private mainGameKeyevents() {

        this.addKeyEventListener(keyEvents.keydown, Key.Enter, () => GameManager.instance.initialize());
        this.addKeyEventListener(keyEvents.keydown, Key.Escape, () => {
            if (GameManager.instance.getState() === GameState.PLAY) {
                GameManager.instance.pause();
            } else {
                GameManager.instance.unpause();
            }
        });
    }

    private composeEventName(eventName: string, keyName: Key | string): string {
        if (typeof keyName === 'number') {
            // swap number -> keyname (occurs when called by Key.KeyName)
            keyName = Key[keyName];
        }
        console.log(keyName);
        return `${eventName}:${keyName}`;
    }

    private letKeydownEmitOnce(eventKeyCode: string, eventName: string) {
        return !this.keypressed[eventKeyCode] || eventName !== keyEvents.keydown;
    }
}
