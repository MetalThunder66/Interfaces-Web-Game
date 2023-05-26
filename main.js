"use strict"

let runner = new Runner();

document.addEventListener('keydown', () => {
    runner.saltar();
});



/* cada 50 milisegundos verifica estado del juego */
setInterval(gameLoop, 50);



/* cada 1 segundo genera un enemigo */
setInterval(generarEnemigo, 1000);




/**
 * Chequear estado del runner y de los enemigos
 */
function gameLoop() {

    //console.log(runner.status())


}


function generarEnemigo() {
    let enemigo = new Enemigo();
}