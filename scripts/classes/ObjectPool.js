import { Skeleton } from "./enemigos/Skeleton.js";

export class ObjectPool { //pool de objetos powerups y enemigos para economizar recursos
    constructor() {
        this.pool = [];
        this.maxSize = 20;
        this.fillPool(); //al ser creado el pool, se rellena con objetos
    };

    resetObject() {
        // Restablecer las propiedades del objeto a sus valores predeterminados
    };

    fillPool(){
        const OBJS_DISP = [];

        //relleno el array con todos los objetos del juego disponibles, tanto enemigos como power ups
        OBJS_DISP.push(new Skeleton());
        
        for (let i = 0; i < this.maxSize; i++){ //relleno el pool
            this.pool.push(new Skeleton()); //prueba para ver si anda el pool. USAR RANDOMIZER CUANDO TENGA MAS OBJECTS
        };
        
    };

    // Función para tomar un objeto del pool
    adquirirObjeto() {
        if (this.pool.length > 0) { // Si hay objetos disponibles en el pool, tomo uno
            
            const INDICE_ALEATORIO = Math.floor(Math.random() * this.pool.length); //genero un indice aleatorio
            console.log(INDICE_ALEATORIO)
            let elemento = this.pool[INDICE_ALEATORIO];

            this.pool.splice(INDICE_ALEATORIO, 1); //borro el elemento
            return elemento;
        }
        // Si no hay objetos, crea uno nuevo. Se usa para la primera vez
        return new ObjectPool();
        
    }

    // Función para devolver un objeto al pool
    devolverObjeto(objeto) {
        //objeto.resetObject(); // Restablecer las propiedades del objeto antes de devolverlo al pool
        if (this.pool.length < this.maxSize) {
            // Si el pool no ha alcanzado su tamaño máximo, devolver el objeto al pool
            this.pool.push(objeto);
        }
    }
}