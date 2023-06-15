"use strict"

import { GameManager } from './classes/GameManager.js';
import { Menu } from './classes/UI/Menu.js';

//captura pantalla inicial
let pantallaInicial = document.querySelector('.pantalla-inicial');

pantallaInicial.addEventListener('click', () =>{
    pantallaInicial.classList.add('invisible'); //le agrego esta clase para que desaparezca el elemento. es para interaccionar 
                                                //forzadamente con el documento y que no haya problemas con los sonidos
    gameMenu.playMenuTheme();
    
});

//capturo ambos botones de jugar, del main menu y game over
let jugarBtn = document.getElementById('jugar-button');
let juegoNuevoBtn = document.getElementById('juego-nuevo-btn');

//muestro el menu principal
let gameMenu = new Menu();

jugarBtn.addEventListener('click', empezarJuego);
juegoNuevoBtn.addEventListener('click', empezarJuego);

jugarBtn.addEventListener('mouseover', () => {
    gameMenu.hoverButtonSound();
});

juegoNuevoBtn.addEventListener('mouseover', () => {
    gameMenu.hoverButtonSound();
});

function empezarJuego(){
    gameMenu.stopMenuTheme();
    
    //creo instancia unica de juego
    let gameManager = new GameManager();

    //oculto el menu principal
    gameMenu.hideMenus();

    //inicio el juego en mi game manager
    gameManager.iniciarJuego();
}


