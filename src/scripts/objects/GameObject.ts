import EventEmitter = PIXI.utils.EventEmitter;

export abstract class GameObject extends EventEmitter {
    constructor() {
        super();
    }
}
