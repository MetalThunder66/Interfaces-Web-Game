export class Personaje {
    //clase abstracta
    //PERSONAJE NO SIRVE MAS, ES AHORA GAMEOBJECT
    constructor() {
        this.vida = 100;
    }

    status() {
        return ;
    }

    getVida(){
        return this.vida;
    }

    decreaseVida(){
        this.vida = vida - 25;
    }

}