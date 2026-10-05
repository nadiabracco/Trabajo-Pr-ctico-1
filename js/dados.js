// Capturar elementos
const botonTirar = document.querySelector("#tirar"); // Busca el elemento con id="tirar" y lo guarda en botonTirar.
const botonReiniciar = document.querySelector("#reiniciar"); // Busca el botón con id="reiniciar".
const puntajesP = document.querySelector("#puntajes"); // Busca el elemento donde se muestran los puntajes.
const dadoUsuarioImg = document.querySelector("#dado-usuario"); // Busca la imagen del dado del usuario.
const dadoComputadoraImg = document.querySelector("#dado-computadora"); // Busca la imagen del dado de la computadora.

// Variables de puntaje
let puntajeUsuario = 0; // Guarda los puntos actuales del usuario. Empieza en 0.
let puntajeComputadora = 0; // Guarda los puntos actuales de la computadora. Empieza en 0.
let enDesempate = false; // Indica si el próximo tiro es de desempate. Empieza en false porque todavía no hay empate.
let rachaActual = 0; // Guarda cuántos números pares seguidos lleva el usuario.
let mejorRacha = 0; // Guarda la racha más larga que consiguió el usuario durante esta partida.


// Función para tirar un dado
function tirarDado() { // Crea la función que se ejecuta cada vez que se tira el dado.

    // Tirada del usuario
    let dadoUsuario = Math.floor(Math.random() * 6) + 1; // Genera un número aleatorio entre 1 y 6.
    dadoUsuarioImg.src = `imagenes/dado${dadoUsuario}.jpg`; // src indica qué imagen mostrar. ${dadoUsuario} inserta el número obtenido en el nombre del archivo.
    dadoUsuarioImg.alt = `Dado del usuario: ${dadoUsuario}`; // alt es el texto alternativo de la imagen, útil si no carga o para accesibilidad.

    // Tirada de la computadora
    let dadoComputadora = Math.floor(Math.random() * 6) + 1; // Genera otro número aleatorio entre 1 y 6 para la computadora.
    dadoComputadoraImg.src = `imagenes/dado${dadoComputadora}.jpg`; // Cambia la imagen según el número que sacó la computadora.
    dadoComputadoraImg.alt = `Dado de la computadora: ${dadoComputadora}`; // Texto alternativo que describe el dado de la computadora.

    // Si se desempata, se compara quien saca el numero mas alto
    if (enDesempate) { // Comprueba si estamos en modo desempate.

        if (dadoUsuario > dadoComputadora) { // Si el usuario saca un número mayor que la computadora...
            alert(`¡Ganó el usuario en el desempate! (${dadoUsuario} contra ${dadoComputadora})`); // Muestra un mensaje indicando que ganó el usuario.
            botonTirar.disabled = true; // Deshabilita el botón Tirar para terminar el juego.

        } else if (dadoComputadora > dadoUsuario) { // Si la computadora saca un número mayor...
            alert(`¡Ganó la computadora en el desempate! (${dadoComputadora} contra ${dadoUsuario})`); // Muestra un mensaje indicando que ganó la computadora.
            botonTirar.disabled = true; // Deshabilita el botón Tirar.

        } else { // Si los dos sacan el mismo número...
            alert("¡Otra vez empate! Tiren de nuevo."); // Avisa que tienen que volver a tirar.
        }

        return; // Termina la función acá y no continúa con la lógica normal del juego.
    }

    // Lógica normal: par suma, impar resta
    if (dadoUsuario % 2 === 0) { // % obtiene el resto de una división. Si el resto al dividir por 2 es 0, es un número par.

        puntajeUsuario += dadoUsuario; // Suma el número del dado al puntaje del usuario. += significa "sumar y guardar".

        rachaActual++; // Aumenta en 1 la cantidad de pares seguidos que lleva el usuario.

        if (rachaActual > mejorRacha) { // Comprueba si la racha actual superó la mejor racha anterior.
            mejorRacha = rachaActual; // Si la superó, guarda la nueva racha como récord de esta partida.
        }

        let recordGuardado = Number(localStorage.getItem("recordRachaDados")); // getItem obtiene el récord guardado. Number convierte el texto obtenido en número porque localStorage guarda todo como texto.

        if (mejorRacha > recordGuardado) { // Comprueba si la mejor racha de esta partida supera el récord guardado.

            localStorage.setItem("recordRachaDados", mejorRacha); // setItem guarda el nuevo récord. "recordRachaDados" es la clave y mejorRacha es el valor.

            localStorage.setItem("recordRachaDadosNombre", localStorage.getItem("nombre")); // Guarda el nombre del jugador que consiguió el récord. getItem("nombre") obtiene el nombre guardado.
        }

    } else { // Si el número del usuario es impar...

        puntajeUsuario -= 1; // Resta 1 punto al usuario. -= significa "restar y guardar".
        rachaActual = 0; // Reinicia la racha porque salió un número impar.

        if (puntajeUsuario < 0) puntajeUsuario = 0; // Si el puntaje queda negativo, lo vuelve a 0.
    }


    if (dadoComputadora % 2 === 0) { // Comprueba si el número de la computadora es par.

        puntajeComputadora += dadoComputadora; // Si es par, suma ese número al puntaje de la computadora.

    } else { // Si el número de la computadora es impar...

        puntajeComputadora -= 1; // Le resta 1 punto a la computadora.

        if (puntajeComputadora < 0) puntajeComputadora = 0; // Evita que el puntaje de la computadora sea negativo.
    }


    // Actualizar puntajes
    puntajesP.innerText = `Usuario: ${puntajeUsuario} | Computadora: ${puntajeComputadora}`; // innerText cambia el texto del elemento y ${} inserta los valores de las variables.


    // Verificar ganador o empate
    if (puntajeUsuario >= 20 && puntajeComputadora >= 20) { // Comprueba si los dos llegaron a 20 puntos o más en la misma ronda.

        alert("¡Empate! Los dos llegaron a 20 puntos en la misma ronda. Tienen otra oportunidad: quien saque el número más alto en este tiro extra, gana."); // Informa que hay un empate.

        enDesempate = true; // Activa el modo desempate para que el próximo tiro se compare por número más alto.

    } else if (puntajeUsuario >= 20) { // Si el usuario llegó a 20 o más y la computadora no...

        alert("¡Ganó el usuario!"); // Muestra que ganó el usuario.
        botonTirar.disabled = true; // Deshabilita el botón Tirar.

    } else if (puntajeComputadora >= 20) { // Si la computadora llegó a 20 o más y el usuario no...

        alert("¡Ganó la computadora!"); // Muestra que ganó la computadora.
        botonTirar.disabled = true; // Deshabilita el botón Tirar.
    }
}


