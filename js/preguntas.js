
// CONFIGURACIÓN

const endpoint = "https://opentdb.com/api_category.php"; // guarda la URL de la API que da la lista de categorías

const traduccionCategorias = { // diccionario: nombre en inglés → traducción en español
  "Art": "Arte",
  "Entertainment: Film": "Cine",
  "Entertainment: Music": "Música"
};

const idsElegidos = [25, 11, 12]; // array con los IDs de las 3 categorías que vamos a usar

const TIEMPO_POR_PREGUNTA = 10; // valor fijo: le dice al código a qué número volver cada vez que se resetea el reloj

const contenedorCategorias = document.querySelector("#categorias"); // agarra el <div> del HTML donde van a aparecer los botones de 
// categoría, y después usamos .append() para ir metiendo cada botón adentro de esa caja, es lo que se ve
let botonesCategorias = []; // array vacío donde vamos a ir guardando cada botón de categoría a medida que se crean

const elementoPregunta = document.querySelector("#pregunta-texto"); // agarra el <p> donde se muestra el texto de la pregunta
const botonVerdadero = document.querySelector("#btn-verdadero"); // agarra el botón "Verdadero"
const botonFalso = document.querySelector("#btn-falso"); // agarra el botón "Falso"
const numeroPreguntaSpan = document.querySelector("#numero-pregunta"); // agarra el <span> que muestra en qué número de pregunta vamos

const puntosSpan = document.querySelector("#puntos"); // agarra el <span> que muestra los puntos
const erroresSpan = document.querySelector("#errores"); // agarra el <span> que muestra los errores

const tiempoSpan = document.querySelector("#tiempo"); // agarra el <span> que muestra los segundos restantes

const botonReiniciarTrivia = document.querySelector("#reiniciar-trivia"); // agarra el botón "Reiniciar"

let preguntasActuales = []; // array que va a guardar las 10 preguntas de la categoría que se elija

let indice = 0; // en qué pregunta vamos ahora mismo (arranca en la primera, posición 0 del array)

let puntos = 0; // contador de respuestas correctas
let errores = 0; // contador de respuestas incorrectas

let tiempoRestante = TIEMPO_POR_PREGUNTA; // cuántos segundos quedan en la pregunta actual (arranca en 10, copiando el valor fijo)
let temporizador = null; // por ahora no hay ningún reloj corriendo (se completa recién cuando arranca una pregunta)


// LÓGICA PRINCIPAL

// Función para traer las categorías desde la API
// "async" le dice a JS que esta función va a esperar datos de internet
async function traerCategorias() {

  try { // "intentá" ejecutar este bloque; si algo falla, no rompas la página, anotá el error en el catch de abajo
  
  const respuesta = await fetch(endpoint);  // le pide los datos a la API (endpoint) y "await" = esperá a que fetch termine de traer la respuesta antes de seguir 

    if (!respuesta.ok) { //"si la respuesta NO salió bien"
      throw new Error(`HTTP ${respuesta.status}`); // "throw" = lanzar un error, El new error crea un error en mensaje ej respuesta.status:404
    }

    const datos = await respuesta.json(); // "respuesta" es la respuesta q llegó de la API, no se puede usar directamente,.json() la convierte en un objeto de js que podemos leer y usar (con sus propiedades, como trivia_categories)
    const todasLasCategorias = datos.trivia_categories; // guarda el array completo con las 24 categorías

    // Armamos a mano el array de categorías elegidas, recorriendo todasLasCategorias con un for clásico
    let categoriasElegidas = []; // array vacío, donde vamos a ir guardando las categorías que coincidan

    for (let i = 0; i < todasLasCategorias.length; i++) { // recorre las 24 categorías, una por una, usando "i" como contador
      let categoria = todasLasCategorias[i]; // guarda en "categoria" la categoría actual del recorrido

      if (idsElegidos.includes(categoria.id)) { // si el id de esta categoría está en nuestro array idsElegidos
        categoriasElegidas.push(categoria); // la agregamos al array de resultado
      }
    }

    categoriasElegidas.forEach((categoria) => { // recorre cada una de las 3 categorías elegidas
      const boton = document.createElement("button"); // crea un botón nuevo, vacío, desde cero
      boton.type = "button"; // le dice que es un botón común (no de formulario)
      boton.textContent = traduccionCategorias[categoria.name]; // le pone como texto la traducción al español
      boton.addEventListener("click", () => elegirCategoria(categoria.id)); // cuando lo clickeen, ejecuta elegirCategoria con su id
      contenedorCategorias.append(boton); // agrega (mete) el botón recién creado dentro del <div> de categorías
      botonesCategorias.push(boton); // guarda el botón en el array, para poder deshabilitarlo más adelante
    });

  } catch (error) { // "catch" = acá cae el código SI algo falló en el try (sin internet, error de la API, el throw de arriba, etc.)
    console.log("Hubo un error al traer las categorías:", error); // muestra el error en la consola, para poder detectarlo
  }
}

