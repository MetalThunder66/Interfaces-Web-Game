import { GameObject } from "../GameObject.js";

export class MeatSoldier extends GameObject {

    constructor() {
        super('meat-soldier', 'enemigo');
    }

    status() {
        return this.gameElementDiv.getBoundingClientRect(); 
    }
    
    effect(runner) {
        if (!runner.getInvisiviltyStatus()) {     //si no tiene invensivilidad, el runner recibe danio
            runner.damaged();     //el skeleton explota y lo borra del dom

                
            this.isActive = false;
           
            this.gameElementDiv.remove();
            
        } 
    }
}