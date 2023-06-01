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
        this.creationInterval = 2000; //medido en milisegundos

        //intervals
        this.idIntervalspawn = null;
        this.idIncreaseInterval = null;

        //flags
        this.isHurtFlag = false;

        //objetos de la partida actual
        this.inGameObjs = [];

        this.inputListener(); //pongo a escuchar los controles del juego
    }

    render() {
        this.idIntervalspawn = setInterval(this.spawnObjects, this.creationInterval);
        this.idIncreaseInterval = setInterval(this.increaseInterval(), 5000) //cada 5 segundos, aumenta el spawn de objects
    }

    update() {
        setInterval(this.inGameLoop.bind(this), 50); //no me reconocia la funcion checkCollision y daba error, encontre de solucion ponerle .bind(this)
    }

    inputListener(){
        //listener tecla salto
        document.addEventListener('keyup', (event) => {
            if (event.key === "ArrowUp"){
               this.runner.saltar(); 
            }
        });
    }

    inGameLoop() {
        this.checkCollision();
        //console.log(runner.status())
    }

    increaseInterval(){ //incrementa el intervalo de creacion de objetos restandolo en 10 milisegundos siempre y cuando haya instancia del juego
        if ((GameManager.instance) && (this.creationInterval > 500)){ //
            this.creationInterval -= 10; 
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

    checkCollision(){
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
            for (let i = 0; i < this.inGameObjs.length; i++) {
                let INGAME_OBJECT = this.inGameObjs[i];
                
                if (!INGAME_OBJECT.getIsActive()) {       //si el game object ya no esta mas en el DOM significa que se elimino, por lo que se le devuelve el object al pool
                    this.inGameObjs.splice(i, 1);
                    this.objectPool.devolverObjeto(INGAME_OBJECT);
                } else {
                    const CHARACTER_STATUS = this.character.status();
                    const INGAME_OBJECT_STATUS = INGAME_OBJECT.status();
    
                    if (this.characterHitObject(CHARACTER_STATUS, INGAME_OBJECT_STATUS) == true) {    //si el objeto colisiono con el character
                        INGAME_OBJECT.execute(this.character);    //ejecuta la accion sobre el character dependiendo del objeto
    
                        switch (INGAME_OBJECT.getType()) {    
                            case "BlastAttack":
                                if (!this.character.isTransformed()) {
                                    if (!this.isHurtFlag) {
                                        this.audioManager.hitSound.play();
    
                                        this.decreaseLives();
                                        this.decreaseScoreBy(Math.floor(Math.random() * 2) + 1); //decrementa puntos en una cantidad random
        
                                        this.isHurtFlag = true;
        
        
                                        setTimeout((e) => {
                                            this.isHurtFlag = false;
                                        }, 1400);
                                    }
                                }
                                break;
                            case "Frieza":
                                if (!this.character.isTransformed()) {
                                    if (!this.isHurtFlag) {
                                        this.audioManager.hitSound.play();
    
                                        this.decreaseLives();
                                        this.decreaseScoreBy(Math.floor(Math.random() * 2) + 1);
        
                                        this.isHurtFlag = true;
        
        
                                        setTimeout((e) => {
                                            this.isHurtFlag = false;
                                        }, 1400);
                                    }
                                }
                                break;
                            case "skeleton":
                                if (!this.character.isTransformed()) {
                                    if (!this.isHurtFlag) {
                                        this.audioManager.hitSound.play();
    
                                        this.decreaseLives();
                                        this.decreaseScoreBy(Math.floor(Math.random() * 2) + 1);
        
                                        this.isHurtFlag = true;
        
        
                                        setTimeout((e) => {
                                            this.isHurtFlag = false;
                                        }, 1400);
                                    }
                                }
                                break;
                            case "invisivility":
                                this.audioManager.transformSound.play();
                                this.increaseTransformationTime();
                                break;
                            case "puntaje":
                                this.audioManager.pickupSound.play();
                                this.increaseScore();
                                break;
                            case "VIDA":
                                this.audioManager.senzuSound.play();
                                this.increaseLives();
                                break;
                            case "Clock":
                                this.audioManager.pickupSound.play();
                                this.increaseTime();
                                break;
                        }
                    }
                }
            }    
    };

    // Otros métodos y propiedades del GameManager
}

