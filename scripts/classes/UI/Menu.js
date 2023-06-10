export class Menu {

    constructor() {
        this.mainMenu = document.getElementById('main-menu');
        this.comoJugar = document.querySelector('.como-jugar');
        this.controlsMenu = document.getElementById('controls-menu');
        this.controlsBtnDiv = document.getElementById('controls-button');
        this.controlsBtnDiv.addEventListener('click', this.showHideControls.bind(this));
    }

    showHideControls(){ //si aprieto en controles, oculto las instrucciones de como jugar y muestro los controles
        if (this.controlsBtnDiv.innerHTML == 'Controles'){
            this.comoJugar.classList.add('hide');
            this.controlsMenu.classList.remove('hide');
            this.controlsMenu.classList.add('show');
            this.controlsBtnDiv.innerHTML = 'Como Jugar';
        } else {
            this.comoJugar.classList.replace('hide', 'show');
            this.controlsMenu.classList.replace('show', 'hide');
            this.controlsBtnDiv.innerHTML = 'Controles'; 
        }  
    }

    hideMenu(){
        this.mainMenu.classList.add('hide');
    }
    

}