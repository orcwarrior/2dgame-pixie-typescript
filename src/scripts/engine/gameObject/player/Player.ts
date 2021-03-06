import {GameManager} from '../../GameManager';
import {GameObject} from '../GameObject';
import {PlayerAnimsComponent} from './PlayerAnimsComponent';
import {PlayerInputComponent} from './PlayerInputComponent';
import {Direction, Force} from '../../force/Force';
import {GenericVisualComponent} from '../components/GenericVisualComponent';
import {ActiveCollisionComponent} from '../components/ActiveCollisionComponent';
import {ForcesContainer} from '../../force/ForcesContainer';
import {Vector} from '../../utils/Vector';
import {GenericMoveableComponent} from '../components/GenericMoveableComponent';
import {PlayerStats} from './PlayerStats';

export class Player extends GameObject {
    private static majesticGravity: Force = new Force(Direction.DOWN, 1.5, 500, Force.easeLinear);

    protected forcesContainer: ForcesContainer;
    protected animsContainer: PIXI.Container;
    protected _stats: PlayerStats;
    public get stats(): PlayerStats { return this._stats; }

    public static isPlayer = function (obj: any) {
        return obj.constructor && obj.constructor.name === 'Player';
    };

    constructor(playerPos: Vector = new Vector(500, 400)) {
        super();
        let container = this.animsContainer = new PIXI.Container();
        this.visualComponent = new GenericVisualComponent(container, playerPos);
        this.collisionComponent = new ActiveCollisionComponent(this, container.getBounds.bind(container));
        this.forcesContainer = new ForcesContainer();
        this.forcesContainer.applyForce('gravity', Player.majesticGravity );
        this.moveableComponent = new GenericMoveableComponent(this, new Vector());
        this.inputComponent = new PlayerInputComponent(this);
        this.aniComponent = new PlayerAnimsComponent(this, container, this.inputComponent);
        this._stats = new PlayerStats();

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
        this.moveableComponent.update(this.animsContainer, finalVelocity);
    }

    public getVisuals() { return this.animsContainer; }

    private setupForcesOnInput() {
        // TODO: Move to some component or create new Moveable for player
        // (Bad thing it would add another level of composition (and complexity))
        const input = this.inputComponent;
        const fc = this.forcesContainer;
        input.on('moveleft', () =>
            fc.applyForce('mLeft', new Force(Direction.LEFT, this.stats.speed, 350), true)
        );
        input.on('moveright', () =>
            fc.applyForce('mRight', new Force(Direction.RIGHT, this.stats.speed, 350), true)
        );
        input.on('moveleftstop', () => this.setSlideAni(fc, 'mLeft'));
        input.on('moverightstop', () => this.setSlideAni(fc, 'mRight'));
    }

    private setSlideAni(forceCont: ForcesContainer, forceId: string) {
        const curForceProgress = forceCont.getForceProgress(forceId);
        const speed = forceCont.getForceVelocity(forceId).signVector().scalarMul(curForceProgress * this.stats.speed);
        const slideDuration = 500 * curForceProgress;
        forceCont.applyForce(forceId, new Force(speed, 1, slideDuration, Force.decelerateLinear), true);
    }

}
