import {GameManager} from '../engine/GameManager';
import {GameObject} from '../objects/GameObject';
import {PlayerAnimsComponent} from '../objects/player/PlayerAnimsComponent';
import {PlayerInputComponent} from '../objects/player/PlayerInputComponent';
import {ForceMoveableComponent} from '../objects/ForceMoveableComponent';
import {Direction, Force} from '../engine/Force';
import {GenericVisualComponent} from '../objects/GenericVisualComponent';
import {GenericCollisionComponent} from '../objects/GenericCollisionComponent';

let gameManager;


class Player extends GameObject {
    private static moveSpeed: number = 2.5;


    constructor() {
        super();
        this.visualComponent = new GenericVisualComponent(undefined, {x: 400, y: 500});
        let container = this.visualComponent.getContainer();
        this.collisionComponent = new GenericCollisionComponent(this, container.getBounds);
        this.moveableComponent = new ForceMoveableComponent(this);
        this.inputComponent = new PlayerInputComponent(this);
        this.aniComponent = new PlayerAnimsComponent(this, container, this.inputComponent);

        this.setupForcesOnInput();
    }

    public update(delta: number) {
        this.aniComponent.update(this.moveableComponent);
        this.moveableComponent.update(this.visualComponent.getContainer());
    }

    private setupForcesOnInput() {
        // TODO: Move to some component or create new Moveable for player
        // (Bad thing it would add another level of composition (and complexity))
        const input = this.inputComponent;
        const fmc = <ForceMoveableComponent>this.moveableComponent;
        input.on('moveleft', () =>
            fmc.applyForce('mLeft', new Force(Direction.LEFT, Player.moveSpeed, 300), true)
        );
        input.on('moveright', () =>
            fmc.applyForce('mRight', new Force(Direction.RIGHT, Player.moveSpeed, 300), true)
        );
        input.on('moveleftstop', () => this._setSlideAni(fmc, 'mLeft'));
        input.on('moverightstop', () => this._setSlideAni(fmc, 'mRight'));
    }
    private _setSlideAni(forceMovablComp: ForceMoveableComponent, forceId: string) {
        const curForceVel = forceMovablComp.getForceVelocity(forceId);
        const maxVel = curForceVel.getAbsDominantValue();
        const slideDuration = 500 * (maxVel / Player.moveSpeed);
        forceMovablComp.applyForce(forceId, new Force(curForceVel, 1, slideDuration, Force.decelerateLinear), true);
    }
}

export function playerFactory(gameMgrInstance: GameManager) {
    gameManager = gameMgrInstance;
    return function (): Player {

        let player = new Player();
        gameMgrInstance.addUpdateableObject(player);
        return player;
    };
}
