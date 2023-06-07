import { GameObject } from "../GameObject.js";

export class Clock extends GameObject {

    constructor() {
        super('clock', 'powerup');

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

    spawn(){
        super.spawn()
    }

    getBonus(){
        return this.value = this.randomValue(5, 10); //este metodo retornara cuanto tiempo se adicionara entre 5 y 10
    }
}