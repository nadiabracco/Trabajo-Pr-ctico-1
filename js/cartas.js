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

console.log(mazo);
console.log("Total de cartas: " + mazo.length);