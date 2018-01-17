import {Updateable} from './Updateable';
import * as _ from 'lodash';
import {Vector} from '../utils/Vector';

export class Moveable implements Updateable {
    private moveVector: Vector;
    private container: PIXI.Container;

    constructor(container: PIXI.Container) {
        this.container = container;
        this.moveVector = new Vector();
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
