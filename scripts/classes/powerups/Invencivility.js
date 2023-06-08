import { GameObject } from "../GameObject.js";

export class Invencivility extends GameObject {

    constructor() {
        super('shield', 'powerup');
        //this.value = 8;
    }

    /* getValue(){
        return this.value;
    } */
    
    effect(runner) {
        this.gameElementDiv.classList.add('explosion');

        this.gameElementDiv.addEventListener("animationend", () => {
            this.gameElementDiv.classList.remove("explosion");

            this.isActive = false;
            this.gameElementDiv.remove(); //lo borra del dom cuando termina la animacion

            this.gameElementDiv.removeEventListener("animationend", () => {}); //libero el evento
        }); 
    }

}