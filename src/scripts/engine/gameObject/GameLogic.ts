import {Player} from './player/Player';
import {Updateable} from '../interfaces/Updateable';
import {Scene} from '../scene/Scene';
import {GameManager} from '../GameManager';
import {foodFactory, foodFactoryResult, getFoodOriginLocations} from '../factories/foodFactory';
import {delayedPromise} from '../utils/delayedPromise';
import {CollisionReport} from '../collision/CollisionReport';

const sfx = {
    crash: require('file-loader!res/sfx/crash.mp3'),
    fall: require('file-loader!res/sfx/fall.mp3'),
    pickup: require('file-loader!res/sfx/pickup.mp3'),
};

export class GameLogic implements Updateable {
    private player: Player;
    private foodDelivery: boolean;
    private foodFactory: (fO: Object) => foodFactoryResult;
    private scene: Scene;

    constructor(player: Player, scene: Scene) {
        this.foodDelivery = false;
        this.player = player;
        this.scene = scene;
        GameManager.instance.addUpdateableObject(this);
    }

    public update(delta: Number): void {
        if (!this.foodDelivery) {
            this.foodDelivery = true;
            delayedPromise(this.getFoodDeliveryTime(), this.deliverFood, this);
        }

    }

    private async deliverFood(): Promise<void> {
        if (!this.foodFactory) {
            this.foodFactory = await foodFactory();
        }
        let foodOrigin = getFoodOriginLocations();
        let food = this.foodFactory(foodOrigin);
        GameManager.instance.getSoundManager().play(sfx.fall);
        this.scene.addObject(food.vis);
        food.gameObj.on('collision', this.foodCollision.bind(this));
        this.foodDelivery = false;
    }
    public foodCollision(report: CollisionReport) {
        console.log('Food colission!!!', report);
        let other = report.otherColl && report.otherColl.getParent();
        if (Player.isPlayer(other)) {
            this.player.stats.increaseScore();
            this.player.stats.increaseSpeed();
            GameManager.instance.getSoundManager().play(sfx.pickup);
        } else {
            this.player.stats.decreaseLives();
            this.player.stats.decreaseSpeed();
            GameManager.instance.getSoundManager().play(sfx.crash);
        }
    }

    private getFoodDeliveryTime() {
        let ms = 3000 + Math.random() * 4000;
        let scorePenality = Math.random() * (this.player.stats.score * 10);
        scorePenality = Math.min(scorePenality, ms / 2);
        let livesReward = (10 - this.player.stats.lives) * 10;
        return ms - scorePenality + livesReward;
    }
}
