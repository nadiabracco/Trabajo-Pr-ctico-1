// Diccionario de traduccion (fijo, no cambia nunca)
const traduccionCategorias = {
  "Art": "Arte",
  "Entertainment: Film": "Cine",
  "Entertainment: Music": "Música"
};

// IDs de las categorías que eusamos
const idsElegidos = [25, 11, 12];

// Funcion para traer las categorías desde la API
async function traerCategorias() {
  try {
    const respuesta = await fetch("https://opentdb.com/api_category.php");

    if (!respuesta.ok) {
      throw new Error(`HTTP ${respuesta.status}`);
    }

    const datos = await respuesta.json();
    const todasLasCategorias = datos.trivia_categories;

    // Filtro para quedarnos solo con 3 
    const categoriasElegidas = todasLasCategorias.filter((categoria) =>
      idsElegidos.includes(categoria.id)
    );

    console.log(categoriasElegidas); 
  } catch (error) {
    console.log("Hubo un error al traer las categorías:", error);
  }
}

traerCategorias();
