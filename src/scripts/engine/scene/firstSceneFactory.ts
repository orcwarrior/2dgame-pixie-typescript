import {Scene} from './Scene';
import {StaticObject} from '../gameObject/objects/StaticObject';
import {GenericVisualComponent} from '../gameObject/components/GenericVisualComponent';
import Rectangle = PIXI.Rectangle;
import {Vector} from '../utils/Vector';
import {Player} from '../gameObject/player/Player';
import SCALE_MODES = PIXI.CONST.SCALE_MODES;

let bgRes = require('file-loader!res/sprites/bg.png');
let goombaRes = require('file-loader!res/sprites/goomba.png');

// All objects are precompossed in photoshop so it would be nice
// to set coordinates based on org. photoshop file. Other thing is that window size
// could differ and using absolute coords would suck.
function orgCoordToScaled(sceneSize: PIXI.Rectangle, orginalBGSize: PIXI.Rectangle) {
    let scalar = new Vector(sceneSize.width / orginalBGSize.width,
        sceneSize.height / orginalBGSize.height);
    return [function X(n: number) {
        return n * scalar.x;
    }, function Y(n: number) {
        return n * scalar.y;
    }];
}

export function firstSceneFactory(sceneSize: PIXI.Rectangle, player: Player): Scene {
    let scene = new Scene(player);
    const [sX, sY] = orgCoordToScaled(sceneSize, new Rectangle(0, 0, 1920, 1080));
    // Backgrounds:
    let bgSprite = PIXI.Sprite.fromImage(bgRes, undefined, PIXI.SCALE_MODES.NEAREST);
    bgSprite.width = sceneSize.width;
    bgSprite.height = sceneSize.height;
    let bg = new StaticObject(new GenericVisualComponent(bgSprite), false);
    scene.addBackground(bgSprite);

    let bridgeGFX = new PIXI.Graphics();
    bridgeGFX.beginFill(0x030c0f);
    bridgeGFX.drawRect(0, sY(958), sceneSize.width, sY(50));
    let bridge = new StaticObject(new GenericVisualComponent(bridgeGFX));
    scene.addBackground(bridgeGFX);
    // TODO: Way of creating & configuring sprites is big no-no
    // extract to some util function
    const goombaSprite = PIXI.Sprite.fromImage(goombaRes);
    goombaSprite.width = 50;
    goombaSprite.height = 50;
    let goomba = new StaticObject(new GenericVisualComponent(goombaSprite, {x: sX(200), y: sY(850)}));
    scene.addObject(goombaSprite);

    return scene;
}
