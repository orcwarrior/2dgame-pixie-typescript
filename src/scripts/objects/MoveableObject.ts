import {Updateable} from '../engine/interfaces/Updateable';
import {GameManager} from "../engine/GameManager";

export class MoveableObject extends Updateable {

    public mx: number;
    public my: number;
    protected sprite: PIXI.Sprite;
    //protected forces: Array<Force>;

    constructor(sprite: PIXI.Sprite, mx: number = 0, my: number = 0) {
        super();
        this.sprite = sprite;
        this.mx = mx;
        this.my = my;
    }

    public update(delta: number) {
        this.sprite.x += this.mx;
        this.sprite.y += this.my;
    }
    public getSprite() {
        return this.sprite;
    }
    public addForce() {

    }
}
