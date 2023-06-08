import { GameObject } from "../GameObject.js";

export class Skeleton extends GameObject {

    constructor() {
        super('skeleton', 'enemigo');

        this.attackValue = 20;
    }

    getAttackValue(){
        return this.attackValue;
    }
    
    effect(runner) {
        if ((!runner.getShieldStatus()) && (!runner.getDamageCooldownFlag())) {     //si no tiene invensivilidad, el runner recibe danio
            runner.damaged();     //jugador recibe danio 
        } 

        this.gameElementDiv.classList.add('explosion');

        this.gameElementDiv.addEventListener("animationend", () => {
            this.gameElementDiv.classList.remove("explosion");

            this.isActive = false;
            this.gameElementDiv.remove(); //lo borra del dom cuando termina la animacion

            this.gameElementDiv.removeEventListener("animationend", () => {}); //libero el evento
        }); 
    }
}