import {Scene} from './Scene';
import {StaticObject} from '../gameObject/objects/StaticObject';
import {GenericVisualComponent} from '../gameObject/components/GenericVisualComponent';
import {orgCoordToScaled} from '../utils/coordScalar';
import {GameManager} from '../GameManager';
import BaseTexture = PIXI.BaseTexture;

let bgRes = require('file-loader!res/sprites/bg.png');
let barrierRes = require('file-loader!res/sprites/derbis/barrier.png');
let lamplightRes = require('file-loader!res/sprites/fx/lamplight.png');


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
    // extract to some util/factory function
    // (factory with some mutation function after onLoad would be nice -> for screen scaling propouses etc)

    [sX(2), sX(130), sX(270), sX(400)].forEach((x) => {
        const barrierTex = PIXI.Texture.fromImage(barrierRes, undefined, PIXI.SCALE_MODES.NEAREST);
        barrierTex.baseTexture.once('loaded', (baseTex: BaseTexture) => {
            let barrierSprite = PIXI.Sprite.from(baseTex);
            barrierSprite.width *= sX(1);
            barrierSprite.height *= sY(1);
            let barrierVis = new GenericVisualComponent(barrierSprite, {x: x, y: sY(228)});
            let barrier = new StaticObject(barrierVis, false);
            scene.addForeground(barrierVis);
        });
    });

    const LLOffset: number = 34; // Lamp light emiting center offset
    [sX(24 - LLOffset), sX(82 - LLOffset), sX(137 - LLOffset), sX(250 - LLOffset),
     sX(307 - LLOffset), sX(364 - LLOffset), sX(423 - LLOffset), sX(479 - LLOffset)].forEach((x) => {
        const lampLText = PIXI.Texture.fromImage(lamplightRes, undefined, PIXI.SCALE_MODES.LINEAR);
        lampLText.baseTexture.once('loaded', (baseTex: BaseTexture) => {
            let lampLSprite = PIXI.Sprite.from(baseTex);
            lampLSprite.blendMode = PIXI.BLEND_MODES.ADD;
            lampLSprite.width *= sX(1);
            lampLSprite.height *= sY(1);
            let lampLVis = new GenericVisualComponent(lampLSprite, {x: x, y: sY(171)});
            let lampLight = new StaticObject(lampLVis, false);
            scene.addForeground(lampLVis);
        });
    });


    return scene;
}
