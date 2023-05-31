import { Skeleton } from "./enemigos/Skeleton.js";
import { Runner } from "./Runner.js";

export class GameManager {
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
        }

        GameManager.instance = this;

        // Inicializar aquí los atributos del GameManager
        this.score = 0;
        this.level = 1;
        this.inputListener();
    }

    render() {
        this.runner = new Runner();
        setInterval(this.generarEnemigo, 2500);
    }

    update() {
        setInterval(this.gameLoop.bind(this), 50);
    }

    generarEnemigo() {
        let enemigo = new Skeleton();
    }

    inputListener(){
        //listener tecla salto
        document.addEventListener('keyup', (event) => {
            if (event.key === "ArrowUp"){
               this.runner.saltar(); 
            }
        });
    }

    gameLoop() {
        this.checkCollision();
        //console.log(runner.status())
    }

    checkCollision(){
        let runnerStatus; 
        
        runnerStatus = this.runner.status();
    
        let enemigo;
        enemigo = document.getElementById('enemigo').getBoundingClientRect();
        console.log(enemigo)
        if (!(runnerStatus.right < enemigo.left ||
            runnerStatus.left > enemigo.right ||
            runnerStatus.bottom < enemigo.top ||
            runnerStatus.top > enemigo.bottom)) {
                console.log('colision detectada')
            }
    
    };
    // Otros métodos y propiedades del GameManager
}

// Uso del Singleton GameManager
//const gameManager = new GameManager(); // Se crea la instancia única

// Ahora puede acceder al GameManager desde cualquier parte del juego
//gameManager.update();
//gameManager.render();