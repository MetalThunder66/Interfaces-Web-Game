export class Tablero {

    constructor() {
        this.tablero = document.getElementById("tablero");

        this.tablero.classList.remove('hidden');
    }

    hideTablero(){
        this.tablero.classList.add('hidden');
    }

    showTablero(){
        this.tablero.classList.remove('hidden');
    }

}