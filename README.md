# Trabajo Practico 1
Nombre del proyecto:Wonderland Juegos
Integrantes: Ayelen Juarez y Nadia Bracco.
Datos de la materia:
Materia: Informática General
Institución: UNA (Universidad Nacional de las Artes)
Trabajo Práctico: N° 1
Año: 2026

Descripción general del sitio:
El sitio es un juego multipágina con temática de Alicia en el país de las maravillas. Los jugadores recorren distintas secciones a modo de "portales": juego de cartas, juego de dados y una sección de trivia. El sitio lleva el registro del puntaje de cada jugador y lo muestra en una tabla de posiciones.
Al ingresar se le pide el nombre al jugador mediante un prompt(). El nombre se guarda en el navegador y se muestra en distintas pantallas del sitio.

Descripción y reglas de cada juego:
Juego de cartas
El jugador compite contra la Reina Roja (controlada por el programa) para ser el primero en lograr 3 puntos formando pares.
Se juega con una baraja española de 40 cartas (oros, copas, espadas y bastos; numeradas del 1 al 7 y del 10 al 12).
Al inicio de cada partida se mezclan las cartas y cada jugador recibe 2 cartas.
Si alguno forma un par (dos cartas con el mismo número), gana 1 punto, descarta el par y roba 2 cartas nuevas.
Si no hay par, cada jugador descarta una carta y roba otra. El jugador elige cuál descartar con los botones; la Reina Roja descarta automáticamente.
Si se agota el mazo, se mezclan las cartas descartadas para seguir.
Si ambos alcanzan 3 puntos en la misma ronda, se juega un desempate: gana el primero que saque ventaja de puntos.
Al terminar, se muestra en pantalla quién ganó. Si gana el jugador y supera el récord anterior, se guarda su récord.

Juego de dados
El jugador compite contra la computadora. En cada tirada, ambos lanzan un dado a la vez.
Objetivo: ser el primero en llegar a 20 puntos.
Puntaje: si el dado sale par, suma el valor del dado (2, 4 o 6). Si sale impar, resta 1 punto. El puntaje nunca baja de 0.
Final: gana el primero que llegue a 20 puntos.
Empate: si ambos llegan a 20 en la misma tirada, se hace una tirada extra de desempate: gana quien saque el número más alto. Si vuelven a empatar, se tira de nuevo.
Racha: se cuenta cuántos pares seguidos saca el jugador. Un impar corta la racha. La mejor racha se guarda como récord.
Nueva partida: el botón "Reiniciar" resetea puntajes, racha y dados.

Juego de trivia
Trivia de verdadero o falso, con tres categorías a elegir.
Categorías: Arte, Cine y Música.
Preguntas: cada categoría tiene 10 afirmaciones. El jugador responde Verdadero o Falso.
Tiempo: el jugador tiene 10 segundos para responder cada pregunta. Si se acaba el tiempo sin responder, cuenta como respuesta incorrecta.
Puntaje: cada respuesta correcta suma 1 punto y cada respuesta incorrecta suma 1 error.
Pierde: si llega a 3 errores, la partida termina.
Gana: si responde las 10 preguntas sin llegar a 3 errores.
Récord: al terminar la partida (se gane o se pierda), si el puntaje supera el récord guardado, se actualiza y se muestra en la tabla de posiciones con el nombre del jugador.
Nueva partida: el botón "Reiniciar" vuelve todo al estado inicial (incluido el tiempo) y permite elegir otra categoría.

Organización de archivos y carpetas:

Tecnologías utilizadas:
HTML: estructura de las páginas.
CSS: diseño y estilos.
JavaScript: lógica de los juegos y manipulación del DOM.
localStorage: persistencia del nombre del jugador y de los récords.
Google Fonts (familia Alice): tipografía.
API pública (Open Trivia Database): preguntas de la trivia.
Git y GitHub: trabajo colaborativo.

