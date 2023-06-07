import { GameObject } from "../GameObject.js";

export class HealthPoints extends GameObject {

    constructor() {
        super('hp', 'powerup');

        this.value = 0;
    }
    
    effect(runner) {
        this.gameElementDiv.classList.add('brillitos');

        this.gameElementDiv.addEventListener("animationend", () => {
            this.gameElementDiv.classList.remove("brillitos");

            this.isActive = false;
            this.gameElementDiv.remove(); //lo borra del dom cuando termina la animacion

            this.gameElementDiv.removeEventListener("animationend", () => {}); //libero el evento
        }); 
    }

    getBonus(){
        return this.value = this.randomValue(10, 20); //este metodo retornara cuanta vida ganara el jugador entre 10 y 20
    }
}