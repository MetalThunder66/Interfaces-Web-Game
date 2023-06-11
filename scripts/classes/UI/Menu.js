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
        //this.volverMenuBtn.addEventListener('click', this.showHideControls.bind(this));
        //this.juegoNuevoBtn.addEventListener('click', this.showHideControls.bind(this));

    }

    showHideControls(){ //si aprieto en controles, oculto las instrucciones de como jugar y muestro los controles
        if (this.controlsBtn.innerHTML == 'Controles'){
            this.comoJugar.classList.add('hide');
            this.controlsMenu.classList.remove('hide');
            this.controlsMenu.classList.add('show');
            this.controlsBtn.innerHTML = 'Como Jugar';
        } else {
            this.comoJugar.classList.replace('hide', 'show');
            this.controlsMenu.classList.replace('show', 'hide');
            this.controlsBtn.innerHTML = 'Controles'; 
        }  
    }

    hideMenus(){
        this.mainMenu.classList.add('hide');
        this.gameOverMenu.classList.replace('show', 'hide');
        //this.gameOverMenu.classList.add ('hide');
    }

    showGameOverMenu(score){
        //remover pointer-events: none; de clase .end-game
        this.gameOverMenu.classList.add('show');
        this.playerScore.innerHTML = score;
    }
    

}