let url = "https://opentdb.com/api.php?amount=5&difficulty=easy&type=multiple";

fetch(url)
    .then(function(respuesta) {
        return respuesta.json();
    })
    .then(function(datos) {
        console.log(datos);
    });