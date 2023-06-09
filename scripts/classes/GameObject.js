export class GameObject {
    //static cantidadObjetos = 0; //es un contador que lleva la cantidad de objetos creados, para saber luego q div borrar mas facil

    constructor(tipo, idObjeto) {
        this.type = tipo;
        //this.spawnPositions = [];      //puede aparecer en estas posiciones
        this.isActive = false;   //variable para saber si el objeto esta insertado en el DOM

        //this.spawnPositions = [35, 44];  //puede aparecer dentro de estas posiciones de top. solo para powerups

        //GameObject.cantidadObjetos++;
        //console.log('cant objs ' + GameObject.cantidadObjetos)

        this.gameContainer = document.querySelector(".contenedor");

        this.gameElementDiv = document.createElement("div");    //crea un elemento div por cada gameObject pero todavia no lo inserta

        this.gameElementDiv.id = idObjeto; //id segun el tipo de objeto que sea

        this.gameElementDiv.classList.add(tipo); //clase segun el tipo de objeto que sea
        //this.gameElementDiv.dataset.number = GameObject.cantidadObjetos; //el data set llevara el numero de div del objeto
    }

    status() {
        return this.gameElementDiv.getBoundingClientRect();
    }

    getType() { //para saber de que tipo es este objeto si enemigo o powerup
        return this.type;
    }

    getId() { //para saber de que tipo es este objeto si enemigo o powerup
        return this.gameElementDiv.id;
    }

    getIsActive() {     //retorna si el objeto se encuentra en el DOM o no
        return this.isActive;
    }

    /*
    getDivNumber(){
        return this.gameElementDiv.dataset.number;
    }*/

    setRandomTop(){
        this.gameElementDiv.style.top = this.randomValue(36, 48) + 'vh'; //le seteo valores random de top antes de spawnear
    }

    spawn() {
        //posicion random de top para powerups
        if (this.gameElementDiv.id == 'powerup'){
            this.setRandomTop();
        }
        
        document.getElementById("contenedor").appendChild(this.gameElementDiv);
        this.isActive = true; //convierto en true ya que ya aparecio en pantalla
        
        let removeFromDOM = (e) =>{
            const DIV_A_BORRAR = this.gameElementDiv;

            //verifica por las dudas para prevenir errores
            if (DIV_A_BORRAR) {
                //elimina el div
                this.gameElementDiv.remove();
                this.isActive = false;
            }    
            
            this.gameElementDiv.removeEventListener("animationend", removeFromDOM); //lo elimina del DOM y cierra el listener
        }

        this.gameElementDiv.addEventListener("animationend", removeFromDOM); //elimino el objeto del dom cuando ya no es mas visible al terminar la animacion
    }

    

    effect(runner) {
        return; //Abstracto// Realiza una accion sobre el jugador dependiendo del objeto, sea enemigo o powerup
    }

    //añadir metodos para posiciones random de los powerups?

    randomValue(min, max) {
        return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min); //genera un valor random entre mim y max inclusive, para usarse en los powerups
    }

    
}