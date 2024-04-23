import { Howl } from 'howler';
import { SoundKey } from '../enums/sound-keys';

export class SoundPlayer {
    private static instance: SoundPlayer;
    private soundMap = new Map<string, Howl>();

    constructor () {
        const backgroundMusic = new Howl({
            src: ['/assets/sound/background-music.ogg'],
            html5: false,
            autoplay: false
          });
        backgroundMusic.loop(true);
        backgroundMusic.volume(0.1);
        this.soundMap.set(SoundKey.BackgroundMusic, backgroundMusic)

        const pegCollideSound1 = new Howl({
            src: ['/assets/sound/peg-collision-1.ogg'],
            html5: false,
            autoplay: false
          });
          pegCollideSound1.volume(1);
        this.soundMap.set(SoundKey.PegCollideSound1, pegCollideSound1)

        const pegCollideSound2 = new Howl({
            src: ['/assets/sound/peg-collision-2.ogg'],
            html5: false,
            autoplay: false
          });
          pegCollideSound2.volume(1);
        this.soundMap.set(SoundKey.PegCollideSound2, pegCollideSound2)

        const winningSlotSound = new Howl({
            src: ['/assets/sound/winning-slot.ogg'],
            html5: false,
            autoplay: false
          });
          winningSlotSound.volume(1);
        this.soundMap.set(SoundKey.WinningSlotSound, winningSlotSound)

        const losingSlotSound = new Howl({
            src: ['/assets/sound/losing-slot.ogg'],
            html5: false,
            autoplay: false
          });
          losingSlotSound.volume(1);
        this.soundMap.set(SoundKey.LosingSlotSound, losingSlotSound)
    }

    static getInstance(): SoundPlayer {
        if (!SoundPlayer.instance) {
            SoundPlayer.instance = new SoundPlayer();
        }

        return SoundPlayer.instance;
    }

    play(soundKey: string) {
        const sound = this.soundMap.get(soundKey);

        if (sound === undefined) {
            throw new Error("Missing sound. Cannot play.");
        }

        sound.play();
    }
}