import {Direction, directionEnumKeys} from '../Force';
import {IntersectRect} from '../utils/utils';
import {CollisionResults} from './CollisionResults';

// Class creating edge rectangles from rectangle for checking collision in detail
// (from which direction collision is occuring)
export class EdgeRectangles {

    private edges: { [key: string]: { rect: PIXI.Rectangle, dir: Direction } };
    private baseRect: PIXI.Rectangle;
    private edgeThickness: number;

    public static getEdgeRect(r: PIXI.Rectangle, side: Direction, thickness: number = 1): PIXI.Rectangle {
        if (side === Direction.LEFT || side === Direction.RIGHT) {
            const xStart = (side === Direction.LEFT) ? r.left : r.right - thickness;
            return new PIXI.Rectangle(xStart, r.top, thickness, r.height);
        } else /* if (side === Direction.UP || side === Direction.DOWN) */ {
            const yStart = (side === Direction.UP) ? r.top : r.bottom - thickness;
            return new PIXI.Rectangle(r.left, yStart, r.width, thickness);
        }
    }

    constructor(baseRect: PIXI.Rectangle, edgeThickness: number = 1) {
        this.baseRect = baseRect;
        this.edgeThickness = edgeThickness;
        this.edges = {};
        this.initializeEdges();
    }

    public testIntersection(rect: PIXI.Rectangle, minIntersection: number = 5): CollisionResults {
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
