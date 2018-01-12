import {Key} from 'ts-keycode-enum';

export enum keyEvents {
    keydown = 'keydown',
    keyup = 'keyup',
    keypress = 'keypress'
}
export class InputManager extends PIXI.utils.EventEmitter {

    private static composeEventName(eventName: string, keyName: Key | string): string {
        if (typeof keyName === 'number') {
            // swap number -> keyname (occurs when called by Key.KeyName)
            keyName = Key[keyName];
        }
        console.log(keyName);
        return `${eventName}:${keyName}`;
    }

    constructor() {
        super();
        const keyEventsNames = Object.keys(keyEvents).map(k => k.toString());

        keyEventsNames.forEach((eventName) => this.convertGenericKeyEvents(eventName));

    }
    private convertGenericKeyEvents(eventName: string) {

        window.addEventListener(eventName.toString(), (kbEvent: KeyboardEvent | any) => {
            let keyName = Key[kbEvent.keyCode]; // DK: Using ts-keycode-enum since keyvalues can differ in different browsers
            let newEventName = InputManager.composeEventName(eventName, keyName);
            
            console.log('InpMgr: emitting: ' + newEventName);
            this.emit(newEventName, kbEvent);
        });
    }
    public addKeyEventListener(keyEvent: keyEvents | string, keyName: Key, fn: Function, context?: any) {
        this.addListener(InputManager.composeEventName(keyEvent.toString(), keyName), fn, context);

    }
}
