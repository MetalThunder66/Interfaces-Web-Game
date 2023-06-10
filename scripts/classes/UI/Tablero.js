export class Tablero {

    constructor() {
        this.tablero = document.getElementById("tablero-jugador");

        //captura de las 3 barras de estado: vida, tiempo y escudo
        this.healthState = document.getElementById("health-state");
        this.timeState = document.getElementById("timer-state");
        this.shieldState = document.getElementById("shield-state");

        //captura de cada estado y score para modificar su contenido
        this.healthValue = document.getElementById("vida-value");
        this.timerValue = document.getElementById("tiempo-value");
        this.scoreValue = document.getElementById("score-value");
        this.shieldValue = document.getElementById("escudo-value");

        //div del shield en el UI
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

    setHealth(health){
        this.healthValue.innerHTML = health;
    }

    setTimer(time){
        this.timerValue.innerHTML = time + 's';
    }

    setScore(score){
        this.scoreValue.innerHTML = score;
    }

    setShield(duration){
        this.shieldValue.innerHTML = duration + 's';
    }

    giveShieldDuration(duration){ //comienza el timer del shield con esta funcion   
        this.setShield(duration);
        this.showBarStatus(duration, 8, this.shieldState); //voy actualizando la barra de escudo segun cuanto tiempo activo le quede

        duration--;

        this.shieldInterval = setInterval(() => {
            this.setShield(duration);
            this.showBarStatus(duration, 8, this.shieldState);

            if (duration > 0){ //para que no vaya a negativo el timer
                duration--;
            };
          }, 1000);
    }
    
    showShield(){ //muestra en el hud cuanto escudo le queda al runner
        if (!this.shieldDiv.classList.contains.show){
            this.shieldDiv.classList.remove('hide');
            this.shieldDiv.classList.add('show');
        }

        let duration = 8;
        
        this.giveShieldDuration(duration);

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

    updateTablero(hp, time, score){ //va actualizando los valores de vida y tiempo al momento de ser llamada la funcion asi como tambien su barra en el UI
        this.setHealth(hp);
        this.showBarStatus(hp, 100, this.healthState)
        this.setTimer(time);
        this.showBarStatus(time, 60, this.timeState)
        this.setScore(score);
        

    }

    showBarStatus(value, maxValue, elemento){
        var valorActual = value;
        var valorMaximo = maxValue;
        var barraStatus = elemento;

        var porcentajeBarra = (valorActual / valorMaximo) * 100; //calcula el porcentaje del elemento actual
        var anchoBarra = (porcentajeBarra / 100) * 68; //calcula el ancho deseado en relación al total de la barra cuando esta llena, en este caso 68vh

        barraStatus.style.width = anchoBarra + 'vh'; //aplica el ancho a la barra del elemento
    }



}