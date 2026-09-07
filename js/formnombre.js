window.addEventListener("DOMContentLoaded", function () {
   
    localStorage.removeItem('nombre');

    let nombreJugador = prompt("Ingresa tu nombre por favor");
    let nombreimpreso = document.querySelector("#nombreimpreso");

    while (nombreJugador === null || nombreJugador === "" || !isNaN(nombreJugador)) {
        nombreJugador = prompt("Nombre inválido. Por favor, ingresa un nombre válido.");
    }

    localStorage.setItem('nombre', nombreJugador);
    nombreimpreso.innerText = nombreJugador;
});