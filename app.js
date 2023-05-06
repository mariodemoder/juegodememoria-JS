//inicializacion de variables
let tarjetasDestapadas = 0;
tarjeta1 = null;
tarjeta2 = null;
primerResultado = null;
segundoResultado = null;
let movimientos = 0;
let aciertos = 0;
let temporizador = false;

let timer = 26;
let timerInicial = timer;
let tiempoRegresivoId = null;

//delegacion html
let mostrarMovimientos = document.getElementById('movimientos');
let mostrarAciertos = document.getElementById('aciertos');
let mostrarTiempo = document.getElementById('t-restante');

//generacion de numeros aleatorios para el array
let numeros = [1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8];
numeros = numeros.sort(()=>{return Math.random()-0.2});
numeros = numeros.sort(()=>{return Math.random()-0.5});
//console.log(numeros);
//funciones
function contarTiempo(){
    tiempoRegresivoId = setInterval(()=>{
        timer--;
        mostrarTiempo.innerHTML = `Tiempo Restante: ${timer} segundos`;
        if(timer == 0){
            clearInterval(tiempoRegresivoId);
            bloquearTarjetas();
            swal({
                title: "UPS!",
                text: "Has Perdido! Visita a tu Doctor",
                icon: "error",
                button: "Volver",
              });
        }
        },1000);
}
function bloquearTarjetas(){
    for (let i = 0; i<=15; i++){
        let tarjetaBloqueada = document.getElementById(i);
        tarjetaBloqueada.innerHTML = numeros[i];
        tarjetaBloqueada.disabled = true;
        //console.log('i: '+i);
        }
}
function destapar(id){
    if(temporizador == false){
        contarTiempo();
        temporizador = true;
    }

    tarjetasDestapadas++;
   // console.log(tarjetasDestapadas);

    if(tarjetasDestapadas == 1){
        //muestra el primer boton
        tarjeta1 = document.getElementById(id);
        primerResultado = numeros[id];
        tarjeta1.innerHTML = primerResultado;
        //deshabilitar el boton presionado
        tarjeta1.disabled = true;

    }else if(tarjetasDestapadas == 2){
        //muestra el segundo boton
        tarjeta2 = document.getElementById (id);
        segundoResultado = numeros[id];
        tarjeta2.innerHTML = segundoResultado;
        //deshabilitar segundo boton
        tarjeta2.disabled = true;
        //incrementar los movimientos
        movimientos++;
        mostrarMovimientos.innerHTML = `Movimientos: ${movimientos}`;

        if(primerResultado == segundoResultado){
            //Encerar contador tarjetas destapadas
            tarjetasDestapadas = 0;
            //Aumentar cantidad de aciertos
            aciertos++;
            mostrarAciertos.innerHTML = `Aciertos: ${aciertos}`;

            if(aciertos == 8){
                clearInterval(tiempoRegresivoId);
                mostrarTiempo =
                swal({
                    title: "GRAN MEMORIA!",
                    text: "Has Ganado! y en "+`solo ${timerInicial - timer} segundos`,
                    icon: "success",
                    button: "Volver",
                  });
            }
        }else{
            //mostrar momentaneamente valores y volver a tapar
            setTimeout(() => {
                tarjeta1.innerHTML = '';
                tarjeta2.innerHTML = '';
                tarjeta1.disabled = false;
                tarjeta2.disabled = false;
                tarjetasDestapadas = 0;
            }, 700);
        }
    }
}
