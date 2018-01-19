import {Scene} from './Scene';
import {StaticObject} from '../gameObject/objects/StaticObject';
import {GenericVisualComponent} from '../gameObject/components/GenericVisualComponent';
import {Player} from '../gameObject/player/Player';
import {foodFactory, foodFactoryResult, getFoodOriginLocations} from '../factories/foodFactory';
import {orgCoordToScaled} from '../utils/coordScalar';
import {delayedPromise} from '../utils/delayedPromise';

let bgRes = require('file-loader!res/sprites/bg.png');
let goombaRes = require('file-loader!res/sprites/goomba.png');


export function firstSceneFactory(sceneSize: PIXI.Rectangle, player: Player): Scene {
    let scene = new Scene(player);
    const [sX, sY] = orgCoordToScaled();
    // Backgrounds:
    let bgSprite = PIXI.Sprite.fromImage(bgRes, undefined, PIXI.SCALE_MODES.NEAREST);
    bgSprite.width = sceneSize.width;
    bgSprite.height = sceneSize.height;
    let bg = new StaticObject(new GenericVisualComponent(bgSprite), false);
    scene.addBackground(bgSprite);

    let bridgeGFX = new PIXI.Graphics();
    bridgeGFX.beginFill(0x030c0f);
    bridgeGFX.drawRect(0, sY(237), sceneSize.width, sY(10));
    let bridge = new StaticObject(new GenericVisualComponent(bridgeGFX));
    scene.addBackground(bridgeGFX);
    // TODO: Way of creating & configuring sprites is big no-no
    // extract to some util function
    const goombaSprite = PIXI.Sprite.fromImage(goombaRes);
    goombaSprite.width = 50;
    goombaSprite.height = 50;
    let goomba = new StaticObject(new GenericVisualComponent(goombaSprite, {x: sX(20), y: sY(230)}));
    scene.addObject(goombaSprite);

    foodFactory().then((FoodFactory: (fo: any) => foodFactoryResult) => {
        delayedPromise(2000, () => {
            let foodOrigin = getFoodOriginLocations();
            let food = FoodFactory(foodOrigin);
            scene.addObject(food.vis);
        });
    });

    return scene;
}
