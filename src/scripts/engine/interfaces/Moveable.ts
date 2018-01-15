import {Updateable} from './Updateable';
import * as _ from 'lodash';

export class Moveable implements Updateable {
    private moveVector: PIXI.Point;
    private container: PIXI.Container;

    constructor(container: PIXI.Container) {
        this.container = container;
        this.moveVector = new PIXI.Point(0, 0);
    }

    public update(delta: number): void {
        this.container.x += this.moveVector.x;
        this.container.position.y += this.moveVector.y;
        // this.container.updateTransform();
    }

    public setMoveSpeed(x: number, y?: number) {
        this.moveVector.x = x;
        if (!_.isUndefined(y)) { this.moveVector.y = y; }
    }
}
