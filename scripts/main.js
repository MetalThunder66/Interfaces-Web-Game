"use strict"

import { GameManager } from './classes/GameManager.js';
import { Menu } from './classes/UI/Menu.js';
import { AudioManager } from "./classes/AudioManager.js";

let menuSounds = new AudioManager();

//captura pantalla inicial
let pantallaInicial = document.querySelector('.pantalla-inicial');

pantallaInicial.addEventListener('click', () =>{
    pantallaInicial.classList.add('invisible'); //le agrego esta clase para que desaparezca el elemento. es para interaccionar 
                                                //forzadamente con el documento y que no haya problemas con los sonidos
    menuSounds.menu_theme.play();
});

//capturo ambos botones de jugar, del main menu y game over
let jugarBtn = document.getElementById('jugar-button');
let juegoNuevoBtn = document.getElementById('juego-nuevo-btn');

//muestro el menu principal
let gameMenu = new Menu();


//gameMenu.gameOverMenuIgnore(); 

jugarBtn.addEventListener('click', empezarJuego);
juegoNuevoBtn.addEventListener('click', empezarJuego);

jugarBtn.addEventListener('mouseover', () => {
    menuSounds.buttonHover.play();
});

juegoNuevoBtn.addEventListener('mouseover', () => {
    menuSounds.buttonHover.play();
});

function empezarJuego(){
    menuSounds.menu_theme.pause();
    //creo instancia unica de juego
    let gameManager = new GameManager();

    //oculto el menu principal
    gameMenu.hideMenus();

    //inicio el juego en mi game manager
    gameManager.iniciarJuego();
}