API utilizada
API: Open Trivia Database
Endpoint: https://opentdb.com/api_category.php
Qué datos se usan: la lista de categorías (trivia_categories, con id y name). De esa lista el sitio se queda con tres categorías (ids 25 = Arte, 11 = Cine, 12 = Música) y crea un botón por cada una.
Cómo se consume: con fetch() dentro de una función async y await. Se controla respuesta.ok y se convierte la respuesta con .json().
Manejo de errores: un bloque try/catch captura los errores de red o de la respuesta (por ejemplo, un HTTP distinto de 200) y los muestra por consola.
Qué no se toma de la API: los nombres de las categorías vienen en inglés, por lo que se traducen con un diccionario propio. Las preguntas también son propias, escritas en español por el grupo.

Descripción de las principales funcionalidades:
Al cargar cualquier página se solicita el nombre con prompt().
Si el usuario cancela (null) o deja el campo vacío (""), se rechaza.
Si ingresa un valor numérico, también se rechaza (se controla con isNaN()).
La solicitud se repite en un bucle while hasta que el valor sea válido.
El nombre validado se guarda en localStorage para que persista entre páginas.
Se muestra en pantalla mediante innerText.

*Juego de cartas (cartas.js)
Generación y mezcla del mazo
El mazo de 40 cartas se genera con dos bucles for anidados: uno recorre los 4 palos y el otro un array numeros = [1,2,3,4,5,6,7,10,11,12], para respetar la numeración real de la baraja española (sin 8 ni 9). Cada carta es un objeto {palo, numero}.
Se mezcla con un bucle que, en cada repetición, genera una posición aleatoria con Math.random(), extrae esa carta con splice() y la agrega a mazoMezclado, hasta vaciar el mazo original.

Variables globales
puntosJugador1, puntosJugador2, manoJugador1, manoJugador2, mazoMezclado, descartes, esperandoDescarte y enDesempate se declaran fuera de las funciones para que todas puedan acceder a ellas.

Funciones principales
jugarPartida(): agrupa la generación del mazo, la mezcla y el reparto, y llama a jugarRonda(). Se ejecuta al cargar la página y al hacer clic en #botonNuevaRonda. Resetea puntos, manos, descartes, mensaje final y enDesempate para que una partida no afecte a la siguiente.
reciclarMazo(): si mazoMezclado quedó vacío, pasa las cartas de descartes al mazo en orden aleatorio.
robarCarta(): llama a reciclarMazo() y saca la primera carta con shift(). Al concentrar el robo en una sola función se evita repetir código y nunca se intenta robar de un mazo vacío.
mostrarCartas(): arma todo el HTML en una variable y lo asigna una sola vez a mesaDeJuego.innerHTML. Dibuja la sección del jugador (con su nombre como título) y la de la Reina Roja; las cartas van en <div class="mano"> y <div class="carta">. Según esperandoDescarte, cada botón de descarte se arma con o sin el atributo disabled. También dibuja el botón "Nueva Ronda" y le conecta el clic, porque se vuelve a crear cada vez que se dibuja la mesa.
jugarRonda(): comprueba si el juego terminó o si ambos llegaron a 3 puntos (activa enDesempate = true). Si el Jugador 1 tiene par, suma el punto, manda el par a descartes y roba 2 cartas. Si no, activa esperandoDescarte, actualiza la pantalla, conecta un botón por carta con addEventListener y se detiene con return hasta que el jugador haga clic.
elJugadorDescarta(cartaATirar): manda la carta elegida a descartes, roba una nueva, comprueba si ahora hay par, desactiva esperandoDescarte y llama a turnoReinaRoja().
turnoReinaRoja(): turno automático de la Reina Roja. Si tiene par, suma el punto, renueva la mano y comprueba la victoria por desempate. Si no, descarta su primera carta y roba una. Al final vuelve a llamar a jugarRonda().
mostrarPuntaje(): arma un texto con el nombre real del jugador y ambos puntajes, y lo asigna a #puntajeCartas. Se llama junto a mostrarCartas() para actualizar el marcador en tiempo real.

