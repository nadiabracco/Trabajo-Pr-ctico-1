# Trabajo Practico 1
Nombre del proyecto:Wonderland Juegos
Integrantes: Ayelen Juarez y Nadia Bracco.
Datos de la materia:
Materia: Informática General
Institución: UNA (Universidad Nacional de las Artes)
Trabajo Práctico: N° 1
Año: 2026
Descripción general del sitio
El sitio es un juego multi-página con temática de Alicia en el país de las maravillas, donde l@s jugador@s recorren distintas secciones a modo de "portales"como juego de cartas, juego de dados y una sección de trivias. El sitio lleva registro del puntaje de cada jugador y lo muestra en una tabla de posiciones.
Al ingresar, se le pide el nombre al jugadora mediante un prompt, que queda guardado durante la sesión y se muestra en distintas pantallas del sitio.
Descripción y reglas de cada juego:
Organización de archivos y carpetas:
Tecnologías utilizadas:
Descripción de las principales funcionalidades:
-Al cargar cualquier página el  formnombre.js, se solicita el nombre mediante prompt(). La validación:
-Si el usurio cancela (null) o deja el campo vacío (""), se rechaza.
-Si el usuario ingresa  un valor numérico también se rechaza, usando isNaN().
-Se vuelve a repetir la solicitud en un bucle con while hasta que ingresen un valor válido.
-Guarda el nombre validado en localStorage para que persista entre páginas del sitio.
-Muestra el nombre en pantalla mediante innerText.

Cartas:
Reglas: 
-Dos jugadores compiten para ser el primero en lograr 3 puntos formando pares. 
-Se juega con una baraja española de 40 cartas. Al inicio de cada ronda se mezclan las cartas y cada jugador recibe 2 cartas.   
-Si alguno hace un par, gana 1 punto y la ronda termina. 
-Si no se forma par, cada jugador descarta una carta y roba otra.
-Si se agota el mazo, se mezclan las cartas descartadas para seguir.  
-Si ambos alcanzan 3 puntos en la misma ronda,se juega un desempate.

Descripción de las principales funcionalidades:
-El archivo cartas.js genera el mazo de 40 cartas mediante dos bucles for anidados: uno recorre los 4 palos (oros, copas, espadas, bastos) y el otro las posiciones de un array numeros = [1,2,3,4,5,6,7,10,11,12] (para respetar la numeración real de la baraja española, sin 8 ni 9), creando un objeto {palo, numero} por cada carta.
-El mazo se mezcla con un bucle que, en cada repetición, genera una posición aleatoria con Math.random(), extrae esa carta del mazo original con splice() y la agrega al nuevo array mazoMezclado, hasta vaciar el mazo original.
-Se declaran las variables del juego (puntosJugador1, puntosJugador2, manoJugador1, manoJugador2, mazoMezclado y descartes) fuera de las funciones, para que todas puedan acceder a ellas.
-Se reparten 4 cartas del mazo mezclado: las 2 primeras se asignan a manoJugador1 (participante) y las 2 siguientes a manoJugador2 (la Reina Roja), quitándolas del mazo con splice() a medida que se reparten.
-Se selecciona el contenedor <div id="mesaDeJuego"> con document.querySelector(), donde se van a mostrar las cartas e imágenes del juego.
-jugarPartida() agrupa la generación del mazo, la mezcla, el reparto y llama a jugarRonda() para arrancar el juego; se ejecuta al cargar la página y cada vez que se hace clic en el botón #botonNuevaRonda.
-mostrarCartas() vacía y vuelve a dibujar las 4 cartas en pantalla (con los botones de descarte del Jugador 1); se llama desde jugarPartida(), elJugadorDescarta() y turnoReinaRoja(), para que la imagen se actualice cada vez que cambian las cartas.
-jugarRonda() comprueba si el juego ya terminó (algún jugador con 3 puntos), si el mazo se agotó (recicla descartes) y si el Jugador 1 tiene par; si no tiene par, conecta 2 botones (uno por carta) con addEventListener y se detiene con return, esperando el clic del jugador.
-elJugadorDescarta(cartaATirar) se ejecuta al hacer clic en un botón: descarta la carta elegida, roba una nueva del mazoMezclado, comprueba si ahora hay par, y llama a turnoReinaRoja().
-turnoReinaRoja() juega el turno automático de la computadora (descarta y roba si no tiene par) y llama de nuevo a jugarRonda() para continuar con la siguiente ronda, hasta que algún jugador llegue a 3 puntos.
-Al detectar que el juego terminó, se muestra por consola quién ganó, usando el nombre real del jugador (traído con localStorage.getItem('nombre')) o "la Reina Roja" si ganó la computadora.
-Se agrega el contenedor <div id="puntajeCartas">, ubicado antes de mesaDeJuego en el HTML, para mostrar el puntaje en pantalla.
-mostrarPuntaje() arma un texto con el nombre real del jugador (localStorage) y ambos puntajes (puntosJugador1 y puntosJugador2), y lo asigna a puntajeCartas.innerHTML; se llama junto a mostrarCartas() en jugarPartida(), elJugadorDescarta() y turnoReinaRoja(), siempre antes de jugarRonda(), para que el marcador se actualice en tiempo real con cada ronda.