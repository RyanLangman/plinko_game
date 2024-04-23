import { Howl } from 'howler';

export class SoundPlayer {
    private static instance: SoundPlayer;
    private soundMap = new Map<string, Howl>();

    constructor () {
        const backgroundMusic = new Howl({
            src: ['/assets/sound/background-music.ogg'],
            html5: true
          });
        backgroundMusic.loop();
        backgroundMusic.volume(0.2);
        this.soundMap.set("backgroundMusic", backgroundMusic)

        const pegCollideSound = new Howl({
            src: ['/assets/sound/peg-collision.wav'],
            html5: true
          });
          pegCollideSound.volume(1);
        this.soundMap.set("pegCollideSound", pegCollideSound)

        const winningSlotSound = new Howl({
            src: ['/assets/sound/winning-slot.ogg'],
            html5: true
          });
          winningSlotSound.volume(1);
        this.soundMap.set("winningSlotSound", winningSlotSound)

        const losingSlotSound = new Howl({
            src: ['/assets/sound/losing-slot.ogg'],
            html5: true
          });
          losingSlotSound.volume(1);
        this.soundMap.set("losingSlotSound", losingSlotSound)
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