Interfaz
Las cartas se muestran como imágenes dentro de <div id="mesaDeJuego">, seleccionado con document.querySelector().
El puntaje se muestra en <div id="puntajeCartas">, ubicado antes de mesaDeJuego.
El resultado final se muestra en #mensajeFinal (y por consola), con el nombre del jugador (localStorage.getItem('nombre')) o "la Reina Roja".

Récords
Cuando gana el jugador y supera el récord anterior, se guarda en localStorage con las claves recordCartas y recordCartasNombre. tabla.js los lee y los muestra en tabla.html.

*Juego de dados
Elementos de la página (capturados con document.querySelector()): #tirar, #reiniciar, #puntajes, #dado-usuario y #dado-computadora.

Variables globales: puntajeUsuario, puntajeComputadora, enDesempate, rachaActual y mejorRacha.

Funciones principales
tirarDado(): genera un número del 1 al 6 para el usuario y otro para la computadora con Math.floor(Math.random() * 6) + 1, y cambia el src y el alt de las imágenes (imagenes/dado1.jpg a dado6.jpg) con template strings.
Si enDesempate es true, compara los dos dados: gana el más alto, o avisa que hay otro empate para volver a tirar. Después corta con return, sin pasar por la lógica normal de puntaje.
Si no, aplica la regla de par/impar a cada jugador. Para el usuario, un par suma el dado y aumenta rachaActual (actualizando mejorRacha). Un impar resta 1 y reinicia la racha. Si el puntaje queda negativo, se corrige a 0.
Actualiza el marcador en #puntajes con innerText y verifica si alguien llegó a 20 puntos (>= 20). Si ambos llegaron, activa enDesempate. Si uno gana, lo avisa con alert() y deshabilita el botón "Tirar".
reiniciarJuego(): vuelve puntajes, racha, enDesempate y dados a su estado inicial y reactiva el botón "Tirar".

Eventos: addEventListener("click", ...) en los botones "Tirar" y "Reiniciar".
Récord: cada vez que la racha de pares de la partida supera el récord guardado, se actualizan en localStorage las claves recordRachaDados y recordRachaDadosNombre (este último con el nombre del jugador).

*Trivia
Configuración inicial
endpoint: URL de la API de categorías.
traduccionCategorias: objeto que traduce los nombres de la API al español ("Art" → "Arte", "Entertainment: Film" → "Cine", "Entertainment: Music" → "Música").
idsElegidos = [25, 11, 12]: ids de las categorías que se usan.
Variables de estado: preguntasActuales, indice, puntos y errores.
Elementos del DOM capturados con document.querySelector(): contenedor de categorías, texto y número de la pregunta, botones de verdadero y falso, contadores y botón de reinicio.
TIEMPO_POR_PREGUNTA = 10: segundos que tiene el jugador para responder cada pregunta.
Variables de estado: preguntasActuales, indice, puntos, errores, tiempoRestante y temporizador (guarda el id del setInterval para poder frenarlo).
Elemento del DOM extra: #tiempo, donde se muestra la cuenta regresiva.

Preguntas
Están en tres arrays de objetos (preguntasArte, preguntasCine, preguntasMusica), con la forma { texto, correcta }, donde correcta es true o false.
El objeto preguntasPorCategoria relaciona el id de cada categoría con su array.

