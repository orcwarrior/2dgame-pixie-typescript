import {AnimsComponent, AniType} from '../components/abstract/AnimsComponent';
import {GameObject} from '../GameObject';
import generateAnimsMapFromSpritesheet from '../../utils/generateAnimsMapFromSpritesheet';
import {InputComponent} from '../components/abstract/InputComponent';
import * as _ from 'lodash';
import {Vector} from '../../utils/Vector';

export class PlayerAnimsComponent extends AnimsComponent {
    private aniSetupReady: boolean;

    constructor(parentObject: GameObject, parentContainer: PIXI.Container, inputComponent: InputComponent) {
        super(parentObject, parentContainer);

        this.setupPlayerAnims();
        this.setupInputHandling(inputComponent);
    }

    public async update(velocity: Vector): Promise<any> {
        if (velocity.x === 0 && this.aniSetupReady) {
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
        input.on('moveright', () => this.setAni(AniType.run_right, 100));
        input.on('moveleft', () => this.setAni(AniType.run_left, 100));
        input.on('moverightstop', () => this.setAni(AniType.slide_right));
        input.on('moveleftstop', () => this.setAni(AniType.slide_left));
    }
}
