import { Skeleton } from "./enemigos/Skeleton.js";
import { MeatSoldier } from "./enemigos/MeatSoldier.js";

export class ObjectPool { //pool de objetos powerups y enemigos para economizar recursos
    constructor() {
        this.pool = [];
        this.maxSize = 10;
        this.fillPool(); //al ser creado el pool, se rellena con objetos
    };

    resetObject() {
        // Restablecer las propiedades del objeto a sus valores predeterminados
    };

    fillPool(){
        console.log('fill pool llamado')
        const OBJS_DISP = 2; //cantidad de enemigos y powerups en total, para usar con el randomizer

        //relleno el array con todos los objetos del juego disponibles, tanto enemigos como power ups. Objetos de referencia, no usa el objeto real
        //OBJS_DISP.push(new Skeleton());
        //OBJS_DISP.push(new MeatSoldier());
        
        for (let i = 0; i < this.maxSize; i++){ //relleno el pool de manera random usando el array de OBJS_DISP
            const OBJ_SELECTION = Math.floor(Math.random() * OBJS_DISP + 1); //genero un numero aleatorio. +1 para que no de 0.
            console.log(OBJ_SELECTION)
            
            switch (OBJ_SELECTION) {
                case 1:
                    this.mandarObjeto(new Skeleton());
                    break;
                case 2:
                    this.mandarObjeto(new MeatSoldier())
                    break;
                /* case "KienzanAttack":
                    this.returnObjectToPool(new KienzanAttack());
                    break;
                case "TransformPowerUp":
                    this.returnObjectToPool(new TransformPowerUp());
                    break;
                case "DragonBall":
                    this.returnObjectToPool(new DragonBall());
                    break;
                case "SenzuBean":
                    this.returnObjectToPool(new SenzuBean());
                    break;
                case "Clock":
                    this.returnObjectToPool(new Clock());
                    break; */
            }
            
            
        };
        console.log(this.pool)
        
    };

    // Función para tomar un objeto del pool
    adquirirObjeto() {
        if (this.pool.length > 0) { // Si hay objetos disponibles en el pool, tomo uno
            
            const POOL_INDEX = Math.floor(Math.random() * this.pool.length); //genero un indice aleatorio

            let elemento = this.pool[POOL_INDEX];

            this.pool.splice(POOL_INDEX, 1); //borro el elemento
            return elemento;
        }
        // Si no hay objetos, crea uno nuevo. Se usa para la primera vez
        return new ObjectPool();
        
    }

    // Función para devolver un objeto al pool
    mandarObjeto(objeto) {
        //objeto.resetObject(); // Restablecer las propiedades del objeto antes de devolverlo al pool
        if (this.pool.length < this.maxSize) {
            // Si el pool no ha alcanzado su tamaño máximo, devolver el objeto al pool
            this.pool.push(objeto);
        }
    }

    getMaxSize(){
        return this.maxSize;
    }
}