Funciones principales
traerCategorias(): pide las categorías a la API con fetch, las filtra con filter() y includes() para quedarse con las 3 elegidas, y crea un botón por cada una con document.createElement(), textContent y append().
iniciarTemporizador(): frena cualquier temporizador anterior, reinicia tiempoRestante a 10 y usa setInterval() para restar 1 cada segundo y actualizar #tiempo. Si llega a 0, llama a responder(null), que cuenta como error porque null no coincide ni con true ni con false.
detenerTemporizador(): frena la cuenta regresiva con clearInterval().
elegirCategoria(idCategoria): carga en preguntasActuales el array de esa categoría, pone indice en 0, habilita los botones de respuesta y llama a mostrarPregunta().
mostrarPregunta(): muestra en pantalla el texto de la pregunta actual y su número (indice + 1), y llama a iniciarTemporizador() para que el tiempo arranque con cada pregunta.
responder(eleccionUsuario): frena el temporizador, compara la respuesta (true o false) con correcta, suma un punto o un error, actualiza los contadores en pantalla y llama a avanzar().
guardarRecordTrivia(): compara los puntos de la partida con recordTrivia en localStorage. Si los supera, guarda el nuevo puntaje (recordTrivia) y el nombre del jugador (recordTriviaNombre).
avanzar(): si el jugador llegó a 3 errores, termina la partida. Si no, pasa a la siguiente pregunta, y si ya respondió las 10, gana. En ambos finales deshabilita los botones de respuesta y llama a guardarRecordTrivia().
reiniciarTrivia(): frena el temporizador y vuelve a mostrar 10 en #tiempo, pone los contadores y el índice en 0, vacía las preguntas, restaura el mensaje inicial y vuelve a deshabilitar los botones de respuesta hasta que se elija una categoría.

Eventos: los botones "Verdadero" y "Falso" llaman a responder(true) y responder(false), y el botón de reinicio a reiniciarTrivia().

/Tabla de posiciones (tabla.html / tabla.js)
Cartas:
- Partidas ganadas por el jugador y por la Reina Roja (victoriasJugador y victoriasReina, leídas de localStorage).
- Ranking de mejores rachas de victorias seguidas, con una entrada por jugador (nombre: racha). El ranking se guarda en localStorage como un array de objetos en formato JSON (rankingCartas) y se recorre con un bucle for para armar la lista. Si todavía no hay partidas ganadas, se muestra un mensaje.
Dados:
- Mejor racha de pares seguidos (recordRachaDados), con el nombre de quien la logró (recordRachaDadosNombre).
Trivia:
- Mejor puntaje de la trivia (recordTrivia), con el nombre de quien lo logró (recordTriviaNombre).
En los tres juegos, si todavía no hay récord, se muestra un mensaje en lugar del dato.

