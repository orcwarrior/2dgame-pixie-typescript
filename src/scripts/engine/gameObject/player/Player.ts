import {GameManager} from '../../GameManager';
import {GameObject} from '../GameObject';
import {PlayerAnimsComponent} from './PlayerAnimsComponent';
import {PlayerInputComponent} from './PlayerInputComponent';
import {ForceMoveableComponent} from '../components/ForceMoveableComponent';
import {Direction, Force} from '../../force/Force';
import {GenericVisualComponent} from '../components/GenericVisualComponent';
import {ActiveCollisionComponent} from '../components/ActiveCollisionComponent';
import {ForcesContainer} from '../../force/ForcesContainer';
import {Vector} from '../../utils/Vector';
import {GenericMoveableComponent} from '../components/GenericMoveableComponent';

export class Player extends GameObject {
    private static moveSpeed: number = 2.5;
    protected forcesContainer: ForcesContainer;

    constructor() {
        super();
        this.visualComponent = new GenericVisualComponent({x: 400, y: 500});
        let container = this.visualComponent.getContainer();
        this.collisionComponent = new ActiveCollisionComponent(this, container.getBounds.bind(container));
        this.forcesContainer = new ForcesContainer();
        this.moveableComponent = new GenericMoveableComponent(this, new Vector());
        this.inputComponent = new PlayerInputComponent(this);
        this.aniComponent = new PlayerAnimsComponent(this, container, this.inputComponent);

        this.setupForcesOnInput();
        GameManager.instance.addUpdateableObject(this);
    }

    public update(delta: number) {
        let finalVelocity = this.forcesContainer.update();
        if (<ActiveCollisionComponent>this.collisionComponent) {
            let collResult = (<ActiveCollisionComponent>this.collisionComponent).getCollisionResults();
            finalVelocity = collResult.filterVelocityVector(finalVelocity);
        }
        this.aniComponent.update(finalVelocity);
        this.moveableComponent.update(this.visualComponent.getContainer(), finalVelocity);
    }

    private setupForcesOnInput() {
        // TODO: Move to some component or create new Moveable for player
        // (Bad thing it would add another level of composition (and complexity))
        const input = this.inputComponent;
        const fc = this.forcesContainer;
        input.on('moveleft', () =>
            fc.applyForce('mLeft', new Force(Direction.LEFT, Player.moveSpeed, 250), true)
        );
        input.on('moveright', () =>
            fc.applyForce('mRight', new Force(Direction.RIGHT, Player.moveSpeed, 250), true)
        );
        input.on('moveleftstop', () => this.setSlideAni(fc, 'mLeft'));
        input.on('moverightstop', () => this.setSlideAni(fc, 'mRight'));
    }

    private setSlideAni(forceCont: ForcesContainer, forceId: string) {
        const curForceVel = forceCont.getForceVelocity(forceId);
        const maxVel = curForceVel.getAbsDominantValue();
        const slideDuration = 500 * (maxVel / Player.moveSpeed);
        forceCont.applyForce(forceId, new Force(curForceVel, 1, slideDuration, Force.decelerateLinear), true);
    }
}