// Función para reiniciar
function reiniciarJuego() { // Crea la función que vuelve el juego a su estado inicial.

    puntajeUsuario = 0; // Reinicia el puntaje del usuario.
    puntajeComputadora = 0; // Reinicia el puntaje de la computadora.
    enDesempate = false; // Desactiva el modo desempate.
    rachaActual = 0; // Reinicia la racha actual.
    mejorRacha = 0; // Reinicia la mejor racha de esta partida.

    puntajesP.innerText = `Usuario: 0 | Computadora: 0`; // Vuelve a mostrar los puntajes iniciales.

    dadoUsuarioImg.src = "imagenes/dado1.jpg"; // Vuelve a mostrar la imagen inicial del dado del usuario.
    dadoUsuarioImg.alt = "Dado del usuario"; // Coloca nuevamente el texto alternativo inicial.

    dadoComputadoraImg.src = "imagenes/dado1.jpg"; // Vuelve a mostrar la imagen inicial del dado de la computadora.
    dadoComputadoraImg.alt = "Dado de la computadora"; // Coloca nuevamente el texto alternativo inicial.

    botonTirar.disabled = false; // Vuelve a habilitar el botón Tirar.
}


// Eventos
botonTirar.addEventListener("click", tirarDado); // Cuando se hace click en Tirar, ejecuta la función tirarDado.
botonReiniciar.addEventListener("click", reiniciarJuego); // Cuando se hace click en Reiniciar, ejecuta la función reiniciarJuego.