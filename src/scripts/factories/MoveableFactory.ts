import {GameManager} from '../engine/GameManager';
import {Moveable} from '../engine/interfaces/Moveable';


export function moveableFactory(gameMgrInstance: GameManager) {
    return function (container: PIXI.Container): Moveable {
        let mObj = new Moveable(container);
        gameMgrInstance.addUpdateableObject(mObj);
        return mObj;
    };
}
