"use strict"

import { GameManager } from './classes/GameManager.js';
import { Menu } from './classes/UI/Menu.js';

//capturo ambos botones de jugar, del main menu y game over
const jugarBtn = document.getElementById('jugar-button');
const juegoNuevoBtn = document.getElementById('juego-nuevo-btn');

const gameManager = new GameManager(); //creo instancia unica de juego

//const menu = new Menu(); //muestro el menu

jugarBtn.addEventListener('click', empezarJuego);
juegoNuevoBtn.addEventListener('click', empezarJuego);


function empezarJuego(){
    //menu.hideMenus();
    gameManager.render();
    gameManager.update();
}

