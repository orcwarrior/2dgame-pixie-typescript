export class Vector {
    public x: number;
    public y: number;

    constructor (x: number = 0, y: number = 0) {
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
    public sign() {
        return new Vector(Math.sign(this.x), Math.sign(this.y) );
    }

    public scalarMul(n: number) {
        return new Vector(this.x * n, this.y * n);
    }
    public getDominantValue() {
        return Math.max(this.x, this.y);
    }
    public getAbsDominantValue() {
        return Math.max(Math.abs(this.x), Math.abs(this.y));
    }

    public asPixiPoint(): PIXI.Point {
        return new PIXI.Point(this.x, this.y);
    }
}
