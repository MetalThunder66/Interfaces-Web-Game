export class GameObject {
    static cantidadObjetos = 0; //es un contador que lleva la cantidad de objetos creados, para saber luego q div borrar mas facil

    constructor(tipo) {
        this.type = tipo;
        //this.spawnPositions = [];      //puede aparecer en estas posiciones
        this.isActive = false;   //variable para saber si el objeto esta insertado en el DOM

        GameObject.cantidadObjetos++;
        console.log('cant objs ' + GameObject.cantidadObjetos)

        this.gameContainer = document.querySelector(".contenedor");

        this.gameElementDiv = document.createElement("div");    //crea un elemento div por cada gameObject pero todavia no lo inserta

        this.gameElementDiv.dataset.number = GameObject.cantidadObjetos; //el data set llevara el numero de div del objeto

        console.log(this.gameElementDiv)

    }

    status() {
        return this.gameElementDiv.getBoundingClientRect();
    }

    getType() { //para saber de que tipo es este objeto si enemigo o powerup
        return this.type;
    }

    getIsActive() {     //retorna si el objeto aun es visible en la pantalla o no
        return this.isActive;
    }

    getDivNumber(){
        return this.gameElementDiv.dataset.number;
    }

    spawn() {
        document.getElementById("contenedor").appendChild(this.gameElementDiv);
        this.isInDOM = true; //convierto en true ya que ya aparecio en pantalla
        //en items si quiero posicion random ponerlo aca, en su respectivo powerup

        let removeFromDOM = (e) =>{
            const DIV_A_BORRAR = this.gameElementDiv;

            //verifica por las dudas para prevenir errores
            if (DIV_A_BORRAR) {
                //elimina el div
                DIV_A_BORRAR.remove();
                this.isInDOM = false;
            }    
            
            this.gameElementDiv.removeEventListener("animationend", removeFromDOM); //lo elimina del DOM y cierra el listener
        }

        this.gameElementDiv.addEventListener("animationend", removeFromDOM); //elimino el objeto del dom cuando ya no es mas visible al terminar la animacion
    }

    

    effect(personaje) {
        return; //Abstracto// Realiza una accion sobre el jugador dependiendo del objeto, sea enemigo o powerup
    }

    //añadir metodos para posiciones random de los powerups?
}