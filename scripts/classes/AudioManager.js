export class AudioManager {
    constructor() {
        //musica
        this.menu_theme = this.createAudio("../sounds/title-screen.mp3", 0.7);
        this.game_theme = this.createAudio("../sounds/game-theme.mp3", 0.8);
        this.game_over = this.createAudio("../sounds/game-over.mp3", 1);

        //sonidos fx
        this.damage = this.createAudio("../sounds/damage.wav", 1);
        this.explode = this.createAudio("../sounds/explode.wav", 1);
        this.jump = this.createAudio("../sounds/jump.wav", 1);
        
        //sonidos de powerups
        this.shield_powerup = this.createAudio("../sounds/shield-powerup.wav", 1);
        this.time_powerup = this.createAudio("../sounds/time-powerup.wav", 1);
        this.hp_powerup = this.createAudio("../sounds/hp-powerup.wav", 1);

        //interaccion botones
        this.buttonSound = this.createAudio("../sounds/button-press.wav", 0.8);
        this.buttonHover = this.createAudio("../sounds/button-hover.wav", 0.8);
    }

    createAudio(source, volume) {
        const AUDIO = new Audio();
        AUDIO.src = source;
        AUDIO.volume = volume;

        return AUDIO;
    }
}