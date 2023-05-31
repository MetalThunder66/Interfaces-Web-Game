// Definición de la clase de objetos a agrupar
class ObjetoPool {
    constructor() {
        console.log("Objeto creado");
    }

    reset() {
        // Restablecer las propiedades del objeto a sus valores predeterminados
    }

    // Otras funciones y lógica del objeto
}

// Implementación del Object Pool
class ObjectPool {
    constructor() {
        this.pool = [];
        this.maxSize = 5;
    }

    // Función para tomar un objeto del pool
    adquirirObjeto() {
        if (this.pool.length > 0) {
            // Si hay objetos disponibles en el pool, tomar uno
            return this.pool.pop();
        }
        // Si no hay objetos disponibles, crear uno nuevo
        return new ObjetoPool();
        
    }

    // Función para devolver un objeto al pool
    liberarObjeto(objeto) {
        objeto.reset(); // Restablecer las propiedades del objeto antes de devolverlo al pool
        if (this.pool.length < this.maxSize) {
            // Si el pool no ha alcanzado su tamaño máximo, devolver el objeto al pool
            this.pool.push(objeto);
        }
    }

    generarEnemigoAleatorio() {
        //Generar un enemigo con un índice aleatorio del pool
        const indiceAleatorio = Math.floor(Math.random() * this.pool.length);
        const enemigoAleatorio = this.pool[indiceAleatorio];

        return enemigoAleatorio;
      }
}