export class Tablero {

    constructor() {
        this.tablero = document.getElementById("tablero-jugador");

        this.healthValue = document.getElementById("vida-value");
        this.timerValue = document.getElementById("tiempo-value");
        this.scoreValue = document.getElementById("score-value");
        this.shieldValue = document.getElementById("escudo-value");

        this.invencivilityDiv = document.getElementById("invencivility-bar");

        //variables timeout e interval para manejar el div del escudo
        this.shieldInterval = null;
        this.shieldTimeout = null; 
    }

    showTablero(){
        this.tablero.classList.remove('hidden');
    }

    hideTablero(){
        this.tablero.classList.add('hidden');
    }

    setHealth(value){
        this.healthValue.innerHTML = value;
    }

    setTimer(value){
        this.timerValue.innerHTML = value + 's';
    }

    setScore(value){
        this.scoreValue.innerHTML = value;
    }

    setShield(value){
        this.shieldValue.innerHTML = value + 's';
    }

    giveShieldDuration(){
        let value = 8;

        this.shieldInterval = setInterval(() => {
            this.setShield(value);
            value--;
          }, 1000);
    }
    
    showShield(){ //muestra en el hud cuanto escudo le queda al runner
        this.invencivilityDiv.classList.replace('hide', 'show');
        
        this.giveShieldDuration();

        this.shieldTimeout = setTimeout(() => {
            this.invencivilityDiv.classList.replace('show', 'hide');
        }, 8000); //este time out va sincronizado con la duracion del shield, asi se oculta sincronizadamente
    }

    updateShieldStatus(){ //si agarro un escudo ya teniendo el escudo activado, ejecuto esta funcion, reinicia el contador en 8 nuevamente
        clearInterval(this.shieldInterval);
        clearTimeout(this.shieldTimeout); 
        showShield(); 
    }

    updateTablero(hp, time, score){ //va actualizando los valores de vida y tiempo al momento de ser llamada la funcion
        this.setHealth(hp);
        this.setTimer(time);
        this.setScore(score);

    }



}