function iniciarTemporizador() { // función que arranca la cuenta regresiva de una pregunta
  detenerTemporizador(); // primero frena cualquier cuenta regresiva anterior que pudiera seguir corriendo
  tiempoRestante = TIEMPO_POR_PREGUNTA; // resetea el tiempo restante, volviendo a copiar el valor fijo (10)
  tiempoSpan.textContent = tiempoRestante; // muestra ese 10 en pantalla

  temporizador = setInterval(function () { // arranca un reloj que ejecuta esta función cada 1000ms (1 segundo), y guarda su identificador
    tiempoRestante -= 1; // resta 1 segundo al tiempo restante
    tiempoSpan.textContent = tiempoRestante; // actualiza el número visible en pantalla

    if (tiempoRestante <= 0) { // si ya se llegó a 0 (o menos)
      responder(null); // llama a responder() con "null", como si el jugador no hubiera elegido nada (cuenta como error)
    }
  }, 1000); // el 1000 significa "cada 1000 milisegundos", o sea, cada 1 segundo
}

function detenerTemporizador() { // función que frena la cuenta regresiva
  clearInterval(temporizador); // detiene el reloj que esté corriendo, usando el identificador guardado en "temporizador"
}

function elegirCategoria(idCategoria) { // se ejecuta cuando el jugador clickea un botón de categoría
  preguntasActuales = preguntasPorCategoria[idCategoria]; // busca y guarda el array de preguntas de esa categoría puntual

  indice = 0; // arranca desde la primera pregunta de ese array

  botonVerdadero.disabled = false; // habilita el botón "Verdadero"
  botonFalso.disabled = false; // habilita el botón "Falso"

  botonesCategorias.forEach((boton) => { // recorre todos los botones de categoría guardados en el array
    boton.disabled = true; // y los deshabilita, para que no se pueda cambiar de categoría a mitad de partida
  });

  mostrarPregunta(); // muestra en pantalla la primera pregunta de la categoría recién elegida
}

function mostrarPregunta() { // función que pone en pantalla la pregunta actual
  const preguntaActual = preguntasActuales[indice]; // agarra, del array, la pregunta que corresponde al índice actual

  elementoPregunta.textContent = preguntaActual.texto; // muestra el texto de esa pregunta en pantalla
  numeroPreguntaSpan.textContent = indice + 1; // muestra el número de pregunta (+1 porque el índice arranca en 0, no en 1)

  iniciarTemporizador(); // arranca el reloj de 10 segundos para esta nueva pregunta
}

function responder(eleccionUsuario) { // se ejecuta cuando el jugador clickea Verdadero, Falso, o se acaba el tiempo
  detenerTemporizador(); // frena el reloj, ya sea porque respondió o porque se acabó el tiempo

  const preguntaActual = preguntasActuales[indice]; // agarra la pregunta actual, para comparar contra la respuesta correcta

  if (eleccionUsuario === preguntaActual.correcta) { // si lo que eligió el jugador coincide con la respuesta correcta
    puntos += 1; // suma 1 punto
  } else { // si no coincide (o si eleccionUsuario era null, por tiempo agotado)
    errores += 1; // suma 1 error
  }

  puntosSpan.textContent = puntos; // actualiza los puntos visibles en pantalla
  erroresSpan.textContent = errores; // actualiza los errores visibles en pantalla

  avanzar(); // decide qué pasa a continuación (siguiente pregunta, o fin de partida)
}

