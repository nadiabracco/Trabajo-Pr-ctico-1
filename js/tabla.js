let recordCartas = document.querySelector("#recordCartas");
let recordCartasGuardadas = Number(localStorage.getItem("recordCartas"));
recordCartas.innerHTML = recordCartasGuardadas;
let recordCartasNombre = localStorage.getItem("recordCartasNombre");
let spanNombre = document.querySelector("#recordCartasNombre");
spanNombre.innerHTML = recordCartasNombre;
