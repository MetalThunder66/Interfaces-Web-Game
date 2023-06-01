//import { Personaje } from "./Personaje.js";

export class Runner {

    constructor() {
        //super();
        this.invisiviltyStatus = false; //variable para no recibir danio continuo

        //captura del personaje
        this.personaje = document.getElementById("personaje");
    }

    //runner puede tener un hidden cuando se esta en el menu, a la hora de instanciar el juego quitarselo asi se puede ver, de fondo del menu se ve el paralax normalmente

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

    isHurt(){ //maneja un coldown cuando se recibe danio
        if(!this.invisiviltyStatus){ 
            this.invisiviltyStatus = true;



        }
    }
}