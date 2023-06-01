import { Skeleton } from "./enemigos/Skeleton.js";
import { ObjectPool } from "./ObjectPool.js";
import { GameObject } from "./GameObject.js";
import { Runner } from "./Runner.js";

export class GameManager {
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = this;

        // Inicializo aquí los atributos del GameManager

        //spawneo al jugador
        this.runner = new Runner();

        this.objectPool = new ObjectPool();

        //this.audioManager = new AudioManager();
        //this.parallax = new Parallax(); activar cuando se inicia el juego o dejar animando cuando se esta en el menu?

        //propiedades del juego
        this.score = 0;
        this.time = 30; //medido en segundos
        this.lives = 4;
        this.creationInterval = 1500; //medido en milisegundos

        //intervals
        this.idIntervalspawn = null;
        this.idIncreaseInterval = null;

        //flags
        this.isInvencible = false;

        //objetos en pantalla
        this.inGameObjs = [];

        this.inputListener(); //pongo a escuchar los controles del juego
    }

    render() {
        this.idIntervalspawn = setInterval(this.spawnObjects, this.creationInterval);
        //this.idIncreaseInterval = setInterval(this.increaseInterval(), 5000) //cada 5 segundos, aumenta el spawn de objects
    }

    update() {
        setInterval(this.inGameLoop.bind(this), 30); //no me reconocia la funcion checkCollision y daba error, encontre de solucion ponerle .bind(this)
    }

    inGameLoop() {
        this.checkCollision(); //chequeo colisiones
    }

    inputListener() {
        //listener tecla salto
        document.addEventListener('keyup', (event) => {
            if (event.key === "ArrowUp") {
                this.runner.saltar();
            }
        });
    }

    increaseInterval() { //incrementa el intervalo de creacion de objetos restandolo en 100 milisegundos siempre y cuando haya instancia del juego
        if ((GameManager.instance) && (this.creationInterval > 500)) { //
            console.log('valor interval ' + this.creationInterval)
            this.creationInterval -= 100;
        } else {
            clearInterval(this.idIncreaseInterval); //detengo el intervalo si creation interval es menor a 500, se usa como maximo
        }
    }

    spawnObjects = () => { //generacion de objetos en la partida, funcion flecha para que el contexto se mantenga dentro de spawnObjects()
        //let enemigo = new Skeleton();
        let objetFromPool = this.objectPool.adquirirObjeto(); //recojo algun objeto del pool object
        objetFromPool.spawn(); //lo muestro en el juego
        this.inGameObjs.push(objetFromPool);    //se añade al array de objectos in game el object actual
    }

    characterCollision(runnerStatus, gameObjectStatus) {
        if (!(runnerStatus.right < gameObjectStatus.left ||
            runnerStatus.left > gameObjectStatus.right ||
            runnerStatus.bottom < gameObjectStatus.top ||
            runnerStatus.top > gameObjectStatus.bottom)){
                return true   
        }

        return false;
    }

    /*if (!(runnerStatus.right < enemigo.left ||
                runnerStatus.left > enemigo.right ||
                runnerStatus.bottom < enemigo.top ||
                runnerStatus.top > enemigo.bottom)) {
                    console.log('colision detectada')
                }*/

    checkCollision() {
        //colisiones viejo
        /*
        enemigo = document.getElementById('enemigo').getBoundingClientRect();
        console.log(enemigo)
        if (!(runnerStatus.right < enemigo.left ||
            runnerStatus.left > enemigo.right ||
            runnerStatus.bottom < enemigo.top ||
            runnerStatus.top > enemigo.bottom)) {
                console.log('colision detectada')
            }

    */  //SI HAY objetos GENERADOS CHEQUEO COLISIONES, USAR UN FLAG
        if (this.inGameObjs.length > 0) {
            for (let i = 0; i < this.inGameObjs.length; i++) {
                const INGAME_OBJECT = this.inGameObjs[i];
                console.log('se devolvera' + this.inGameObjs[i].getDivNumber());
                if (!INGAME_OBJECT.getIsActive()) {       //si el object no esta activo, quiere decir que se termino su animacion y no se ve mas en la pantalla, por lo que se le devuelve al pool
                    this.inGameObjs.splice(i, 1);
                    this.objectPool.devolverObjeto(INGAME_OBJECT);
                    console.log('se devolvio' + INGAME_OBJECT.getDivNumber());


                } else {
                    const RUNNER_STATUS = this.runner.status();
                    console.log('character status ' + RUNNER_STATUS);
                    const INGAME_OBJECT_STATUS = INGAME_OBJECT.status();

                    if (this.characterCollision(RUNNER_STATUS, INGAME_OBJECT_STATUS) == true) {    //si el objeto colisiono con el character
                        INGAME_OBJECT.effect(this.runner);    //ejecuta la accion sobre el character dependiendo del objeto


                        switch (INGAME_OBJECT.getType()) {
                            case "skeleton":
                                if (!this.isInvencible) {
                                    //if (!this.isHurtFlag) {
                                        this.isInvencible = true;
                                        //this.audioManager.hitSound.play();

                                        this.decreaseLive();
                                        this.decreaseScoreBy(Math.floor(Math.random() * 2) + 1);

                                        

                                        setTimeout((e) => {
                                            this.isInvencible = false;
                                        }, 2000);
                                   // }
                                }
                                break;
                            case "invencivility":
                                //this.audioManager.powerUpSound.play();
                                //this.giveRunnerInvencivility();
                                break;
                            case "puntaje":
                                //this.audioManager.bonusSound.play();
                                this.increaseScore();
                                break;
                            case "vida":
                                //this.audioManager.healthSound.play();
                                this.increaseLives();
                                break;
                            case "clock":
                                //this.audioManager.bonusSound.play();
                                this.increaseTime();
                                break;
                        }
                    }
                }
            }
        } else console.log('aun no hay objetos')

    };

    //Otros métodos y propiedades del GameManager //---------

    giveRunnerInvencivility() {
        this.runner.activateInvencivility();
    }

    getLives() {
        return this.lives;
    }

    getScore() {
        return this.score;
    }

    getTime() {
        return this.time;
    }

    decreaseLive() {
        if (this.lives > 0) {
            this.lives -= 1;
        }
    }

    increaseLives() {
        if (this.lives > 0) {
            this.lives += 1;
        }
    }

    decreaseScoreBy(number) {
        if (this.score >= number) {     //para no ir a score negativo
            this.score -= number;
        } else {
            this.score = 0;
        }
    }

    increaseScore() {
        /*if (this.score < this.maxScore) {
            this.score += 1;
        }*/
        this.score += 25;
    }

    decreaseTime() {
        this.time -= 1;
    }

    increaseTime() {
        this.time += 5;
    }

    getWonFlag() {
        return this.wonFlag;
    }

    getLostFlag() {
        return this.lostFlag;
    }
}