function guardarRecordTrivia() { // función que guarda el mejor puntaje en localStorage
  const recordAnterior = Number(localStorage.getItem("recordTrivia")) || 0; // busca el récord guardado anteriormente (o 0 si todavía no hay ninguno)

  if (puntos > recordAnterior) { // si el puntaje de esta partida es mejor que el récord anterior
    localStorage.setItem("recordTrivia", puntos); // guarda este nuevo puntaje como récord
    localStorage.setItem("recordTriviaNombre", localStorage.getItem("nombre")); // guarda también el nombre del jugador que lo logró
  }
}

function avanzar() { // función que decide si la partida sigue, termina por errores, o termina por victoria
  if (errores >= 3) { // si ya se llegó a 3 errores o más
    elementoPregunta.textContent = "¡Partida terminada! Llegaste a 3 errores."; // muestra el mensaje de derrota
    botonVerdadero.disabled = true; // deshabilita el botón Verdadero
    botonFalso.disabled = true; // deshabilita el botón Falso
    guardarRecordTrivia(); // guarda el puntaje final, por si resultó ser un nuevo récord
    return; // corta la función acá, no ejecuta nada más abajo
  }

  indice += 1; // si no hubo 3 errores, avanza al índice de la siguiente pregunta

  if (indice >= preguntasActuales.length) { // si el índice ya superó la cantidad de preguntas que había (o sea, se acabaron)
    elementoPregunta.textContent = "¡Ganaste la partida! Completaste las 10 preguntas."; // muestra el mensaje de victoria
    botonVerdadero.disabled = true; // deshabilita el botón Verdadero
    botonFalso.disabled = true; // deshabilita el botón Falso
    guardarRecordTrivia(); // guarda el puntaje final, por si resultó ser un nuevo récord
    return; // corta la función acá
  }

  mostrarPregunta(); // si no terminó por ninguna de las dos razones, muestra la siguiente pregunta
}

function reiniciarTrivia() { // función que vuelve todo el juego al estado inicial
  detenerTemporizador(); // frena cualquier cuenta regresiva que esté corriendo
  tiempoSpan.textContent = TIEMPO_POR_PREGUNTA; // vuelve a mostrar 10 segundos en pantalla

  puntos = 0; // resetea los puntos a 0
  errores = 0; // resetea los errores a 0
  indice = 0; // vuelve al índice de la primera pregunta
  preguntasActuales = []; // vacía el array de preguntas de la partida anterior

  puntosSpan.textContent = puntos; // actualiza el 0 de puntos en pantalla
  erroresSpan.textContent = errores; // actualiza el 0 de errores en pantalla
  numeroPreguntaSpan.textContent = 1; // vuelve a mostrar "Pregunta 1"
  elementoPregunta.textContent = "Elegí una categoría para comenzar"; // vuelve a mostrar el mensaje inicial

  botonVerdadero.disabled = true; // deshabilita el botón Verdadero, hasta que se elija categoría de nuevo
  botonFalso.disabled = true; // deshabilita el botón Falso, hasta que se elija categoría de nuevo

  botonesCategorias.forEach((boton) => { // recorre todos los botones de categoría
    boton.disabled = false; // y los vuelve a habilitar, para poder elegir de nuevo
  });
}

traerCategorias(); // llama a la función, para que arranque a traer las categorías apenas carga la página

botonVerdadero.addEventListener("click", () => responder(true)); // cuando clickean "Verdadero", llama a responder(true)
botonFalso.addEventListener("click", () => responder(false)); // cuando clickean "Falso", llama a responder(false)
botonReiniciarTrivia.addEventListener("click", reiniciarTrivia); // cuando clickean "Reiniciar", llama a reiniciarTrivia()


// PREGUNTAS


const preguntasArte = [ // array con las 10 preguntas de la categoría Arte
  { texto: "Leonardo Da Vinci pintó la Mona Lisa.", correcta: true }, // cada pregunta es un objeto: texto + si es verdadera o falsa
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

const preguntasCine = [ // array con las 10 preguntas de la categoría Cine
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

const preguntasMusica = [ // array con las 10 preguntas de la categoría Música
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

const preguntasPorCategoria = { // objeto que relaciona cada ID de categoría con su array de preguntas correspondiente
  25: preguntasArte, // si el id es 25, usar el array preguntasArte
  11: preguntasCine, // si el id es 11, usar el array preguntasCine
  12: preguntasMusica // si el id es 12, usar el array preguntasMusica
};