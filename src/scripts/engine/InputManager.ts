import {Key} from 'ts-keycode-enum';

export enum keyEvents {
    keydown = 'keydown',
    keyup = 'keyup',
    keypress = 'keypress'
}
export class InputManager extends PIXI.utils.EventEmitter {

    constructor() {
        super();
        const keyEventsNames = Object.keys(keyEvents).map(k => k.toString());

        keyEventsNames.forEach((eventName) => this.convertGenericKeyEvents(eventName));

    }
    private convertGenericKeyEvents(eventName: string) {

        window.addEventListener(eventName.toString(), (kbEvent: KeyboardEvent | any) => {
            let keyName = Key[kbEvent.keyCode]; // DK: Using ts-keycode-enum since keyvalues can differ in different browsers
            let newEventName = this.composeEventName(eventName, keyName);
            
            console.log('InpMgr: emitting: ' + newEventName);
            this.emit(newEventName, kbEvent);
        });
    }
    public addKeyEventListener(keyEvent: keyEvents | string, keyName: Key, fn: Function, context?: any) {
        this.addListener(this.composeEventName(keyEvent.toString(), keyName), fn, context);

    }
    private composeEventName(eventName: string, keyName: Key | string): string {
        return `${eventName}:${keyName}`;
    }
}