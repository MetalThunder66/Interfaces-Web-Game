export class Runner {

    constructor() {
        //super();
        this.state = "correr"; //si esta corriendo, saltando, cayendo o recibiendo danio

        this.invencivilityStatus = false; //variable para no recibir danio continuo y power up invencible

        //captura del personaje
        this.runner = document.getElementById("personaje");
    }

    //runner puede tener un hidden cuando se esta en el menu, a la hora de instanciar el juego quitarselo asi se puede ver, de fondo del menu se ve el paralax normalmente

    status() {
        return this.runner.getBoundingClientRect(); //retorna la posicion actual del elemento en coordenadas y otros datos
    }

    getInvisiviltyStatus(){
        return this.invencivilityStatus;
    }

    activateInvencivility(){
        this.invencivilityStatus = true;   
        
        setTimeout(() => {
            this.invencivilityStatus = false; 
            this.runner.classList.remove("invencivility");
        }, 8000); //le quito la invisivilidad luego de este tiempo
    }

    getState(){
        return this.state;
    }

    damaged(){
        if (!this.getInvisiviltyStatus()){ //si invisivility es falso
            //this.invencivilityStatus = true;
            if (this.state == "correr") {     
                this.runner.classList.replace("correr", "atacado"); //le aniado un efecto de parpadeo ya que no recibira danio por los proximos segundos

        
                

                //this.personaje.classList.add('danio');

                const vuelveACorrer = (e) => {
                    this.runner.classList.replace("atacado", "correr");     //regresa a correr
                    //this.runner.classList.add("parpadeo"); 


                    this.runner.removeEventListener("animationend", vuelveACorrer);    //se le remueve el evento porque ya termino la animacion
                }
        
                this.runner.addEventListener("animationend", vuelveACorrer);   //cuando termina la animacion de danio vuelve a correr
            }

            /*
            setTimeout(() => {
                this.invencivilityStatus = false; //le quito la invisivilidad luego de este tiempo
            }, 3000);*/

        }    
    }

    

    correr() {
        this.clean();
        this.runner.classList.add("correr"); 
    }

    saltar() {
        if(this.runner.classList.contains("correr")) {       
            this.clean(); 

            this.runner.classList.add("saltar");

            this.runner.addEventListener("animationend", () => {
                this.caer();
            });
        }
    }
    caer() {
        this.clean();
        this.runner.classList.add("caer");

        this.runner.addEventListener("animationend", () => {
            this.correr();
        }); 
    }

    clean() {
        this.runner.classList.remove("correr"); 
        this.runner.classList.remove("saltar");
        this.runner.classList.remove("caer"); 
        this.runner.removeEventListener("animationend", () => {}); 
    } 
}