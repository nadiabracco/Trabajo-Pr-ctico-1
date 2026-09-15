// Selecciona el elemento del HTML donde se van a mostrar las cartas.
let mesaDeJuego = document.querySelector("#mesaDeJuego");

//Genera el mazo cartas.
const mazo = [];

//Recorre los 4 palos.
const palos = ["oros", "copas", "espadas", "bastos"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; 

for (let i = 0; i < 4; i++) {
    // recorre las posiciones del array numeros
    for (let j = 0; j < 10; j++) {
        const carta = {
            palo: palos[i],
            numero: numeros[j]
        };
        mazo.push(carta);
    }
 }
console.log("Mazo original:", mazo);
console.log("Total de cartas: " + mazo.length);

//Mezclar las cartas del mazo aleatoriamente.
const cantidadDeCartas = mazo.length;
const mazoMezclado = [];
for (let i = 0; i < cantidadDeCartas; i++) {
    let posicionAzar = Math.floor(Math.random() * mazo.length); 
    let cartaSorteada = mazo[posicionAzar];                     
    mazo.splice(posicionAzar, 1);                                
    mazoMezclado.push(cartaSorteada);                           
}
console.log("Mazo mezclado:", mazoMezclado);

//Puntos de los jugadores/ manos/ descartes de cartas.
let puntosJugador1 = 0;
let puntosJugador2 = 0;
let manoJugador1 = [];
let manoJugador2 = [];
let descartes = [];

//Reparte las cartas a los jugadores.
for (let i = 0; i < 4; i++) {
    let cartaRepartida = mazoMezclado[0];
    mazoMezclado.splice(0, 1);

    if (i < 2) {
        manoJugador1.push(cartaRepartida);
    } else {
        manoJugador2.push(cartaRepartida);
    }
}
console.log("Mano Jugador 1:", manoJugador1);
console.log("Mano Jugador 2:", manoJugador2);
console.log("Cartas restantes en el mazo:", mazoMezclado.length);

// Muestra las cartas del Jugador 1.
for (let i = 0; i < 2; i++) {
    let carta = manoJugador1[i];
    let rutaImagen = "imagenes/" + carta.palo + " " + carta.numero + ".png";
    let etiquetaImagen = '<img src="' + rutaImagen + '">';
    mesaDeJuego.innerHTML += etiquetaImagen;
}

// Muestra las cartas del Jugador 2.
for (let i = 0; i < 2; i++) {
    let carta = manoJugador2[i];
    let rutaImagen = "imagenes/" + carta.palo + " " + carta.numero + ".png";
    let etiquetaImagen = '<img src="' + rutaImagen + '">';
    mesaDeJuego.innerHTML += etiquetaImagen;
}
// Repite cada ronda: comparar, descartar y robar hasta que alguien gane 3 puntos.
while (puntosJugador1 < 3 && puntosJugador2 < 3) {

//Descarta y roba 1 carta.
if (manoJugador1[0].numero === manoJugador1[1].numero) {
    puntosJugador1++;
} else {
  //Descarta 1 carta
let cartaDescartada = manoJugador1[0];
manoJugador1.splice(0, 1);
descartes.push(cartaDescartada);

// Roba 1 carta
let cartaRobada = mazoMezclado[0];
mazoMezclado.splice(0, 1);
manoJugador1.push(cartaRobada);
 if (manoJugador1[0].numero === manoJugador1[1].numero) {
    puntosJugador1++;
    }
}

//Descarta y roba 1 carta jugador2.
 if (manoJugador2[0].numero === manoJugador2[1].numero) {
    puntosJugador2++;
} else {

let cartaDescartada = manoJugador2[0];
manoJugador2.splice(0, 1);
descartes.push(cartaDescartada);

let cartaRobada = mazoMezclado[0];
mazoMezclado.splice(0, 1);
manoJugador2.push(cartaRobada);

 if (manoJugador2[0].numero === manoJugador2[1].numero) {
    puntosJugador2++;
    }
}

console.log("Puntos Jugador 1:", puntosJugador1);
console.log("Puntos Jugador 2:", puntosJugador2);
}