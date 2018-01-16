import {AnimsComponent, AniType} from '../../engine/gameObjectComponents/AnimsComponent';
import {GameObject} from '../GameObject';
import generateAnimsMapFromSpritesheet from '../../engine/utils/generateAnimsMapFromSpritesheet';
import {InputComponent} from '../../engine/gameObjectComponents/InputComponent';
import * as _ from 'lodash';
import {MoveableComponent} from '../../engine/gameObjectComponents/MoveableComponent';

export class PlayerAnimsComponent extends AnimsComponent {
    private lastMCVelocityX: number = 0;

    constructor(parentObject: GameObject, parentContainer: PIXI.Container, inputComponent: InputComponent) {
        super(parentObject, parentContainer);

        this.setupPlayerAnims();
        this.setupInputHandling(inputComponent);
    }

    public update(moveableComponent: MoveableComponent): void {
        if (moveableComponent.getVelocityVector().x === 0 && this.lastMCVelocityX === 0) {
            this.setAni(AniType.idle);
        }
        this.lastMCVelocityX = moveableComponent.getVelocityVector().x;
    }

    private async setupPlayerAnims() {
        this.anims = await generateAnimsMapFromSpritesheet(
            require('res/sprites/player/player.json'),
            require('file-loader!res/sprites/player/player.png'));

        // TODO: let forEach operate on addAni (need to grab key as AniType).
        _.forEach(this.anims, (aniSprite) => {
            this.parentContainer.addChild(aniSprite);
            aniSprite.visible = false;
        });
        this.setAni(AniType.idle);
        return this.anims;
    }

    private setupInputHandling(input: InputComponent): void {
        input.on('moveright', () => this.setAni(AniType.run_right));
        input.on('moveleft', () => this.setAni(AniType.run_left));
        input.on('moverightstop', () => this.setAni(AniType.slide_right));
        input.on('moveleftstop', () => this.setAni(AniType.slide_left));
    }
}
