export class Menu {

    constructor() {
        //captura de menu principal y secundario
        this.mainMenu = document.getElementById('main-menu');
        this.comoJugar = document.querySelector('.como-jugar');
        this.controlsMenu = document.getElementById('controls-menu');
        this.controlsBtn = document.getElementById('controls-button');

        //captura de pantalla fin de juego
        this.gameOverMenu = document.getElementById('end-game');
        this.volverMenuBtn = document.getElementById('volver-btn');
        this.juegoNuevoBtn = document.getElementById('juego-nuevo-btn');
        this.playerScore = document.querySelector('.score-game-over');
        
        //events listeners
        this.controlsBtn.addEventListener('click', this.showHideControls.bind(this));
        this.volverMenuBtn.addEventListener('click', this.backToMainMenu.bind(this));
    }

    showHideControls(){ //si aprieto en controles, oculto las instrucciones de como jugar y muestro los controles
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