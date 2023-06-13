"use strict"

import { GameManager } from './classes/GameManager.js';
import { Menu } from './classes/UI/Menu.js';

//capturo ambos botones de jugar, del main menu y game over
const jugarBtn = document.getElementById('jugar-button');
const juegoNuevoBtn = document.getElementById('juego-nuevo-btn');

//muestro el menu principal
const gameMenu = new Menu(); 

//gameMenu.gameOverMenuIgnore(); 

jugarBtn.addEventListener('click', empezarJuego);
juegoNuevoBtn.addEventListener('click', empezarJuego);

function empezarJuego(){
    //creo instancia unica de juego
    const gameManager = new GameManager();

    //oculto el menu principal
    gameMenu.hideMenus();

    //inicio el juego en mi game manager
    gameManager.iniciarJuego();
}


