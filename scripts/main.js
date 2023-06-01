"use strict"

import { GameManager } from './classes/GameManager.js';

const gameManager = new GameManager(); //creo instancia unica de juego

gameManager.render();
gameManager.update();