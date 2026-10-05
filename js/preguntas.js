
// CONFIGURACIÓN

// URL de la API para traer la lista de categorías
const endpoint = "https://opentdb.com/api_category.php";

// Diccionario de traducción (fijo, no cambia nunca)
const traduccionCategorias = {
  "Art": "Arte",
  "Entertainment: Film": "Cine",
  "Entertainment: Music": "Música"
};

// IDs de las categorías que usamos
const idsElegidos = [25, 11, 12];

// Segundos que tiene el jugador para responder cada pregunta
const TIEMPO_POR_PREGUNTA = 10; 

// Elemento donde van a aparecer los botones de categoría
const contenedorCategorias = document.querySelector("#categorias");

// Array donde vamos a guardar los botones de categoría, para poder deshabilitarlos después
let botonesCategorias = [];

// Elementos de la pregunta y opciones
const elementoPregunta = document.querySelector("#pregunta-texto");
const botonVerdadero = document.querySelector("#btn-verdadero");
const botonFalso = document.querySelector("#btn-falso");
const numeroPreguntaSpan = document.querySelector("#numero-pregunta");

// Elementos de puntaje
const puntosSpan = document.querySelector("#puntos");
const erroresSpan = document.querySelector("#errores");

// Elemento donde se muestra el tiempo que queda
const tiempoSpan = document.querySelector("#tiempo");

// Elemento del botón reiniciar
const botonReiniciarTrivia = document.querySelector("#reiniciar-trivia");

// Variable que va a guardar las preguntas de la partida actual
let preguntasActuales = [];

// Índice de la pregunta actual dentro de la lista
let indice = 0;

// Contadores de la partida
let puntos = 0;
let errores = 0;

// Segundos que le quedan a la pregunta actual
let tiempoRestante = TIEMPO_POR_PREGUNTA;
let temporizador = null;

// LÓGICA PRINCIPAL

// Función para traer las categorías desde la API
async function traerCategorias() {
  try {
    const respuesta = await fetch(endpoint);

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const todasLasCategorias = datos.trivia_categories;

    // Filtro para quedarnos solo con 3
    const categoriasElegidas = todasLasCategorias.filter((categoria) =>
      idsElegidos.includes(categoria.id)
    );

    // Creamos un botón por cada categoría
    categoriasElegidas.forEach((categoria) => {
      const boton = document.createElement("button");
      boton.type = "button";
      boton.textContent = traduccionCategorias[categoria.name];
      boton.addEventListener("click", () => elegirCategoria(categoria.id));
      contenedorCategorias.append(boton);
      botonesCategorias.push(boton); // guardamos el botón para poder deshabilitarlo después
    });

  } catch (error) {
    console.log("Hubo un error al traer las categorías:", error);
  }
}

// Arranca la cuenta regresiva de la pregunta actual
function iniciarTemporizador() { 
  detenerTemporizador(); 
  tiempoRestante = TIEMPO_POR_PREGUNTA;
  tiempoSpan.textContent = tiempoRestante;

  temporizador = setInterval(function () {
    tiempoRestante -= 1;
    tiempoSpan.textContent = tiempoRestante;

    // Si se acabó el tiempo, cuenta como respuesta incorrecta
    if (tiempoRestante <= 0) {
      responder(null);
    }
  }, 1000);
}

// Frena la cuenta regresiva
function detenerTemporizador() { 
  clearInterval(temporizador);
}

// Se ejecuta cuando el jugador clickea una categoría
function elegirCategoria(idCategoria) {
  preguntasActuales = preguntasPorCategoria[idCategoria];
  indice = 0; // arrancamos desde la primera pregunta

  // Habilita los botones de respuesta, ahora que ya hay una categoría elegida
  botonVerdadero.disabled = false;
  botonFalso.disabled = false;

  // Deshabilita las categorías para que no se pueda cambiar a mitad de partida
  botonesCategorias.forEach((boton) => {
    boton.disabled = true;
  });

  mostrarPregunta();
}

// Muestra en pantalla la pregunta actual según el índice
function mostrarPregunta() {
  const preguntaActual = preguntasActuales[indice];
  elementoPregunta.textContent = preguntaActual.texto;
  numeroPreguntaSpan.textContent = indice + 1;
    // Cada vez que aparece una pregunta, arranca el tiempo
  iniciarTemporizador(); 
}

// Se ejecuta cuando el jugador clickea Verdadero o Falso
function responder(eleccionUsuario) {
    detenerTemporizador();
  const preguntaActual = preguntasActuales[indice];

  // Suma punto o error según si acertó o no
  if (eleccionUsuario === preguntaActual.correcta) {
    puntos += 1;
  } else {
    errores += 1;
  }

  // Actualiza el puntaje visible en pantalla
  puntosSpan.textContent = puntos;
  erroresSpan.textContent = errores;

  avanzar();
}
// Guarda el mejor puntaje de la trivia, solo si supera al anterior
function guardarRecordTrivia() { 
  const recordAnterior = Number(localStorage.getItem("recordTrivia")) || 0;

  if (puntos > recordAnterior) {
    localStorage.setItem("recordTrivia", puntos);
    localStorage.setItem("recordTriviaNombre", localStorage.getItem("nombre"));
  }
}

