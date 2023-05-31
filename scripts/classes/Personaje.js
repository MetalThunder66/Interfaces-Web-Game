export class Personaje {
    //clase abstracta
    
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
        this.vida = vida - 20;
    }

}