import { Personaje } from "./Personaje.js";

export class Runner extends Personaje {

    constructor() {
        super();
        this.defensa = 0;
        this.invisiviltyStatus = false; //variable para no recibir danio continuo

        //seteo configuraciones del personaje
        this.personaje = document.getElementById("personaje");
        this.personaje.style.position = 'absolute';
        this.personaje.style.width = '570px';
        this.personaje.style.height = '740px';
        this.personaje.style.zIndex = 1;
        this.personaje.style.bottom = '-110px';
        this.personaje.style.left = '-150px';
        this.personaje.style.transform = 'scale(.4)';
    }

    status() {
        return this.personaje.getBoundingClientRect(); //retorna la posicion actual del elemento en coordenadas y otros datos
    }

    getInvisiviltyStatus(){
        return this.invisiviltyStatus;
    }

    correr() {
        this.clean();
        this.personaje.classList.add("correr"); 
    }

    saltar() {
        if(this.personaje.classList.contains("correr")) {       
            this.clean(); 

            this.personaje.classList.add("saltar");

            this.personaje.addEventListener("animationend", () => {
                this.caer();
            });
        }
    }
    caer() {
        this.clean();
        this.personaje.classList.add("caer");

        this.personaje.addEventListener("animationend", () => {
            this.correr();
        }); 
    }

    clean() {
        this.personaje.classList.remove("correr"); 
        this.personaje.classList.remove("saltar");
        this.personaje.classList.remove("caer"); 
        this.personaje.removeEventListener("animationend", () => {}); 
    }
}