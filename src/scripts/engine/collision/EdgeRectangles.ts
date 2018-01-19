import {Direction, directionEnumKeys} from '../force/Force';
import {IntersectRect} from '../utils/utils';
import {CollisionResults} from './CollisionResults';

// Class creating edge rectangles from rectangle for checking collision in detail
// (from which direction collision is occuring)
export class EdgeRectangles {

    private edges: { [key: string]: { rect: PIXI.Rectangle, dir: Direction } };
    private baseRect: PIXI.Rectangle;
    private edgeThickness: number;

    public static getEdgeRect(r: PIXI.Rectangle, side: Direction,
                              thickness: number = 2, sizePart: number = 0.4): PIXI.Rectangle {
        // DK: Rectangle in corners could give wrong impression about collision
        // so we skip part of width/height by sizePart parameter.
        let skipPart = 0;
        if (side === Direction.LEFT || side === Direction.RIGHT) {
            skipPart = r.height * sizePart / 2;
            const xStart = (side === Direction.LEFT) ? r.left : r.right - thickness;
            return new PIXI.Rectangle(xStart, r.top + skipPart, thickness, r.height - skipPart * 2);
        } else /* if (side === Direction.UP || side === Direction.DOWN) */ {
            skipPart = r.width * sizePart / 2;
            const yStart = (side === Direction.UP) ? r.top : r.bottom - thickness;
            return new PIXI.Rectangle(r.left + skipPart, yStart, r.width - skipPart * 2, thickness);
        }
    }

    constructor(baseRect: PIXI.Rectangle, edgeThickness: number = 4) {
        this.baseRect = baseRect;
        this.edgeThickness = edgeThickness;
        this.edges = {};
        this.initializeEdges();
    }

    public testIntersection(rect: PIXI.Rectangle, minIntersection: number = 6): CollisionResults {
        let res = new CollisionResults();
        this.asArray().forEach((edgeRect) => {
            let edgeIntersect = IntersectRect(edgeRect.rect, rect);
            if (edgeIntersect.width * edgeIntersect.height > minIntersection) {
                res.collideSide(edgeRect.dir);
            }
        });
        return res;
    }

    private asArray(): Array<{ rect: PIXI.Rectangle, dir: Direction }> {
        return Object.keys(this.edges).map((k) => this.edges[k]);
    }

    private initializeEdges(): void {
        directionEnumKeys.forEach((dir) => {
            this.edges[dir] = {rect: EdgeRectangles.getEdgeRect(this.baseRect, dir, this.edgeThickness), dir: dir};
        });
    }
}
