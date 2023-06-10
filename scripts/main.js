"use strict"

import { GameManager } from './classes/GameManager.js';
import { Menu } from './classes/UI/Menu.js';

const jugarBtn = document.getElementById('jugar-button');

const gameManager = new GameManager(); //creo instancia unica de juego

const menu = new Menu(); //muestro el menu

jugarBtn.addEventListener('click', empezarJuego);

function empezarJuego(){
    menu.hideMenu();
    gameManager.render();
    gameManager.update();
}

