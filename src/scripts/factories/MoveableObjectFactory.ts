import {GameManager} from '../engine/GameManager';
import {MoveableObject} from '../objects/MoveableObject';


export function moveableObjectFactory(gameMgrInstance: GameManager) {
    return function (sprite: PIXI.Sprite): MoveableObject {
        let mObj = new MoveableObject(sprite);
        gameMgrInstance.addUpdateableObject(mObj);
        gameMgrInstance.addRenderedSprite(mObj.getSprite());
        return mObj;
    };
}
