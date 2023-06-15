import { AudioManager } from "../AudioManager.js";

export class Menu {

    constructor() {
        //variable para los sonidos y musica del menu
        this.menuSounds = new AudioManager();

        //captura de menu principal y secundario
        this.mainMenu = document.getElementById('main-menu');
        this.comoJugar = document.querySelector('.como-jugar');
        this.controlsMenu = document.getElementById('controls-menu');
        this.controlsBtn = document.getElementById('controls-button');

        //captura de pantalla fin de juego
        this.gameOverMenu = document.getElementById('end-game');
        this.volverMenuBtn = document.getElementById('volver-btn');
        this.juegoNuevoBtn = document.getElementById('juego-nuevo-btn');
        //this.playerScore = document.querySelector('.score-game-over');
        
        //events listeners
        this.controlsBtn.addEventListener('click', this.showHideControls.bind(this));
        
        this.controlsBtn.addEventListener('mouseover', () => {
            this.menuSounds.buttonHover.play(); //reproduce sonido cuando el mouse pasa sobre el boton
        });

        this.volverMenuBtn.addEventListener('click', this.backToMainMenu.bind(this));

        this.volverMenuBtn.addEventListener('mouseover', () => {
            this.menuSounds.buttonHover.play();
        });

    }

    showHideControls(){ //si aprieto en controles, oculto las instrucciones de como jugar y muestro los controles
        this.menuSounds.buttonSound.play(); //reproduzco el sonido al apretar un boton

        if (this.controlsBtn.innerHTML == 'Controles'){
            //oculto instrucciones
            this.comoJugar.classList.replace('show', 'hide');

            //muestro controles
            this.controlsMenu.classList.remove('hide');
            this.controlsMenu.classList.add('show'); 

            //cambio contenido del boton
            this.controlsBtn.innerHTML = 'Como Jugar';

        } else {
            //si ya estoy en los controles, los oculto
            this.controlsMenu.classList.replace('show', 'hide');
            
            //y muestro las instrucciones
            this.comoJugar.classList.remove('hide');
            this.comoJugar.classList.add('show');

            //cambio contenido del boton
            this.controlsBtn.innerHTML = 'Controles'; 
        }  
    }

    backToMainMenu(){
        //reproduzco sonido de boton y el theme del menu
        this.menuSounds.buttonSound.play();
        

        this.gameOverMenu.style.zIndex = '4';
        this.gameOverMenu.classList.replace('show', 'hide'); 
        this.mainMenu.classList.replace('hide', 'show');   
    }

    /* gameOverMenuIgnore(){
        this.gameOverMenu.style.pointerEvents = 'none';
    } */

    hideMenus(){
        //this.mainMenu.style.visibility = 'hidden';
        this.mainMenu.classList.add('hide');
        this.gameOverMenu.classList.remove('show');
        this.gameOverMenu.classList.remove('hide');
       
    }
    

}