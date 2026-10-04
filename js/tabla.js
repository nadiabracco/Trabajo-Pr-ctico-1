// Récord del juego de cartas
let victoriasJugador = document.querySelector("#victoriasJugador");
victoriasJugador.innerHTML = Number(localStorage.getItem("victoriasJugador"));

let victoriasReina = document.querySelector("#victoriasReina");
victoriasReina.innerHTML = Number(localStorage.getItem("victoriasReina"));
let rankingRachas = document.querySelector("#rankingRachas");
let rankingGuardado = localStorage.getItem("rankingCartas");

if (rankingGuardado === null) {
    rankingRachas.innerHTML = "<li>Todavía no hay partidas ganadas.</li>";
} else {
    let ranking = JSON.parse(rankingGuardado);
    let htmlRanking = "";
    for (let i = 0; i < ranking.length; i++) {
        htmlRanking += "<li>" + ranking[i].nombre + ": " + ranking[i].racha + "</li>";
    }
    rankingRachas.innerHTML = htmlRanking;
}

// Récord del juego de dados
const recordDadosP = document.querySelector("#recordDados");
const rachaDados = localStorage.getItem("recordRachaDados");
const nombreDados = localStorage.getItem("recordRachaDadosNombre");

if (rachaDados) {
    recordDadosP.innerText = `${nombreDados}: ${rachaDados}`;
} else {
    recordDadosP.innerText = "Todavía no hay récord.";
}

const parrafoRecordTrivia = document.querySelector("#recordTrivia");
const recordTrivia = localStorage.getItem("recordTrivia");
const recordTriviaNombre = localStorage.getItem("recordTriviaNombre");

if (recordTrivia) {
 parrafoRecordTrivia.textContent = recordTriviaNombre + ": " + recordTrivia;
} else {
  parrafoRecordTrivia.textContent = "Todavía no hay récord de trivia.";
}