Principales decisiones técnicas
Jugador vs. Reina Roja: en lugar de dos jugadores humanos, para reforzar la temática y evitar compartir pantalla.
Funciones separadas en cartas: se reemplazó un while automático por funciones (jugarRonda, elJugadorDescarta, turnoReinaRoja) para que el jugador elija qué descartar con botones.
Un solo punto de robo (robarCarta): evita repetir código y garantiza que nunca se robe de un mazo vacío.
Los pares van a descartes y no se eliminan: así se conservan siempre las 40 cartas entre mazo y descartes.
>= 3 en lugar de === 3: en el desempate un jugador puede pasar de 3 puntos antes de que se revise el marcador.
Desempate por ventaja de puntos: una vez activado enDesempate, se compara puntosJugador1 con puntosJugador2 cada vez que alguien hace par.
Variables globales de estado (esperandoDescarte, enDesempate): para controlar los botones de descarte y el desempate entre funciones.
Render con una sola asignación a innerHTML: mostrarCartas() arma todo el HTML y lo asigna una vez, en lugar de agregar elementos de a uno.
localStorage para nombre y récords: como el sitio no tiene backend, los datos se guardan en el navegador (no se comparten entre dispositivos).
Dados: par suma, impar resta: la regla es simple y deja que el azar cambie rápido el marcador. El puntaje se limita a 0 para que no haya puntajes negativos.
Desempate de dados con una tirada extra: cuando enDesempate es true, tirarDado() hace return antes de la lógica de puntaje, para que la tirada extra no afecte los puntos.
Racha como récord de dados: se eligió la racha de pares seguidos (y no el puntaje) porque es una medida que no depende de contra quién se juega. Se guarda en localStorage y se muestra en la tabla de posiciones.
Imágenes de dados con nombres predecibles: (dado1.jpg a dado6.jpg) para que src se arme con el número que salió.
Trivia: preguntas propias de verdadero o falso: en lugar de pedirlas a la API, el grupo escribió 10 afirmaciones por categoría en español. Así se evita que lleguen preguntas en inglés y se controla que cada partida tenga la misma dificultad. La API aporta la lista de categorías.
Trivia: diccionario de traducción: como la API devuelve los nombres en inglés, se usa traduccionCategorias para mostrarlos en español.
Trivia: solo 3 categorías: se filtran con idsElegidos para que la trivia tenga suficientes preguntas propias y no resulte excesiva.
Trivia: partida corta con dos finales: se pierde con 3 errores y se gana al completar las 10 preguntas, para que cada partida sea breve y tenga un objetivo claro.
Trivia: botones deshabilitados hasta elegir categoría: disabled evita que se responda sin preguntas cargadas.
(Sumar decisiones de diseño y de organización del trabajo del grupo.)
Trivia: temporizador de 10 segundos por pregunta: agrega presión y hace que cada partida sea más dinámica. El tiempo agotado cuenta como error, así no se puede frenar el juego sin responder.
Trivia: un solo temporizador a la vez: iniciarTemporizador() llama primero a detenerTemporizador() para que nunca haya dos cuentas regresivas corriendo juntas.
Trivia: récord por puntaje: se guarda en localStorage y se muestra en la tabla de posiciones, igual que el resto de los juegos.
Cartas: ranking de rachas en JSON: como hay un récord por jugador, se guarda un array de objetos con JSON.stringify() y se lee con JSON.parse(), porque localStorage solo guarda texto.

Declaración de uso de Inteligencia Artificial
Durante el desarrollo del trabajo utilizamos Claude (Anthropic) como herramienta de asistencia y consulta.
A lo largo del desarrollo, utilizamos la herramienta principalmente para resolver dudas, consultar conceptos y orientarnos frente a distintos problemas que fueron surgiendo. En particular, nos resultó útil durante el desarrollo de JavaScript, tanto para comprender algunos conceptos como para organizar la lógica de los juegos y dividir problemas más complejos en partes más pequeñas.
Uno de los principales usos se dio cuando aparecían errores o comportamientos que no sabíamos cómo resolver. En esos casos, explicábamos a Claude el problema que estábamos teniendo para comprender cuál podía ser su causa y qué alternativas de solución existían. A partir de esas explicaciones, adaptábamos las propuestas a nuestro propio código, realizábamos modificaciones y verificábamos su funcionamiento.
También utilizamos la herramienta para consultar y repasar conceptos de CSS y JavaScript que no teníamos presentes, así como para comprender algunos aspectos relacionados con el uso de APIs y con la persistencia de datos mediante `localStorage`.
- Nos ayudó a detectar y comprender errores que aparecieron durante el desarrollo de los juegos.
- Nos orientó en la organización de la lógica de JavaScript y en la división de algunas funciones.
- Nos ayudó a comprender cómo utilizar `localStorage` para guardar y recuperar información.
- Nos permitió consultar y repasar conceptos de CSS, JavaScript y APIs.
/ Modificaciones, correcciones y decisiones tomadas por el grupo
Las reglas de los juegos, la temática del proyecto, el diseño y las decisiones sobre el funcionamiento de cada juego fueron definidas por el grupo.
Las respuestas y propuestas de Claude fueron utilizadas como orientación y fueron adaptadas, modificadas o descartadas según las necesidades del proyecto. También verificamos las soluciones propuestas y realizamos las correcciones necesarias para integrarlas al código que estábamos desarrollando.
De esta manera, utilizamos la IA como una herramienta de consulta, acompañamiento y orientación durante el proceso, manteniendo la responsabilidad sobre las decisiones, la implementación y la comprensión del código utilizado en la entrega.