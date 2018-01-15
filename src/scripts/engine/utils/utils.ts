import AnimatedSprite = PIXI.extras.AnimatedSprite;

export interface AnimsMap {
    [key: string]: AnimatedSprite;
}

export function pointsAdd(a: PIXI.Point, b: PIXI.Point) {
    return new PIXI.Point(a.x + b.x, a.y + b.y);
}