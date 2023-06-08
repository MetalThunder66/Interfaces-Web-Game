import { GameObject } from "../GameObject.js";
import { Runner } from "../Runner.js";

export class MeatSoldier extends GameObject {

    constructor() {
        super('meat-soldier', 'enemigo');

        this.attackValue = 10;
    }

    getAttackValue(){
        return this.attackValue;
    }
    
    effect(runner) {
        if ((!runner.getShieldStatus()) && (!runner.getDamageCooldownFlag())) {     //si no tiene invensivilidad, el runner recibe danio
            runner.damaged();     //el jugador recibe danio
   
        } 
        this.isActive = false;
           
        this.gameElementDiv.remove();
    }
}