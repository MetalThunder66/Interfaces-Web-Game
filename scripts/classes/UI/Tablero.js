export class Tablero {

    constructor() {
        this.tablero = document.getElementById("tablero-jugador");

        this.healthValue = document.getElementById("vida-value");
        this.timerValue = document.getElementById("tiempo-value");
        this.scoreValue = document.getElementById("score-value");
        this.shieldValue = document.getElementById("escudo-value");

        this.shieldDiv = document.getElementById("shield-bar");

        //variables timeout e interval para manejar el div del escudo
        this.shieldInterval = null;
        this.shieldTimeout = null; 
    }

    showTablero(){
        this.tablero.classList.remove('hide');
        this.tablero.classList.add('show');
    }

    hideTablero(){
        this.tablero.classList.replace('show','hide');
    }

    //seteadores de contenido de cada item del tablero

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

    giveShieldDuration(value){ //comienza el timer del shield con esta funcion
        
        this.setShield(value);
        value--;

        this.shieldInterval = setInterval(() => {
            this.setShield(value);
            if (value > 0){ //para que no vaya a negativo el timer
                value--;
            };
          }, 1000);
    }
    
    showShield(){ //muestra en el hud cuanto escudo le queda al runner
        if (!this.shieldDiv.classList.contains.show){
            this.shieldDiv.classList.remove('hide');
            this.shieldDiv.classList.add('show');
        }

        let value = 8;
        
        this.giveShieldDuration(value);

        this.shieldTimeout = setTimeout(() => {
            this.shieldDiv.classList.replace('show', 'hide');
            clearInterval(this.shieldInterval); //cuanto termina el powerup, limpio el interval del timer del shield

        }, 9000); //este time out va sincronizado con la duracion del shield, asi se oculta sincronizadamente
    }

    updateShieldStatus(){ //si agarro un escudo ya teniendo el escudo activado, ejecuto esta funcion, reinicia el contador en 8 nuevamente
        clearInterval(this.shieldInterval);
        clearTimeout(this.shieldTimeout); 
        this.showShield(); 
    }

    updateTablero(hp, time, score){ //va actualizando los valores de vida y tiempo al momento de ser llamada la funcion
        this.setHealth(hp);
        this.setTimer(time);
        this.setScore(score);

    }



}