// Decide si la partida termina (por errores o por completar las 10 preguntas) o si pasa a la siguiente
function avanzar() {
  // Si ya llegó a 3 errores, termina la partida
  if (errores >= 3) {
    elementoPregunta.textContent = "¡Partida terminada! Llegaste a 3 errores.";
    botonVerdadero.disabled = true;
    botonFalso.disabled = true;
    guardarRecordTrivia();
    return;
  }

  indice += 1;

  // Si ya respondió las 10 preguntas, ganó
  if (indice >= preguntasActuales.length) {
    elementoPregunta.textContent = "¡Ganaste la partida! Completaste las 10 preguntas.";
    botonVerdadero.disabled = true;
    botonFalso.disabled = true;
    guardarRecordTrivia(); 
    return;
  }

  mostrarPregunta();
}

// Vuelve el juego al estado inicial
function reiniciarTrivia() {
   // Frena el tiempo y vuelve a mostrar los 10 segundos
  detenerTemporizador(); 
  tiempoSpan.textContent = TIEMPO_POR_PREGUNTA; 
  puntos = 0;
  errores = 0;
  indice = 0;
  preguntasActuales = [];

  puntosSpan.textContent = puntos;
  erroresSpan.textContent = errores;
  numeroPreguntaSpan.textContent = 1;
  elementoPregunta.textContent = "Elegí una categoría para comenzar";

  // Vuelven a deshabilitarse hasta que se elija una categoría de nuevo
  botonVerdadero.disabled = true;
  botonFalso.disabled = true;

  // Vuelve a habilitar las categorías para poder elegir de nuevo
  botonesCategorias.forEach((boton) => {
    boton.disabled = false;
  });
}

traerCategorias();

botonVerdadero.addEventListener("click", () => responder(true));
botonFalso.addEventListener("click", () => responder(false));
botonReiniciarTrivia.addEventListener("click", reiniciarTrivia);


// PREGUNTAS


const preguntasArte = [
  { texto: "Leonardo Da Vinci pintó la Mona Lisa.", correcta: true },
  { texto: "Pablo Picasso fue un escultor, pero nunca pintó cuadros.", correcta: false },
  { texto: "La Capilla Sixtina fue pintada por Miguel Ángel.", correcta: true },
  { texto: "Vincent van Gogh vendió cientos de cuadros en vida.", correcta: false },
  { texto: "\"La noche estrellada\" es una obra de Van Gogh.", correcta: true },
  { texto: "Salvador Dalí perteneció al movimiento surrealista.", correcta: true },
  { texto: "El museo del Louvre está en Londres.", correcta: false },
  { texto: "Frida Kahlo era mexicana.", correcta: true },
  { texto: "El impresionismo nació en Alemania.", correcta: false },
  { texto: "\"El grito\" fue pintado por Edvard Munch.", correcta: true },
];

const preguntasCine = [
  { texto: "\"Titanic\" fue dirigida por James Cameron.", correcta: true },
  { texto: "Walt Disney nunca ganó un premio Óscar.", correcta: false },
  { texto: "\"El Padrino\" está basada en una novela.", correcta: true },
  { texto: "Charles Chaplin actuaba en películas mudas.", correcta: true },
  { texto: "\"Star Wars\" se estrenó por primera vez en los años 90.", correcta: false },
  { texto: "Pixar hizo la película \"Toy Story\".", correcta: true },
  { texto: "Alfred Hitchcock era conocido por películas de suspenso.", correcta: true },
  { texto: "\"El Rey León\" es una película de Universal Studios.", correcta: false },
  { texto: "Marilyn Monroe fue una actriz famosa de Hollywood.", correcta: true },
  { texto: "Los hermanos Lumière inventaron el cine sonoro.", correcta: false },
];

const preguntasMusica = [
  { texto: "Mozart fue un compositor del período clásico.", correcta: true },
  { texto: "Los Beatles eran un grupo de España.", correcta: false },
  { texto: "Beethoven compuso música aun después de quedarse sordo.", correcta: true },
  { texto: "El piano tiene cuerdas en su interior.", correcta: true },
  { texto: "El tango es un género originario de Brasil.", correcta: false },
  { texto: "Freddie Mercury fue el cantante de Queen.", correcta: true },
  { texto: "La guitarra eléctrica existe desde la Edad Media.", correcta: false },
  { texto: "Elvis Presley es conocido como el \"Rey del Rock\".", correcta: true },
  { texto: "Un violín tiene 6 cuerdas.", correcta: false },
  { texto: "Michael Jackson fue apodado el \"Rey del Pop\".", correcta: true },
];

// Relaciona el ID de categoría con su lista de preguntas correspondiente
const preguntasPorCategoria = {
  25: preguntasArte,
  11: preguntasCine,
  12: preguntasMusica
};