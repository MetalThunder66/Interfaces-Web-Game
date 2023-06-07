import { GameObject } from "../GameObject.js";

export class Invencivility extends GameObject {

    constructor() {
        super('invencivility', 'powerup');
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

}