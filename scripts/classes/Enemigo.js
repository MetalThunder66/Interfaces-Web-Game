import { GameObject } from "./GameObject.js";

export class Enemigo extends GameObject {
    //clase abstracta
    constructor() {
        super();
        
        //this.enemigo = document.createElement("div");
        this.enemigo.id = ("enemigo");
    }

    /*
    status() {
        return this.enemigo.getBoundingClientRect(); 
    }*/
} //NO SIRVE MAS ESTA CLASE. 