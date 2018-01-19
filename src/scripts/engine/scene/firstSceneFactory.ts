import {Scene} from './Scene';
import {StaticObject} from '../gameObject/objects/StaticObject';
import {GenericVisualComponent} from '../gameObject/components/GenericVisualComponent';
import {Player} from '../gameObject/player/Player';
import {foodFactory, foodFactoryResult, getFoodOriginLocations} from '../factories/foodFactory';
import {orgCoordToScaled} from '../utils/coordScalar';
import {delayedPromise} from '../utils/delayedPromise';
import {GameManager} from '../GameManager';

let bgRes = require('file-loader!res/sprites/bg.png');
let goombaRes = require('file-loader!res/sprites/goomba.png');


export function firstSceneFactory(): Scene {
    let scene = new Scene();
    const [sX, sY] = orgCoordToScaled();
    // Backgrounds:
    let bgSprite = PIXI.Sprite.fromImage(bgRes, undefined, PIXI.SCALE_MODES.NEAREST);
    let sceneWidth = bgSprite.width = GameManager.instance.gameSize.width;
    bgSprite.height = GameManager.instance.gameSize.height;
    let bgVis = new GenericVisualComponent(bgSprite);
    let bg = new StaticObject(bgVis, false);
    scene.addBackground(bgVis);

    let bridgeGFX = new PIXI.Graphics();
    bridgeGFX.beginFill(0x030c0f);
    bridgeGFX.drawRect(0, sY(237), sceneWidth, sY(10));
    let bridgeVis = new GenericVisualComponent(bridgeGFX);
    let bridge = new StaticObject(bridgeVis);
    scene.addBackground(bridgeVis);
    // TODO: Way of creating & configuring sprites is big no-no
    // extract to some util function
    const goombaSprite = PIXI.Sprite.fromImage(goombaRes);
    goombaSprite.width = 50;
    goombaSprite.height = 50;
    let goombaVis = new GenericVisualComponent(goombaSprite, {x: sX(20), y: sY(230)});
    let goomba = new StaticObject(goombaVis);
    scene.addObject(goombaVis);


    return scene;
}
