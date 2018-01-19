// All objects are precompossed in photoshop so it would be nice
// to set coordinates based on org. photoshop file. Other thing is that window size
// could differ and using absolute coords would suck.
import {Vector} from './Vector';
import {GameManager} from '../GameManager';

const orginalBGSize = new PIXI.Rectangle(0, 0, 480, 270);

type orgCoordUtils = [(x: number) => number, (y: number) => number];
export function orgCoordToScaled(): orgCoordUtils {
    let gameSize = GameManager.instance && GameManager.instance.gameSize;
    let scalar = new Vector(gameSize.width / orginalBGSize.width,
        gameSize.height / orginalBGSize.height);
    return [function X(n: number) {
        return n * scalar.x;
    }, function Y(n: number) {
        return n * scalar.y;
    }];
}
