import { Personaje } from "./Personaje.js";

export class Enemigo extends Personaje {
    //clase abstracta
    constructor() {
        super();
        
        this.enemigo = document.createElement("div");
        this.enemigo.id = ("enemigo");
        this.enemigo.style.position = 'absolute';
    
        //this.enemigo.classList.add("skeleton");
        //document.getElementById("contenedor").appendChild(this.enemigo);

    }

    status() {
        return this.personaje.getBoundingClientRect(); 
    }
}