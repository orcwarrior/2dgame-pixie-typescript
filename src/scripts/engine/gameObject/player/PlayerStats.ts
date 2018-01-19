
import {GameManager, GameState} from '../../GameManager';

export class PlayerStats {
    private static speed: number = 3.5;
    private static minSpeed: number = 1.8;
    private static maxSpeed: number = 5.5;
    private _score: number;
    private _speed: number;
    private _lives: number;

    get speed(): number {return this._speed; }
    get score(): number {return this._score; }
    get lives(): number {return this._lives; }

    constructor (lives: number = 10, speed: number = PlayerStats.speed) {
        this._lives = lives;
        this._speed = speed;
        this._score = 0;

        // Increase score by 1 every second:
        setInterval(
            () => GameManager.instance.getState() === GameState.PLAY && this._score++,
            1000);
    }
    public increaseScore(): void {
        this._score += 10;
    }
    public increaseSpeed(): void {
        this._speed += 0.15;
        this._speed = Math.min(this._speed, PlayerStats.maxSpeed);
    }
    public decreaseSpeed(): void {
        this._speed = Math.max(this._speed * 4 / 5, PlayerStats.minSpeed);
    }
    public decreaseLives(): void {
        this._lives--;
        // TODO: This is dirty:
        if (this._lives === 0) { GameManager.instance.gameOver(); }
    }
}
