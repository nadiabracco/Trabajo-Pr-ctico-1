// Función que obtiene las preguntas de la API.
async function obtenerPreguntas() {
 // URL de la API con los parámetros.
    let url = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple";
   
    // Hace la solicitud a la API y espera la respuesta.
    let respuesta = await fetch(url);
 // Convierte la respuesta de la API a formato JSON.
    let datos = await respuesta.json();
    //recorre las preguntas.
    for (let i = 0; i < datos.results.length; i++) {
         // Muestra en consola la pregunta
        console.log(datos.results[i].question);
        console.log(datos.results[i].correct_answer);
        console.log(datos.results[i].incorrect_answers);

        // Junta la respuesta correcta y las tres incorrectas
        let opciones = [
            datos.results[i].correct_answer,
            datos.results[i].incorrect_answers[0],
            datos.results[i].incorrect_answers[1],
            datos.results[i].incorrect_answers[2]
        ];


    }
}
 //Llama a la función.
obtenerPreguntas();
