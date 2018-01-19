// Simple wrapper so PIXI.sound is not used directly
import 'pixi-sound';

export class SoundManager {
    private sounds: PIXI.sound.Sound[];
    constructor() {
        this.sounds = [];
    }

    public play(soundPath: string, vol: number = 1, autoPlay: boolean = true, loop: boolean = false): PIXI.sound.Sound {
        /* tslint:disable */
        let sound = PIXI.sound.Sound.from({
            preload: true,
            url: soundPath,
            volume: vol,
            loop: loop,
            autoPlay: autoPlay
        });
        /* tslint:enable */
        this.sounds.push(sound);
        return sound;
    }
}
