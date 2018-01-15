import {GameManager} from '../engine/GameManager';
import {MoveableObject} from '../objects/MoveableObject';
import AnimatedSprite = PIXI.extras.AnimatedSprite;
import {Updateable} from '../engine/interfaces/Updateable';
import {Renderable} from '../engine/interfaces/Renderable';
import {Key} from 'ts-keycode-enum';
import {AnimsMap} from '../engine/utils/utils';
import generateAnimsMapFromSpritesheet from '../engine/utils/generateAnimsMapFromSpritesheet';
import * as _ from 'lodash';
import {Moveable} from '../engine/interfaces/Moveable';


enum AniType {
    idle = 'idle',
    run_down = 'run_down',
    run_up = 'run_up',
    run_left = 'run_left',
    run_right = 'run_right'
}


class Player implements Renderable {
    // TODO: Make em' private when Force class ll be done.
    // TODO: #2 When it works, extract to some AnimatedObject
    // and Moveable object too, to make it generic & behavioral
    // Player could compose over both of this clasess and then it
    // should be fine.
    private static moveSpeed: number = 1.4;

    private anims: AnimsMap;
    private currentAni: PIXI.extras.AnimatedSprite;
    private playerContainer: PIXI.Container;
    private moveable: Moveable;

    constructor(anims: AnimsMap, moveable: Moveable, container: PIXI.Container) {
        this.anims = anims;
        this.playerContainer = container;
        this.moveable = moveable;
        _.forEach(this.anims, (spriteAni) => {
            container.addChild(spriteAni);
            spriteAni.visible = false;
        });

        let graphics = new PIXI.Graphics();

// set a fill and line style
        graphics.beginFill(0xFF3300, 0.1);
        graphics.lineStyle(1, 0xffd900, 0.5);
        graphics.drawRect(-32, -64, 64, 128);
        graphics.endFill();
        container.addChild(graphics);

        this.setAni(AniType.idle);

    }

    public addAni(name: AniType, animatedSprite: AnimatedSprite) {
        this.anims[name] = animatedSprite;
        this.playerContainer.addChild(animatedSprite);
    }

    public setAni(name: AniType) {
        let ani = this.anims[name];
        if (ani === this.currentAni) { return; }
        ani.play();
        ani.visible = true;
        if (this.currentAni) {
            this.currentAni.visible = false;
            this.currentAni.gotoAndStop(0);
        }
        this.currentAni = ani;
    }


    public getSprite(): AnimatedSprite {
        return this.currentAni;
    }

    public moveRight() {
        this.setAni(AniType.run_right);
        this.moveable.setMoveSpeed(Player.moveSpeed);
    }

    public moveLeft() {
        this.setAni(AniType.run_left);
        this.moveable.setMoveSpeed(-Player.moveSpeed);
    }

    public stopMoving() {
        this.setAni(AniType.idle);
        this.moveable.setMoveSpeed(0, 0);
    }

    public render(renderContext: PIXI.WebGLRenderer | PIXI.CanvasRenderer) {
        renderContext.render(this.playerContainer);
        // renderContext.render(this.currentAni);
    }
}


function _attachPlayerKeybindings(gameMgrInstance: GameManager, player: Player) {
    let inputMgr = gameMgrInstance.getInputManager();
    // inputMgr.addKeyEventListener('keydown', Key.UpArrow, () => player.my = -1);
    // inputMgr.addKeyEventListener('keydown', Key.DownArrow, () => player.my = 1);
    inputMgr.addKeyEventListener('keydown', Key.LeftArrow, () => player.moveLeft());
    inputMgr.addKeyEventListener('keydown', Key.RightArrow, () => player.moveRight());

    inputMgr.addKeyEventListener('keyup', Key.LeftArrow, () => player.stopMoving());
    inputMgr.addKeyEventListener('keyup', Key.RightArrow, () => player.stopMoving());
}

function _generatePlayerAnimatedSprites(player: Player) {
    return null;
}

function _createPlayerContainer(gameMgrInstance: GameManager) {
    let container = new PIXI.Container();
    container.x = 40;
    container.y = 400;
    container.setParent(gameMgrInstance.getRootContainer());
    return container;
}

export function playerFactory(gameMgrInstance: GameManager) {
    return async function (aniSprite: PIXI.extras.AnimatedSprite): Promise<Player> {
        let anims = await generateAnimsMapFromSpritesheet(
            require('res/sprites/player/player.json'),
            require('file-loader!res/sprites/player/player.png'));

        let container = _createPlayerContainer(gameMgrInstance);
        let player = new Player(anims, gameMgrInstance.getMoveableFactory()(container), container);
        gameMgrInstance.addRenderableObject(player);
        _attachPlayerKeybindings(gameMgrInstance, player);
        return await player;
    };
}
