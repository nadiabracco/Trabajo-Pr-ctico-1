// Capturar elementos
const botonTirar = document.querySelector("#tirar");
const botonReiniciar = document.querySelector("#reiniciar");
const puntajesP = document.querySelector("#puntajes");
const dadoUsuarioImg = document.querySelector("#dado-usuario");
const dadoComputadoraImg = document.querySelector("#dado-computadora");

// Variables de puntaje
let puntajeUsuario = 0;
let puntajeComputadora = 0;

// Función para tirar un dado
function tirarDado() {
    // Tirada del usuario
    let dadoUsuario = Math.floor(Math.random() * 6) + 1;
    if (dadoUsuario % 2 === 0) {
        puntajeUsuario += dadoUsuario;
    } else {
        puntajeUsuario -= 1;
        if (puntajeUsuario < 0) puntajeUsuario = 0;
    }
    dadoUsuarioImg.src = `imagenes/dado${dadoUsuario}.jpg`;
    dadoUsuarioImg.alt = `Dado del usuario: ${dadoUsuario}`;

    // Tirada de la computadora
    let dadoComputadora = Math.floor(Math.random() * 6) + 1;
    if (dadoComputadora % 2 === 0) {
        puntajeComputadora += dadoComputadora;
    } else {
        puntajeComputadora -= 1;
        if (puntajeComputadora < 0) puntajeComputadora = 0;
    }
    dadoComputadoraImg.src = `imagenes/dado${dadoComputadora}.jpg`;
    dadoComputadoraImg.alt = `Dado de la computadora: ${dadoComputadora}`;

    // Actualizar puntajes
    puntajesP.innerText = `Usuario: ${puntajeUsuario} | Computadora: ${puntajeComputadora}`;

    // Verificar ganador
    if (puntajeUsuario >= 20 && puntajeComputadora >= 20) {
        alert("¡Empate! Los dos llegaron a 20 puntos en la misma ronda.");
        botonTirar.disabled = true;
    } else if (puntajeUsuario >= 20) {
        alert("¡Ganó el usuario!");
        botonTirar.disabled = true;
    } else if (puntajeComputadora >= 20) {
        alert("¡Ganó la computadora!");
        botonTirar.disabled = true;
    }
}

// Función para reiniciar
function reiniciarJuego() {
    puntajeUsuario = 0;
    puntajeComputadora = 0;
    puntajesP.innerText = `Usuario: 0 | Computadora: 0`;
    dadoUsuarioImg.src = "imagenes/dado1.jpg";
    dadoUsuarioImg.alt = "Dado del usuario";
    dadoComputadoraImg.src = "imagenes/dado1.jpg";
    dadoComputadoraImg.alt = "Dado de la computadora";
    botonTirar.disabled = false;
}

// Eventos
botonTirar.addEventListener("click", tirarDado);
botonReiniciar.addEventListener("click", reiniciarJuego);