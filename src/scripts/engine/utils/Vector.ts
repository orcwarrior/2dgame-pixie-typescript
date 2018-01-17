export class Vector {
    public x: number;
    public y: number;
    constructor (x: number, y: number) {
        this.x = x;
        this.y = y;
    }
    // All operations are immutables:
    public add(v: Vector) {
        return new Vector(this.x + v.x, this.y + v.y);
    }
    public sub(v: Vector) {
        return new Vector(this.x - v.x, this.y - v.y);
    }
    public mul(v: Vector) {
        return new Vector(this.x * v.x, this.y * v.y);
    }
    public sign(v: Vector) {
        return new Vector(Math.sign(this.x), Math.sign(this.y));
    }
    public asPixiPoint(): PIXI.Point {
        return new PIXI.Point(this.x, this.y);
    }
}
