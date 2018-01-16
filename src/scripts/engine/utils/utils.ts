import AnimatedSprite = PIXI.extras.AnimatedSprite;

export interface AnimsMap {
    [key: string]: AnimatedSprite;
}

export function pointsAdd(a: PIXI.Point, b: PIXI.Point) {
    return new PIXI.Point(a.x + b.x, a.y + b.y);
}

export function pointMul(p: PIXI.Point, m: number) {
    return new PIXI.Point(p.x * m, p.y * m);
}
