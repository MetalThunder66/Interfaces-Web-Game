import { ObjectPool } from "./ObjectPool.js";
import { Runner } from "./Runner.js";
import { Tablero } from "./UI/Tablero.js";
import { AudioManager } from "./AudioManager.js";

export class GameManager {
    constructor() {
        if (GameManager.instance) {
            return GameManager.instance;
        }

        GameManager.instance = this;

        //capturo al runner
        this.runner = new Runner();

        //tablero del jugador con puntaje, vidas, tiempo
        this.tablero = new Tablero();

        //pool de objetos disponibles en el juego
        this.objectPool = new ObjectPool();

        //creo objeto encargado de los sonidos
        this.audioManager = new AudioManager();

        //propiedades del juego
        this.score = 0;
        this.time = 40; //medido en segundos. Si se cambia aqui el valor, actualizarlo en tablero/updateTablero()
        this.creationInterval = 2000; //medido en milisegundos

        //intervals
        this.gameLoopInterval = null;
        this.idIntervalspawn = null;
        this.idIncreaseInterval = null;
        this.temporizadorInterval = null;

        //flags
        this.endGameFlag = false;

        //objetos en pantalla
        this.inGameObjs = [];

        //inicia la musica del juego
        this.audioManager.game_theme.play();

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

    getEndGameFlag() {
        return this.endGameFlag;
    }

    //METODOS PRINCIPALES DEL GAME MANAGER

    iniciarJuego() {
        this.render();
        this.update();
        this.inGameLoop();
    }

    render() {
        //muestro al runner
        this.runner.showRunner();

        //crea intervalo de creacion de enemigos
        this.idIntervalspawn = setInterval(this.spawnObjects, this.creationInterval);
        console.log('valor interval ' + this.creationInterval)

        //muestro tablero
        this.tablero.showTablero();

    }

    update() {
        //pongo a escuchar los controles del juego
        this.inputListener();

        this.objectPool.fillPool(); //lleno el pool

        //no me reconocia las funciones y daba error, encontre de solucion ponerle .bind(this)
        this.gameLoopInterval = setInterval(this.inGameLoop.bind(this), 30);

        //activo intervalo para el temporizador, resta en 1 a cada segundo y suma puntos (100) por cada segundo que pase
        this.temporizadorInterval = setInterval(this.timerAndScore.bind(this), 1000);

        //intervalo de spawn de objetos
        this.idIntervalIncrease = setInterval(this.increaseInterval, 10000); //cada 10 segundos, aumento el spawn de objects
    }

    inGameLoop() {
        if (!this.getEndGameFlag()) { //siempre y cuando el juego no haya terminado
            this.checkCollision(); //chequeo colisiones
            this.tablero.updateTablero(this.runner.getHealthPoints(), this.time, this.score); //actualiza la informacion del tablero
            this.checkEndgame(); //chequeo vida y tiempo restante del juego

        } else { //sino, muestro la pantalla de fin de juego y mato instancia del singleton
            this.tablero.hideTablero();
            this.showGameOverMenu();

            clearInterval(this.gameLoopInterval); //detengo el intervalo gameloop para que no quede en bucle infinito

            this.destroyInstance();
        }
    }

    destroyInstance() {  //metodo para destruir la instancia
        GameManager.instance = null;
    }


    //TECLAS DEL JUEGO LISTENER//

    inputListener() {
        //listener tecla salto
        document.addEventListener('keyup', (event) => {
            switch (event.code) {
                case "ArrowUp":
                    this.audioManager.jump.play();
                    this.runner.saltar();
                    break;
                /* case "Space":
                    //this.audioManager.attackSound.play();
                    this.runner.atacar();
                    break; */
            }
        });
    }


    //TEMPORIZADOR//

    increaseTime(value) {
        this.time += value;
    }

    decreaseTime() { //decrementa el timer en 1, se llama una vez cada segundo
        this.time--;
    }

    decreaseTimeBy(number) { //decrementa el timer por un valor, el if corrige que no se vaya a negativo
        if (this.time - number > 0) {
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


    //HEALTH POINTS//

    decreaseHp(value) {
        let actualHp = this.runner.getHealthPoints();

        if (actualHp - value > 0) { //para no ir a vida negativa
            this.runner.setHealthPoints(-value);
        } else {
            this.runner.setHealthPoints(-actualHp);
        }
    }

    increaseHp(value) {
        if (this.runner.getHealthPoints() > 0) {
            this.runner.setHealthPoints(value);
        }
    }


    //SCORE//

    decreaseScoreBy(number) {
        if (this.score - number > 0) {     //para no ir a score negativo
            this.score -= number;
        } else {
            this.score = 0;
        }
    }

    increaseScore(number) {
        this.score += number;
    }


    //OBJECTS SPAWN//

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
        if ((this.objectPool.getSize() > 0) && (this.inGameObjs.length < this.objectPool.getMaxSize())) { //mientras objectpool tenga elementos y no haya alcanzado el maximo permitido
            let objetFromPool = this.objectPool.adquirirObjeto();
            objetFromPool.spawn(); //lo muestro en el juego
            this.inGameObjs.push(objetFromPool);    //se añade al array de objectos in game el object actual
        };
    }


    //COLLISIONS//

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

                            INGAME_OBJECT.effect(this.runner);    //ejecuta la accion sobre el character

                            if (!this.runner.getShieldStatus()) { //si no tiene escudo activado
                                this.audioManager.damage.play();
                                
                                setTimeout(() => {
                                    this.audioManager.dmg_cooldown.play();
                                }, 500); 

                                this.runner.activateDamageCooldown(); //activa cooldown de danio

                                setTimeout(() => {
                                    this.runner.deactivateDamageCooldown();
                                    console.log('cooldown finalizado ')
                                }, 2500); //desactiva el cooldown de danio pasado este lapso de tiempo
                            }

                            switch (INGAME_OBJECT.getType()) { //y segun que tipo de enemigo haya hecho la colision, se ejecuta cierto efecto
                                case "skeleton":
                                    this.audioManager.explode.play();
                                    
                                    if (!this.runner.getShieldStatus()) {    //si no tiene escudo, se le resta puntos. Sino le suma
                                        this.decreaseHp(INGAME_OBJECT.getAttackValue());
                                        this.decreaseScoreBy(this.generateRandomNumber(50, 75));
                                        this.decreaseTimeBy(4);
                                    } else {
                                        this.increaseScore(this.generateRandomNumber(50, 75));
                                    }
                                    break;
                                case "meat-soldier":
                                    this.audioManager.meat_bite.play();
                                    
                                    if (!this.runner.getShieldStatus()) {    //si no tiene escudo, se le resta puntos. Sino le suma
                                        this.decreaseHp(INGAME_OBJECT.getAttackValue());
                                        this.decreaseScoreBy(this.generateRandomNumber(25, 50));
                                        this.decreaseTimeBy(2);
                                    } else {
                                        this.increaseScore(this.generateRandomNumber(25, 50));
                                    }
                                    break;
                            }

                        } else if ((INGAME_OBJECT.getId() == 'powerup') &&
                            (!this.runner.getPowerupCooldown())) { //si pasa por aca es un objeto tipo bonus

                            this.runner.activatePowerupCooldown();
                            INGAME_OBJECT.effect(this.runner); //ejecuta la accion sobre el character 

                            switch (INGAME_OBJECT.getType()) {
                                case "shield":
                                    this.audioManager.shield_powerup.play();

                                    if (!this.runner.getShieldStatus()) { //si no tengo escudo aun, sino si ya tengo va al else
                                        this.giveRunnerShield();
                                        this.tablero.showShield();
                                    } else {
                                        this.tablero.updateShieldStatus();
                                    }

                                    break;
                                case "hp":
                                    this.audioManager.hp_powerup.play();
                                    this.increaseHp(INGAME_OBJECT.getBonus());
                                    break;
                                case "clock":
                                    this.audioManager.time_powerup.play();
                                    this.increaseTime(INGAME_OBJECT.getBonus());
                                    break;
                            }

                            setTimeout((e) => {
                                this.runner.deactivatePowerupCooldown();
                            }, 2000);
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
        this.runner.activateShield(this.audioManager.shield_over);
    }

    checkEndgame() {
        if (this.time == 0 || this.runner.getHealthPoints() <= 0) {    //si termino el tiempo o el personaje se queda sin vida, finaliza el juego
            this.audioManager.game_theme.pause(); //pauso musica del juego 
            this.audioManager.game_over.play(); //reproduzco sonido de fin de juego

            this.runner.deathAnimation();

            this.endGameFlag = true;
            this.objectPool.cleanPool(); //borro pool de elementos para que dejen de spawnear

            this.removeInScreenObjects(); //borro game objects que hay en pantalla 
        }
    }

    removeInScreenObjects(){
        this.inGameObjs.forEach(element => {
            element.removeElementFromDom();
            
        });
    }

    showGameOverMenu() {
        const gameOverMenu = document.getElementById('end-game'); //capturo menu de game over
        const playerScore = document.querySelector('.score-game-over');

        gameOverMenu.classList.add('show'); //muestro el menu de fin de juego
        playerScore.innerHTML = this.score; //muestro el puntaje obtenido

        gameOverMenu.style.zIndex = '6'; //cambio el z index para que no quede detras del menu principal
    }
}

