import {AnimsComponent, AniType} from '../../engine/gameObjectComponents/AnimsComponent';
import {GameObject} from '../GameObject';
import generateAnimsMapFromSpritesheet from '../../engine/utils/generateAnimsMapFromSpritesheet';
import {InputComponent} from '../../engine/gameObjectComponents/InputComponent';
import * as _ from 'lodash';
import {MoveableComponent} from '../../engine/gameObjectComponents/MoveableComponent';

export class PlayerAnimsComponent extends AnimsComponent {
    private aniSetupReady: boolean;

    constructor(parentObject: GameObject, parentContainer: PIXI.Container, inputComponent: InputComponent) {
        super(parentObject, parentContainer);

        this.setupPlayerAnims();
        this.setupInputHandling(inputComponent);
    }

    public async update(moveableComponent: MoveableComponent): Promise<any> {
        const curVelocityX = moveableComponent.getVelocityVector().x;
        if (curVelocityX === 0 && this.aniSetupReady) {
            this.setAni(AniType.idle);
        }
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
        this.aniSetupReady = true;
        this.setAni(AniType.idle);
        return this.anims;
    }

    private setupInputHandling(input: InputComponent): void {
        // DK: Force need to gain momentum too, so delaying setting of the ani
        // will fix issue where character could stay in idle ani.
        input.on('moveright', () => this.setAni(AniType.run_right, 50));
        input.on('moveleft', () => this.setAni(AniType.run_left, 50));
        input.on('moverightstop', () => this.setAni(AniType.slide_right));
        input.on('moveleftstop', () => this.setAni(AniType.slide_left));
    }
}
