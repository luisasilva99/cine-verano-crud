const apiURL = "http://localhost:3001/movies";
const moviesContainer = document.getElementById("movie-section");

// Leer películas
async function getMovies() {
  const response = await fetch(apiURL);
  const data = await response.json();
  return data;
}

// Crear película
async function createMovie(newMovie) {
  await fetch(apiURL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie)
  });
  printMovies(); // Refresca la lista
}

// Eliminar película
async function deleteMovie(id) {
   console.log("Intentando eliminar ID:", id); 
  const response = await fetch(`http://localhost:3001/movies/${id}`, {
    method: "DELETE"
  });

  if (response.ok) {
    console.log(`Película con ID ${id} eliminada`);
    printMovies();
  } else {
    console.error(`No se pudo eliminar la película con ID ${id}`);
  }
}


// Imprimir películas
async function printMovies() {
  const movies = await getMovies();
  moviesContainer.innerHTML = ""; // Limpiar antes de renderizar
  movies.forEach(movie => {
    moviesContainer.innerHTML += `
      <h2>${movie.title}</h2>
      <p><strong>Director:</strong> ${movie.director}</p>
      <p>${movie.sypnosis}</p>
      <button onclick="deleteMovie('${movie.id}')">Eliminar</button>
      <hr/>
    `;
  });
}

// Capturar formulario y crear película
const form = document.getElementById("movie-form");
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newMovie = {
    title: document.getElementById("title").value,
    director: document.getElementById("director").value,
    sypnosis: document.getElementById("sypnosis").value
  };
  createMovie(newMovie);
  form.reset();
});

// Para que deleteMovie esté disponible globalmente (necesario si NO usas type="module")
window.deleteMovie = deleteMovie;
window.printMovies = printMovies;