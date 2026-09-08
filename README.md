# Trabajo-Pr-ctico-1
Nombre del proyecto:Acertijos, cartas y magia
Integrantes: Ayeles Juarez y Nadia Bracco.
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
