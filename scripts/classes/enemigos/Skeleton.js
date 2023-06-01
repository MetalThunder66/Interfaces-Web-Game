import { GameObject } from "../GameObject.js";

export class Skeleton extends GameObject {


    constructor() {
        super('skeleton');

        this.gameElementDiv.id = "enemigo";

        this.gameElementDiv.classList.add("skeleton");
        
        //document.getElementById("contenedor").appendChild(this.enemigo);
    }

    status() {
        return this.enemigo.getBoundingClientRect(); 
    }
    
    effect(personaje) {
        return; 
    }
}