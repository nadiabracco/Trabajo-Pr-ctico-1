// ==========================================
// CONFIGURACIÓN
// ==========================================

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

// Elemento donde van a aparecer los botones de categoría
const contenedorCategorias = document.querySelector("#categorias");

// Elementos de la pregunta y opciones
const elementoPregunta = document.querySelector("#pregunta-texto");
const botonVerdadero = document.querySelector("#btn-verdadero");
const botonFalso = document.querySelector("#btn-falso");
const numeroPreguntaSpan = document.querySelector("#numero-pregunta");

// Elementos de puntaje
const puntosSpan = document.querySelector("#puntos");
const erroresSpan = document.querySelector("#errores");

// Elemento del botón reiniciar
const botonReiniciarTrivia = document.querySelector("#reiniciar-trivia");

// Variable que va a guardar las preguntas de la partida actual
let preguntasActuales = [];

// Índice de la pregunta actual dentro de la lista
let indice = 0;

// Contadores de la partida
let puntos = 0;
let errores = 0;


// ==========================================
// LÓGICA PRINCIPAL
// ==========================================

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
    });

  } catch (error) {
    console.log("Hubo un error al traer las categorías:", error);
  }
}

// Se ejecuta cuando el jugador clickea una categoría
function elegirCategoria(idCategoria) {
  preguntasActuales = preguntasPorCategoria[idCategoria];
  indice = 0; // arrancamos desde la primera pregunta

  // Habilita los botones de respuesta, ahora que ya hay una categoría elegida
  botonVerdadero.disabled = false;
  botonFalso.disabled = false;

  mostrarPregunta();
}

// Muestra en pantalla la pregunta actual según el índice
function mostrarPregunta() {
  const preguntaActual = preguntasActuales[indice];
  elementoPregunta.textContent = preguntaActual.texto;
  numeroPreguntaSpan.textContent = indice + 1;
}

// Se ejecuta cuando el jugador clickea Verdadero o Falso
function responder(eleccionUsuario) {
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

// Decide si la partida termina (por errores o por completar las 10 preguntas) o si pasa a la siguiente
function avanzar() {
  // Si ya llegó a 3 errores, termina la partida
  if (errores >= 3) {
    elementoPregunta.textContent = "¡Partida terminada! Llegaste a 3 errores.";
    botonVerdadero.disabled = true;
    botonFalso.disabled = true;
    return;
  }

  indice += 1;

  // Si ya respondió las 10 preguntas, ganó
  if (indice >= preguntasActuales.length) {
    elementoPregunta.textContent = "¡Ganaste la partida! Completaste las 10 preguntas.";
    botonVerdadero.disabled = true;
    botonFalso.disabled = true;
    return;
  }

  mostrarPregunta();
}

// Vuelve el juego al estado inicial
function reiniciarTrivia() {
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
}

traerCategorias();

botonVerdadero.addEventListener("click", () => responder(true));
botonFalso.addEventListener("click", () => responder(false));
botonReiniciarTrivia.addEventListener("click", reiniciarTrivia);


// ==========================================
// PREGUNTAS
// ==========================================

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