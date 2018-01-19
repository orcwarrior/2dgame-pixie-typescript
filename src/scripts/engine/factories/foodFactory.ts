import generatesSpritesFromSpritesheet from '../utils/generateSpritesFromSpritesheet';
import {DynamicObject} from '../gameObject/objects/DynamicObject';
import {GameObject} from '../gameObject/GameObject';
import {GenericVisualComponent} from '../gameObject/components/GenericVisualComponent';
import Sprite = PIXI.Sprite;
import {ForcesContainer} from '../force/ForcesContainer';
import {Direction, Force} from '../force/Force';
import {Vector} from '../utils/Vector';
import * as _ from 'lodash';
import {Player} from '../gameObject/player/Player';
import {CollisionReport} from '../collision/CollisionReport';
import {orgCoordToScaled} from '../utils/coordScalar';
import {CollisionComponent} from '../gameObject/components/abstract/CollisionComponent';
import {delayedPromise} from '../utils/delayedPromise';
import {VisualComponent} from '../gameObject/components/abstract/VisualComponent';

const foodRes = require('file-loader!res/sprites/food/food.png');
const foodSpritesheet = require('res/sprites/food/food.json');

interface FoodOrigin {
    x: number;
    y: number;
    dir: Direction;
}

export function getFoodOriginLocations(): FoodOrigin {
    const [sX, sY] = orgCoordToScaled();
    const foodOrginLocations: FoodOrigin[] = [
        {x: sX(136), y: sY(44), dir: Direction.RIGHT},
        {x: sX(123), y: sY(117), dir: Direction.RIGHT},
        {x: sX(392), y: sY(139), dir: Direction.LEFT},
    ];
    return _.sample(foodOrginLocations) || foodOrginLocations[0];
}

// TODO: Pass scene scalar?
export type foodFactoryResult = { gameObj: GameObject, vis: VisualComponent };

export async function foodFactory(): Promise<() => foodFactoryResult> {
    let foodSprites = await generatesSpritesFromSpritesheet(foodSpritesheet, foodRes);
    Object.keys(foodSprites).forEach((key) => processFoodSprite(foodSprites[key]));

    return function (fo?: FoodOrigin): foodFactoryResult {
        if (!fo) {
            fo = getFoodOriginLocations();
        }
        // TODO: If it picks sprite that's already on the scene, older'll dispear
        let foodSprite: Sprite = _.sample(foodSprites) || foodSprites[0];
        processFoodSprite(foodSprite);
        let foodPos = new Vector(fo.x, fo.y);
        let foodVisual = new GenericVisualComponent(foodSprite, foodPos);
        let foodObj = new DynamicObject(foodVisual, {on: onFoodCollide}, generateFoodForces(foodPos, fo));
        return {gameObj: foodObj, vis: foodVisual};
    };
}

function processFoodSprite(sprite: Sprite) {
    sprite.width = 24;
    sprite.height = 24;
    sprite.anchor.set(0.5, 0.5);
    const rotateSprite = () => {
        sprite.rotation += 1.2;
        delayedPromise(200, rotateSprite);
    };
    delayedPromise(200, rotateSprite);

    return sprite;
}

function onFoodCollide(this: CollisionComponent, obj: GameObject, report: CollisionReport) {
    if (Player.isPlayer(obj)) {
        console.log('Food collided with player!!');
    } else {
        console.log('You didnt catch it :(');
    }
    let selfObj = this.getParent();
    selfObj.destroy();

    return;
}

function generateFoodForces(foodPos: Vector, fO: FoodOrigin) {
    const [sX, sY] = orgCoordToScaled();
    const foodLowOriginHandicap = (fO.y - sY(44)) / 50;
    const yFormula = Math.random() * 4 + 6 + foodLowOriginHandicap;
    const xFormula = 4 + Math.random() * 6 - foodLowOriginHandicap / 2;

    let foodForces = new ForcesContainer();
    let throwForces = [new Force(Direction.UP, yFormula, 1800, Force.decelerateLinear)];
    throwForces.push(new Force(fO.dir, xFormula, 3000, Force.decelerateLinear));
    foodForces.applyForce('gravity', Force.gravity);
    throwForces.forEach((force: Force, idx: number) => {
        foodForces.applyForce(`throw${idx}`, force);
    });
    return foodForces;
}
