// Selecciona el elemento del HTML donde se van a mostrar las cartas.
let mesaDeJuego = document.querySelector("#mesaDeJuego");
// Trae el nombre que el jugador que se ingresó.
let nombre = localStorage.getItem('nombre');
//muestra el puntaje. 
let puntajeCartas = document.querySelector("#puntajeCartas");
// muestra quién ganó.
let mensajeFinal = document.querySelector("#mensajeFinal");
//variable global
let mazoMezclado = [];
let puntosJugador1 = 0;
let puntosJugador2 = 0;
let manoJugador1 = [];
let manoJugador2 = [];
let descartes = [];
let esperandoDescarte = false;
let enDesempate = false;

//jugar partida
function jugarPartida() {
//Genera el mazo cartas.
const mazo = [];
//Recorre los 4 palos.
const palos = ["oros", "copas", "espadas", "bastos"];
const numeros = [1, 2, 3, 4, 5, 6, 7, 10, 11, 12]; 

for (let i = 0; i < 4; i++) {
    // recorre las posiciones del array numeros.
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

//Mezcla las cartas del mazo.
const cantidadDeCartas = mazo.length;
 mazoMezclado = [];
for (let i = 0; i < cantidadDeCartas; i++) {
    let posicionAzar = Math.floor(Math.random() * mazo.length); 
    let cartaSorteada = mazo[posicionAzar];                     
    mazo.splice(posicionAzar, 1);                                
    mazoMezclado.push(cartaSorteada);                           
}
console.log("Mazo mezclado:", mazoMezclado);

//Puntos de los jugadores/ manos/ descartes/desempate de cartas.
 puntosJugador1 = 0;
 puntosJugador2 = 0;
 manoJugador1 = [];
 manoJugador2 = [];
 descartes = [];
 enDesempate = false; 
 mensajeFinal.innerHTML = "";

//Reparte las cartas a los jugadores.
for (let i = 0; i < 4; i++) {
    let cartaRepartida = mazoMezclado[0];
    mazoMezclado.splice(0, 1);

    if (i < 2) {
        manoJugador1.push(cartaRepartida);
    }
    else {
        manoJugador2.push(cartaRepartida);
    }
}
console.log("Mano Jugador 1:", manoJugador1);
console.log("Mano Jugador 2:", manoJugador2);
console.log("Cartas restantes en el mazo:", mazoMezclado.length);

mostrarCartas();
mostrarPuntaje();
jugarRonda(); 
}

//compruba quien gano y el desempate.
function jugarRonda() {
    if (puntosJugador1 >= 3 || puntosJugador2 >= 3) {
        if (puntosJugador1 >= 3 && puntosJugador2 >= 3) {
            enDesempate = true;
        }
        else if (puntosJugador1 >= 3) {
            console.log("Ganó " + nombre);
            registrarVictoria("jugador");
            mensajeFinal.innerHTML = "Ganó " + nombre;
            esperandoDescarte = false;
            return;
        }
        else if (puntosJugador2 >= 3) {
            console.log("Ganó la Reina Roja");
            registrarVictoria("reina");
            mensajeFinal.innerHTML = "Ganó la Reina Roja";
            esperandoDescarte = false;
            return;
        }
    }

    //Descarta y roba 1 carta.
    if (manoJugador1[0].numero === manoJugador1[1].numero) {
        puntosJugador1++;
        // las cartas del par van a descartes.
         descartes.push(manoJugador1[0]);  
        descartes.push(manoJugador1[1]);  
        manoJugador1 = [];
        manoJugador1.push(robarCarta());
        manoJugador1.push(robarCarta());

        if (enDesempate) {
            if (puntosJugador1 > puntosJugador2) {
                console.log("Ganó " + nombre);
                registrarVictoria("jugador");
                mensajeFinal.innerHTML = "Ganó " + nombre;
                esperandoDescarte = false;
                mostrarCartas();
                mostrarPuntaje();
                return;
            }
        }
        esperandoDescarte = false;
    }
    else {
        //boton descarte
        esperandoDescarte = true;
        mostrarCartas();
        let boton0 = document.querySelector("#botonDescarte0");
        let boton1 = document.querySelector("#botonDescarte1");
        boton0.addEventListener("click", function() {
            elJugadorDescarta(0);
        });
        boton1.addEventListener("click", function() {
            elJugadorDescarta(1);
        });
        return;
    }
    //función de la Reina Roja para que juegue su turno.
    turnoReinaRoja();
}

function elJugadorDescarta(cartaATirar) {
    // Descarta la carta elegida por el jugador.
    let cartaDescartada = manoJugador1[cartaATirar];
    manoJugador1.splice(cartaATirar, 1);
    descartes.push(cartaDescartada);

    manoJugador1.push(robarCarta());

    //Comprueba si la carta nueva forma par.
    if (manoJugador1[0].numero === manoJugador1[1].numero) {
        puntosJugador1++;
         descartes.push(manoJugador1[0]);  
        descartes.push(manoJugador1[1]);
        manoJugador1 = [];
        manoJugador1.push(robarCarta());
        manoJugador1.push(robarCarta());

        if (enDesempate) {
            if (puntosJugador1 > puntosJugador2) {
                console.log("Ganó " + nombre);
                registrarVictoria("jugador");
                mensajeFinal.innerHTML = "Ganó " + nombre;
                esperandoDescarte = false;
                mostrarCartas();
                mostrarPuntaje();
                return;
            }
        }
    }
    esperandoDescarte = false;
    mostrarCartas();
    mostrarPuntaje();
    turnoReinaRoja();
}

function turnoReinaRoja() {
    //Descarta y roba 1 carta Reina Roja.
    if (manoJugador2[0].numero === manoJugador2[1].numero) {
        puntosJugador2++;
         descartes.push(manoJugador2[0]); 
        descartes.push(manoJugador2[1]);  
        manoJugador2 = [];
        manoJugador2.push(robarCarta());
        manoJugador2.push(robarCarta());

        if (enDesempate) {
            if (puntosJugador1 < puntosJugador2) {
                console.log("Ganó la Reina Roja");
                registrarVictoria("reina");
                mensajeFinal.innerHTML = "Ganó la Reina Roja";
                esperandoDescarte = false;
                mostrarCartas();
                mostrarPuntaje();
                return;
            }
        }
    }
    else {
        let cartaDescartada = manoJugador2[0];
        manoJugador2.splice(0, 1);
        descartes.push(cartaDescartada);

        manoJugador2.push(robarCarta());

        if (manoJugador2[0].numero === manoJugador2[1].numero) {
            puntosJugador2++;
              descartes.push(manoJugador2[0]); 
             descartes.push(manoJugador2[1]); 
            manoJugador2 = [];
            manoJugador2.push(robarCarta());
            manoJugador2.push(robarCarta());
       
            if (enDesempate) {
                if (puntosJugador1 < puntosJugador2) {
                    console.log("Ganó la Reina Roja");
                    registrarVictoria("reina");
                    mensajeFinal.innerHTML = "Ganó la Reina Roja";
                    esperandoDescarte = false;
                    mostrarCartas();
                    mostrarPuntaje();
                    return;
                }
            }
        }    
    }

    console.log("Puntos Jugador 1:", puntosJugador1);
    console.log("Puntos Jugador 2:", puntosJugador2);

    mostrarPuntaje();
    mostrarCartas();
    jugarRonda();
}

// Recicla las cartas descartadas cuando el mazo se agota.
function reciclarMazo() {
    if (mazoMezclado.length === 0) {
        const cantidadDeCartas = descartes.length;
        for (let i = 0; i < cantidadDeCartas; i++) {
            let posicionAzar = Math.floor(Math.random() * descartes.length);
            let cartaReciclada = descartes[posicionAzar];
            descartes.splice(posicionAzar, 1);
            mazoMezclado.push(cartaReciclada);
        }
    }
}

function robarCarta() {
    // si el mazo está vacío, se rellena con los descartes.
    reciclarMazo();
    // saca la primera carta y la devuelve.             
    return mazoMezclado.shift(); 
}

// Registra quién ganó: cuenta las victorias y lleva la racha de victorias seguidas.
function registrarVictoria(ganador) {
    if (ganador === "reina") {
        // Ganó la Reina Roja: se suma su victoria y la racha del jugador se corta.
        let totalReina = Number(localStorage.getItem("victoriasReina"));
        localStorage.setItem("victoriasReina", totalReina + 1);
        localStorage.setItem("rachaActualCartas", 0);
    }
    else {
        // Ganó el jugador: se suma su victoria.
        let totalJugador = Number(localStorage.getItem("victoriasJugador"));
        localStorage.setItem("victoriasJugador", totalJugador + 1);

        // La racha sigue solo si es la misma persona que la venía haciendo.
        let racha = Number(localStorage.getItem("rachaActualCartas"));
        let nombreDeLaRacha = localStorage.getItem("rachaNombreCartas");
        if (nombreDeLaRacha === nombre) {
            racha = racha + 1;
        } else {
            racha = 1;
        }
        localStorage.setItem("rachaActualCartas", racha);
        localStorage.setItem("rachaNombreCartas", nombre);

        // Récord general (la mejor racha de todos, con su nombre).
        let recordRacha = Number(localStorage.getItem("recordRachaCartas"));
        if (racha > recordRacha) {
            localStorage.setItem("recordRachaCartas", racha);
            localStorage.setItem("recordRachaCartasNombre", nombre);
        }

        // Ranking: lista con la mejor racha de cada jugador.
        let ranking = [];
        let guardado = localStorage.getItem("rankingCartas");
        if (guardado !== null) {
            ranking = JSON.parse(guardado);
        }

        let encontrado = false;
        for (let i = 0; i < ranking.length; i++) {
            if (ranking[i].nombre === nombre) {
                encontrado = true;
                if (racha > ranking[i].racha) {
                    ranking[i].racha = racha;
                }
            }
        }
        if (encontrado === false) {
            ranking.push({ nombre: nombre, racha: racha });
        }

        localStorage.setItem("rankingCartas", JSON.stringify(ranking));
    }
}

function mostrarCartas() {
      let html = "";
    html += '<section class="jugador"><h3>' + nombre + '</h3>';
    html += '<div class="mano">';
    for (let i = 0; i < 2; i++) {
        let carta = manoJugador1[i];
        let rutaImagen = "imagenes/" + carta.palo + " " + carta.numero + ".png";
        let etiquetaImagen = '<img src="' + rutaImagen + '">';
       html += '<div class="carta">';
       html += etiquetaImagen;
        let etiquetaBoton;
    if (esperandoDescarte) {
        etiquetaBoton = '<button id="botonDescarte' + i + '">Descartar</button>';
    } else {
        etiquetaBoton = '<button id="botonDescarte' + i + '" disabled>Descartar</button>';
    }
        html += etiquetaBoton;
        html += '</div>';
     }
    html += '</div>';
    html += '</section>';
    
      html += '<section class="computadora"><h3>Reina Roja</h3>';
      html += '<div class="mano">';
        for (let i = 0; i < 2; i++) {
        let carta = manoJugador2[i];
        let rutaImagen = "imagenes/" + carta.palo + " " + carta.numero + ".png";
        let etiquetaImagen = '<img src="' + rutaImagen + '">';
        html += '<div class="carta">';
        html += etiquetaImagen;
        html += '</div>';
    }
    
     html += '</div>';
    
    // El botón de nueva ronda.
    html += '<button id="botonNuevaRonda">Nueva Ronda</button>';
    html += '</section>';  

    // Pasa todo lo armado a la página.
    mesaDeJuego.innerHTML = html;

    // El botón se crea de nuevo cada vez y se le conectarle el clic acá.
    let nuevaRonda = document.querySelector("#botonNuevaRonda");
    nuevaRonda.addEventListener("click", function() {
        jugarPartida();
    });
}
//Muestra el puntaje del jugar y la de la Reina Roja.
function mostrarPuntaje() {
    let textoPuntaje = nombre + ": " + puntosJugador1 + " - Reina Roja: " + puntosJugador2;
    puntajeCartas.innerHTML = textoPuntaje;
}
//Arranca la partida.
 jugarPartida();
