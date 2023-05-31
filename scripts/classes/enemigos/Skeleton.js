import { Enemigo } from "/scripts/classes/Enemigo.js";

export class Skeleton extends Enemigo {


    constructor() {
        super();
        this.enemigo.classList.add("skeleton");
        

        //seteo posicion y caracteristicas
        this.enemigo.style.bottom = '-218px';
        this.enemigo.style.width = '1045px';
        this.enemigo.style.height = '780px';
        this.enemigo.style.scale = '.16';  

        document.getElementById("contenedor").appendChild(this.enemigo);
    }

    status() {
        return this.enemigo.getBoundingClientRect(); 
    }
}