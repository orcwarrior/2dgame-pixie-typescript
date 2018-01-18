import AnimatedSprite = PIXI.extras.AnimatedSprite;

export interface AnimsMap {
    [key: string]: AnimatedSprite;
}

export function IntersectRect(a: PIXI.Rectangle, b: PIXI.Rectangle): PIXI.Rectangle {
    let xStart = Math.max(a.x, b.x);
    let yStart = Math.max(a.x, b.y);
    let xEnd = Math.min(a.x + a.width, b.x + b.width);
    let yEnd = Math.min(a.y + a.height, b.y + b.height);
    if (xEnd >= xStart && yEnd >= yStart) {
        return new PIXI.Rectangle(xStart, yStart, xEnd - xStart, yEnd - yStart);
    } else {
        return PIXI.Rectangle.EMPTY;
    }
}

