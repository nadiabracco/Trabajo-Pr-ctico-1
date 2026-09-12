# Trabajo Practico 1
Nombre del proyecto:Acertijos, cartas y magia
Integrantes: Ayelen Juarez y Nadia Bracco.
Datos de la materia
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
-Si alguino hace un par, gana 1 punto y la ronda termina. 
-Si no se forma par, cada jugador descarta una carta y roba otra.
-Si se agota el mazo, se mezclan las cartas descartadas para seguir.  
-Si ambos alcanzan 3 puntos en la misma ronda,se juega un desempate.
Descripción de las principales funcionalidades:
-El archivo cartas.js genera el mazo de 40 cartas mediante dos bucles for anidados: uno recorre los 4 palos (oros, copas, espadas, bastos) y el otro los números del 1 al 10, creando un objeto {palo, numero} por cada carta.
-El mazo se mezcla con una funcion que, en cada cada repetición del bucle, genera una posición aleatoria con Math.random(), extrae esa carta del mazo original con splice() y la agrega al nuevo array mazoMezclado, hasta vaciar el mazo original.
-Se reparten 4 cartas del mazo mezclado: las 2 primeras se asignan a manoJugador1 y las 2 siguientes a manoJugador2, quitándolas del mazo con splice() a medida que se reparten.
-Se declaran las variables del juego: puntosJugador1, puntosJugador2, manoJugador1, manoJugador2 y el array descartes, donde se guardarán las cartas que se van descartando.