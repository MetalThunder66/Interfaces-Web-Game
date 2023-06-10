import { ObjectPool } from "./ObjectPool.js";
import { Runner } from "./Runner.js";
import { Tablero } from "./UI/Tablero.js";

export class GameManager {
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
        }
        GameManager.instance = this;

        // Inicializo aquí los atributos del GameManager

        //spawneo al jugador
        this.runner = new Runner();

        //tablero del jugador con puntaje, vidas, tiempo
        this.tablero = new Tablero();

        //pool de objetos disponibles en el juego
        this.objectPool = new ObjectPool();

        //this.audioManager = new AudioManager();
        //this.parallax = new Parallax(); activar cuando se inicia el juego o dejar animando cuando se esta en el menu?

        //propiedades del juego
        this.score = 0;
        this.time = 40; //medido en segundos
        this.creationInterval = 2000; //medido en milisegundos

        //intervals
        this.gameLoopInterval = null;
        this.idIntervalspawn = null;
        this.idIncreaseInterval = null;
        this.temporizadorInterval = null;

        //flags
        //this.damageCooldown = false;

        //objetos en pantalla
        this.inGameObjs = [];

        //por defecto inicia la musica
        //this.audioManager.music.play();

        //muestra al character
        //this.runner.classList.remove('hidden');

        //pongo a escuchar los controles del juego
        this.inputListener();
    }

    //GETERS
    getTime() {
        return this.time;
    }

    getHealthPoints() {
        return this.runner.getHealthPoints();
    }

    getScore() {
        return this.score;
    }

    getWonFlag() {
        return this.wonFlag;
    }

    getLostFlag() {
        return this.lostFlag;
    }

    //METODOS PRINCIPALES DEL GAME MANAGER
    render() {
        //crea intervalo de creacion de enemigos
        this.idIntervalspawn = setInterval(this.spawnObjects, this.creationInterval);

        console.log('valor interval ' + this.creationInterval)

        this.tablero.showTablero();
        this.runner.showRunner();
    }

    update() {
        //no me reconocia las funciones y daba error, encontre de solucion ponerle .bind(this)
        this.gameLoopInterval = setInterval(this.inGameLoop.bind(this), 30);

        //activo intervalo para el temporizador, resta en 1 a cada segundo y suma puntos (100) por cada segundo que pase
        this.temporizadorInterval = setInterval(this.timerAndScore.bind(this), 1000);

        //intervalo de spawn de objetos
        this.idIntervalIncrease = setInterval(this.increaseInterval, 10000); //cada 10 segundos, aumento el spawn de objects
    }

    inGameLoop() {
        this.checkCollision(); //chequeo colisiones
        this.tablero.updateTablero(this.runner.getHealthPoints(), this.time, this.score); //actualiza la informacion del tablero
    }

    static destroyInstance() {  //metodo para destruir la instancia
        GameManager.instance = null;
    }

    //TECLAS DEL JUEGO LISTENER
    inputListener() {
        //listener tecla salto
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case "ArrowUp":
                    //this.audioManager.jumpSound.play();
                    this.runner.saltar();
                    break;
                case "Space":
                    //this.audioManager.attackSound.play();
                    this.runner.atacar();
                    break;
            }
        });
    }

    //TEMPORIZADOR
    increaseTime(value) {
        this.time += value;
    }

    decreaseTime() { //decrementa el timer en 1, se llama una vez cada segundo
        this.time--;
    }

    decreaseTimeBy(number) { //decrementa el timer por un valor, el if corrige que no se vaya a negativo
        if(this.time - number > 0){
            this.time -= number;
        } else {
            this.time = 0;
        } 
    }

    timerAndScore() {
        //resta 1 segundo al tiempo restante
        this.decreaseTime();

        //ademas, sumo 100 puntos cada 1 segundo
        this.increaseScore(100);

        //verificar si el tiempo restante ha llegado a cero
        if ((this.getTime()) <= 0) {

            // El tiempo ha terminado, realizar alguna acción (por ejemplo, fin del juego)
            console.log("Tiempo terminado");

            clearInterval(this.temporizadorInterval); // Detener el temporizador
        }
    }


    //OBJECTS SPAWN
    increaseInterval = () => { //incrementa el intervalo de creacion de objetos restandolo en 200 milisegundos siempre y cuando haya instancia del juego
        if ((GameManager.instance) && (this.creationInterval > 1500)) {

            clearInterval(this.idIntervalspawn); //elimino intervalo con el valor anterior

            this.creationInterval -= 20;

            this.idIntervalspawn = setInterval(this.spawnObjects, this.creationInterval); //creo nuevo intervalo con nuevo valor y lo guardo en idIntervalspawn

            console.log('valor interval ' + this.creationInterval)
        } else {
            clearInterval(this.idIntervalIncrease); //detengo el intervalo si creation interval es menor a 2000, se usa como maximo
        }
    }

    spawnObjects = () => { //generacion de objetos en la partida, funcion flecha para que el contexto se mantenga dentro de spawnObjects()
        //recojo algun objeto del pool object
        if (this.inGameObjs.length != this.objectPool.getMaxSize()) { //mientras haya objetos del pool por spawnear
            let objetFromPool = this.objectPool.adquirirObjeto();
            objetFromPool.spawn(); //lo muestro en el juego
            this.inGameObjs.push(objetFromPool);    //se añade al array de objectos in game el object actual
        };
    }

    //COLLISIONS
    characterCollision(runnerStatus, gameObjectStatus) {
        //calculo los OFFSETS. Se le suma o resta segun corresponda cuanto se quiere ignorar para que las colisiones sean mas precisas
        const CHARACTER_LEFT = runnerStatus.left + 75;
        const CHARACTER_RIGHT = runnerStatus.right - 75;
        const CHARACTER_TOP = runnerStatus.top + 60;
        const CHARACTER_BOTTOM = runnerStatus.bottom - 60;


        if (!(CHARACTER_RIGHT < gameObjectStatus.left ||
            CHARACTER_LEFT > gameObjectStatus.right ||
            CHARACTER_BOTTOM < gameObjectStatus.top ||
            CHARACTER_TOP > gameObjectStatus.bottom)) {
            return true

        } else {
            return false;
        }
    }

    checkCollision() {
        //si existen objetos creados, chequeo colisiones
        if (this.inGameObjs.length > 0) {
            for (let i = 0; i < this.inGameObjs.length; i++) { //consulto por cada elemento ingame
                const INGAME_OBJECT = this.inGameObjs[i];

                if (!INGAME_OBJECT.getIsActive()) {       //si el object no esta activo, quiere decir que se termino su animacion y no se ve mas en la pantalla, por lo que se le devuelve al pool
                    this.inGameObjs.splice(i, 1);
                    this.objectPool.mandarObjeto(INGAME_OBJECT);
                } else {
                    const RUNNER_STATUS = this.runner.status();
                    const INGAME_OBJECT_STATUS = INGAME_OBJECT.status(); //variable tipo gameObject, status posee getBoundingClientRect()

                    if ((this.characterCollision(RUNNER_STATUS, INGAME_OBJECT_STATUS))) {    //si el objeto colisiono con el character

                        if ((INGAME_OBJECT.getId() == 'enemigo') &&
                            (!this.runner.getDamageCooldownFlag()) /* &&
                            (this.runner.getState() == "corriendo") */) { //si el objeto con el que interacciono es enemigo, ejecuto el siguiente bloque 

                            INGAME_OBJECT.effect(this.runner);    //ejecuta la accion sobre el character cuando es un enemigo
                            
                            if (!this.runner.getShieldStatus()){
                                this.runner.activateDamageCooldown();

                                setTimeout((e) => {
                                    this.runner.deactivateDamageCooldown();
                                    console.log('cooldown finalizado ')
                                }, 2500);
                            }
                            
                            switch (INGAME_OBJECT.getType()) {
                                case "skeleton":
                                    //this.audioManager.explosionSound.play();

                                    if (!this.runner.getShieldStatus()){    //si no tiene escudo, se le resta puntos. Sino le suma
                                        this.decreaseHp(INGAME_OBJECT.getAttackValue());
                                        this.decreaseScoreBy(this.generateRandomNumber(50, 75));
                                        this.decreaseTimeBy(4);
                                    } else {
                                        this.increaseScore(this.generateRandomNumber(50, 75));
                                    }
                                    break;
                                case "meat-soldier":
                                    //this.audioManager.hitSound.play();
                                    
                                    if (!this.runner.getShieldStatus()){    //si no tiene escudo, se le resta puntos. Sino le suma
                                        this.decreaseHp(INGAME_OBJECT.getAttackValue());
                                        this.decreaseScoreBy(this.generateRandomNumber(25, 50));
                                        this.decreaseTimeBy(2);
                                    } else {
                                        this.increaseScore(this.generateRandomNumber(25, 50));
                                    }
                                    break;
                            }

                            

                        } else if ((INGAME_OBJECT.getId() == 'powerup') &&
                            (!this.runner.getPowerupCooldown())  /*&&
                            (this.runner.getState() == "saltando") */) { //si pasa por aca es un objeto tipo bonus
                            
                            this.runner.activatePowerupCooldown();
                            INGAME_OBJECT.effect(this.runner); //ejecuta la accion sobre el character 

                            switch (INGAME_OBJECT.getType()) {
                                case "shield":
                                    //this.audioManager.powerUpSound.play();

                                    if (!this.runner.getShieldStatus()) { //si no tengo escudo aun, si ya tengo va al else
                                        this.giveRunnerShield();
                                        this.tablero.showShield();
                                    } else {
                                        this.tablero.updateShieldStatus();
                                    }

                                    break;
                                case "puntaje":
                                    //this.audioManager.bonusSound.play();
                                    this.increaseScore(25);
                                    break;
                                case "hp":
                                    //this.audioManager.healthSound.play();
                                    this.increaseHp(INGAME_OBJECT.getBonus());
                                    break;
                                case "clock":
                                    //this.audioManager.bonusSound.play();
                                    this.increaseTime(INGAME_OBJECT.getBonus());
                                    break;
                            }

                            setTimeout((e) => {
                                this.runner.deactivatePowerupCooldown();
                            }, 1000);
                        }
                    }
                }
            }
        }
    };

    //Otros métodos y propiedades del GameManager//

    generateRandomNumber(min, max) {
        return Math.floor(Math.floor(Math.random() * (max - min + 1)) + min); //genera un numero random entre mim y max inclusive
    }

    giveRunnerShield() {
        this.runner.activateShield();
    }

    decreaseHp(value) {
        if (this.runner.getHealthPoints() > 0) {
            this.runner.setHealthPoints(-value);
        }
    }

    increaseHp(value) {
        if (this.runner.getHealthPoints() > 0) {
            this.runner.setHealthPoints(value);
        }
    }

    decreaseScoreBy(number) {
        if (this.score >= number) {     //para no ir a score negativo
            this.score -= number;
        } else {
            this.score = 0;
        }
    }

    increaseScore(number) {
        this.score += number;
    }




}

