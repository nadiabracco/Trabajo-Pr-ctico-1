//Generar mazo 
const palos = ["oros", "copas", "espadas", "bastos"];
const mazo = [];

// Bucle externo: recorre los 4 palos
for (let i = 0; i < 4; i++) {

    // Bucle interno: recorre los números del 1 al 10
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

//Mezclar el mazo 
const cantidadDeCartas = mazo.length; // guardo el 40 fijo, antes de tocar el mazo
const mazoMezclado = [];

for (let i = 0; i < cantidadDeCartas; i++) {
    let posicionAzar = Math.floor(Math.random() * mazo.length); // posición random dentro de lo que queda del mazo
    let cartaSorteada = mazo[posicionAzar];                     // agarro esa carta
    mazo.splice(posicionAzar, 1);                                // la saco del mazo original
    mazoMezclado.push(cartaSorteada);                            // la guardo en el mazo mezclado
}

console.log("Mazo mezclado:", mazoMezclado);
console.log("El mazo original ahora tiene:", mazo.length, "cartas"); // debería dar 0
