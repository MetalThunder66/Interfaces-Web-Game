export class Runner {

    constructor() {
        //captura del personaje
        this.runner = document.getElementById("personaje");

        this.state = "corriendo"; //si esta corriendo, saltando, cayendo o recibiendo danio
        this.healthPoints = 100;

        //flags del runner
        this.shieldStatus = false; //power up invencible
        this.damageCoolDownFlag = false;  //variable para no recibir danio continuo
        this.puCoolDownFlag = false; //para cuando toca el powerup agarrarlo una vez

    }

    //runner puede tener un hidden cuando se esta en el menu, a la hora de instanciar el juego quitarselo asi se puede ver, de fondo del menu se ve el paralax normalmente

    status() {
        return this.runner.getBoundingClientRect(); //retorna la posicion actual del elemento en coordenadas y otros datos
    }

    getState(){
        return this.state;
    }

    getShieldStatus(){
        return this.shieldStatus;
    }

    getDamageCooldownFlag(){
        return this.damageCoolDownFlag;
    }

    getPowerupCooldown(){
        return this.puCoolDownFlag;
    }

    getHealthPoints(){
        return this.healthPoints;
    }

    setHealthPoints(value){
        if(this.healthPoints + value < 100){
            this.healthPoints += value;
        } else {
            this.healthPoints = 100;   
        }
        
    }

    activateDamageCooldown(){
        this.damageCoolDownFlag = true;
        this.runner.classList.add('correr-damage-cooldown');
    }

    deactivateDamageCooldown(){
        this.damageCoolDownFlag = false;
        this.runner.classList.remove('correr-damage-cooldown');
    }

    activatePowerupCooldown(){
        this.puCoolDownFlag = true; 
    }

    deactivatePowerupCooldown(){
        this.puCoolDownFlag = false; 
    }

    activateShield(){
        this.shieldStatus = true;  
        //this.runner.classList.add("shield"); 
        
        setTimeout(() => {
            this.shieldStatus = false; 
            this.runner.classList.remove("shield");
        }, 8000); //le quito el escudo luego de este tiempo
    }

    damaged(){
        if ((!this.getShieldStatus()) && (!this.getDamageCooldownFlag())){ //si el escudo es falso
            if (this.state == "corriendo") { 

                this.state = "atacado";  
                this.runner.classList.replace("correr", "atacado"); //le aniado un efecto de parpadeo ya que no recibira danio por los proximos segundos
            
                const vuelveACorrer = (e) => {
                    this.state = "corriendo"
                    this.runner.classList.replace("atacado", "correr");     //regresa a correr
                    this.runner.removeEventListener("animationend", vuelveACorrer);    //se le remueve el evento porque ya termino la animacion
                }
        
                this.runner.addEventListener("animationend", vuelveACorrer);   //cuando termina la animacion de danio vuelve a correr
            }
        }    
    }

    

    correr() {
        this.state == "corriendo";
        this.clean();
        this.runner.classList.add("correr"); 
    }

    saltar() {
        if(this.runner.classList.contains("correr")) { 
            
            this.state == "saltando";

            this.clean(); 

            this.runner.classList.add("saltar");

            this.runner.addEventListener("animationend", () => {
                this.caer();
            });
        }
    }
    caer() {
        this.state == "cayendo";
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

    atacar(){
        this.state == "atacando";
        this.runner.classList.add("atacar");

        this.runner.addEventListener("animationend", () => {
            this.runner.classList.remove("atacar");

            this.runner.removeEventListener("animationend", () => {}); 
        }); 
    }
}