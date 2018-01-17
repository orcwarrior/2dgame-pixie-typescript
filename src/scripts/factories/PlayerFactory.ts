import {GameManager} from '../engine/GameManager';
import {GameObject} from '../objects/GameObject';
import {AnimsComponent} from '../engine/gameObjectComponents/AnimsComponent';
import {PlayerAnimsComponent} from '../objects/player/PlayerAnimsComponent';
import {PlayerInputComponent} from '../objects/player/PlayerInputComponent';
import {InputComponent} from '../engine/gameObjectComponents/InputComponent';
import {ForceMoveableComponent} from '../objects/ForceMoveableComponent';
import {Direction, Force} from '../engine/Force';

let gameManager;


class Player extends GameObject {
    private static moveSpeed: number = 2.5;

    private playerContainer: PIXI.Container;
    private aniComponent: AnimsComponent;
    private moveableComponent: ForceMoveableComponent;
    private inputComponent: InputComponent;

    constructor(container: PIXI.Container) {
        super();
        this.playerContainer = container;
        this.moveableComponent = new ForceMoveableComponent(this);
        this.inputComponent = new PlayerInputComponent(this);
        this.aniComponent = new PlayerAnimsComponent(this, container, this.inputComponent);

        this.setupForcesOnInput();
        // this.addBBox();
    }

    public update(delta: number) {
        this.moveableComponent.update(this.playerContainer);
        this.aniComponent.update(this.moveableComponent);
    }

    public render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer) {
        renderContext.render(this.playerContainer);
    }

    private addBBox() {
        let graphics = new PIXI.Graphics();
        // set a fill and line style
        graphics.beginFill(0xFF3300, 0.1);
        graphics.lineStyle(1, 0xffd900, 0.5);
        graphics.drawRect(-32, -64, 64, 128);
        graphics.endFill();
        this.playerContainer.addChild(graphics);
    }

    private setupForcesOnInput() {
        // TODO: Move to some component or create new Moveable for player
        // (Bad thing it would add another level of composition (and complexity))
        const input = this.inputComponent;
        const mc = this.moveableComponent;
        input.on('moveleft', () =>
            mc.applyForce('mLeft', new Force(Direction.LEFT, Player.moveSpeed, 300), true)
        );
        input.on('moveright', () =>
            mc.applyForce('mRight', new Force(Direction.RIGHT, Player.moveSpeed, 300), true)
        );
        input.on('moveleftstop', () => {
            let curForceVel = this.moveableComponent.getForceVelocity('mLeft');
            let maxVel = curForceVel.getAbsDominantValue();
            console.log('Slide time: ', 500 * (maxVel / Player.moveSpeed));
            mc.applyForce('mLeft', new Force(curForceVel, 1, 500 * (maxVel / Player.moveSpeed), Force.decelerateLinear), true);
        });
        input.on('moverightstop', () => {
            let curForceVel = this.moveableComponent.getForceVelocity('mRight');
            let maxVel = curForceVel.getAbsDominantValue();
            console.log('Slide time: ', 500 * (maxVel / Player.moveSpeed));
            mc.applyForce('mRight', new Force(curForceVel, 1, 500 * (maxVel / Player.moveSpeed), Force.decelerateLinear), true);
        });
    }
}


function _createPlayerContainer(gameMgrInstance: GameManager) {
    let container = new PIXI.Container();
    container.x = 40;
    container.y = 400;
    container.setParent(gameMgrInstance.getRootContainer());
    return container;
}

export function playerFactory(gameMgrInstance: GameManager) {
    gameManager = gameMgrInstance;
    return function (): Player {

        let container = _createPlayerContainer(gameMgrInstance);
        let player = new Player(container);
        gameMgrInstance.addRenderableObject(player);
        gameMgrInstance.addUpdateableObject(player);
        return player;
    };
}
