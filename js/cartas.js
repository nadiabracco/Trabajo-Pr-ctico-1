//Genera el mazo de 40 cartas.
const palos = ["oros", "copas", "espadas", "bastos"];
const mazo = [];

//Recorre los 4 palos
for (let i = 0; i < 4; i++) {
 // recorre los números de cada palo 
    for (let j = 1; j <= 10; j++) {
        const carta = {
            palo: palos[i],
            numero: j
        };
        mazo.push(carta);
    }

}
console.log("Mazo original:", mazo);
console.log("Total de cartas: " + mazo.length);

//Mezclar las cartas del mazo en un orden aleatorio.
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