export class AudioManager {
    constructor() {
        //musica
        this.menu_theme = this.createAudio("../sounds/title-screen.mp3", 0.6);
        this.game_theme = this.createAudio("../sounds/game-theme.mp3", 0.6);
        this.game_over = this.createAudio("../sounds/game-over.mp3", 0.9);

        //sonidos fx
        this.damage = this.createAudio("../sounds/damage.wav", 0.8);
        this.explode = this.createAudio("../sounds/explode.wav", 0.8);
        this.jump = this.createAudio("../sounds/jump.wav", 0.8); 
        this.meat_bite = this.createAudio("../sounds/meat-bite.wav", 0.8); 
        this.dmg_cooldown = this.createAudio("../sounds/damage-cooldown.mp3", 0.8);
        
        //sonidos de powerups
        this.shield_powerup = this.createAudio("../sounds/shield-powerup.wav", 0.8);
        this.shield_over = this.createAudio("../sounds/shield-over.wav", 0.8);
        this.time_powerup = this.createAudio("../sounds/time-powerup.wav", 0.8);
        this.hp_powerup = this.createAudio("../sounds/hp-powerup.wav", 0.8);

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