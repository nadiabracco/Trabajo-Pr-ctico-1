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
-Se declaran las variables del juego (puntosJugador1, puntosJugador2, manoJugador1, manoJugador2, mazoMezclado, descartes, esperandoDescarte y enDesempate) fuera de las funciones, para que todas puedan acceder a ellas.
-Se reparten 4 cartas del mazo mezclado: las 2 primeras se asignan a manoJugador1 (participante) y las 2 siguientes a manoJugador2 (la Reina Roja), quitándolas del mazo con splice() a medida que se reparten.
-Se selecciona el contenedor <div id="mesaDeJuego"> con document.querySelector(), donde se van a mostrar las cartas e imágenes del juego.
-jugarPartida() agrupa la generación del mazo, la mezcla, el reparto y llama a jugarRonda() para arrancar el juego; se ejecuta al cargar la página y cada vez que se hace clic en el botón #botonNuevaRonda. También resetea puntos, manos, descartes, el mensaje final y enDesempate a false en cada partida nueva, para que una partida anterior no afecte a la siguiente.
-reciclarMazo() controla si el mazoMezclado quedó vacío y, en ese caso, pasa las cartas de descartes al mazo en orden aleatorio, para poder seguir jugando.
-robarCarta() es la función que se usa cada vez que alguien roba: primero llama a reciclarMazo() y después saca la primera carta del mazo con shift(). Al concentrar el robo en una sola función, se evita repetir código y se asegura que nunca se intente robar de un mazo vacío.
-mostrarCartas() arma todo el HTML en una variable y lo asigna una sola vez a mesaDeJuego.innerHTML. Dibuja dos secciones: la del jugador (con su nombre como título) y la de la Reina Roja. En cada una, las 2 cartas van dentro de un <div class="mano"> y cada carta dentro de un <div class="carta">, junto con su botón de descarte en el caso del jugador. Usando la variable esperandoDescarte, cada botón se arma con el atributo disabled cuando no le toca elegir al jugador, y sin ese atributo (activo) cuando sí le toca descartar. También dibuja el botón "Nueva Ronda" dentro de la sección de la Reina Roja y le conecta el clic, porque el botón se vuelve a crear cada vez que se dibuja la mesa. Se llama desde jugarPartida(), jugarRonda(), elJugadorDescarta() y turnoReinaRoja(), para que la imagen se actualice cada vez que cambian las cartas.
-jugarRonda() comprueba si el juego ya terminó (algún jugador con 3 puntos o más) o si ambos llegaron a 3 puntos en la misma ronda, en cuyo caso activa enDesempate = true y deja que el juego siga en lugar de cortar. Después comprueba si el Jugador 1 tiene par: si tiene par, suma el punto, manda las 2 cartas del par a descartes, roba 2 cartas nuevas con robarCarta() y, si está en desempate, chequea si ya sacó ventaja de puntos para declarar la victoria; si no tiene par, activa esperandoDescarte, actualiza la pantalla y conecta 2 botones (uno por carta) con addEventListener, deteniéndose con return hasta que el jugador haga clic.
-elJugadorDescarta(cartaATirar) se ejecuta al hacer clic en un botón: manda la carta elegida a descartes, roba una nueva con robarCarta(), comprueba si ahora hay par (en ese caso suma el punto, descarta la mano y roba 2 cartas nuevas, y si está en desempate, verifica si ya ganó), desactiva esperandoDescarte y llama a turnoReinaRoja().
-turnoReinaRoja() juega el turno automático de la computadora: si tiene par, suma el punto, descarta su mano, roba 2 cartas nuevas y comprueba la victoria por desempate igual que del lado del jugador; si no tiene par, descarta su primera carta y roba una, y si con esa carta forma par, también suma el punto, renueva la mano y comprueba el desempate. Al final llama de nuevo a jugarRonda() para continuar, hasta que algún jugador gane.
-Las cartas de cada par se envían a descartes en lugar de eliminarse, así se conservan las 40 cartas del juego entre el mazo y los descartes y el mazo nunca se queda sin cartas para robar.
-Para decidir si alguien llegó a 3 puntos se usa >= 3 en lugar de === 3, porque en el desempate un jugador puede pasar de 3 puntos antes de que se revise el marcador.
-El desempate se resuelve: una vez activado enDesempate, ya no se compara contra el número 3 para decidir el ganador, sino que se compara puntosJugador1 contra puntosJugador2 cada vez que alguno hace par, y gana el primero que saque ventaja.
-Al detectar que el juego terminó, se muestra quién ganó en pantalla dentro del elemento #mensajeFinal (y también por consola), usando el nombre real del jugador (traído con localStorage.getItem('nombre')) o "la Reina Roja" si ganó la computadora. Cuando gana el jugador, además se guarda el récord en localStorage (claves recordCartas y recordCartasNombre) si supera al anterior.
-Se agrega el contenedor <div id="puntajeCartas">, ubicado antes de mesaDeJuego en el HTML, para mostrar el puntaje en pantalla.
-mostrarPuntaje() arma un texto con el nombre real del jugador (localStorage) y ambos puntajes (puntosJugador1 y puntosJugador2), y lo asigna a puntajeCartas.innerHTML; se llama junto a mostrarCartas() en jugarPartida(), elJugadorDescarta() y turnoReinaRoja(), para que el marcador se actualice en tiempo real con cada ronda.