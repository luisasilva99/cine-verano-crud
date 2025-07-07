const moviesContainer = document.getElementById("movies-container");
const form = document.getElementById("movie-form");
const titleInput = document.getElementById("title");
const directorInput = document.getElementById("director");

// Mostrar todas las películas
async function getAllMovies() {
  const response = await fetch("http://localhost:3001/movies");
  const data = await response.json();
  return data;
}

// Crear película
function createMovie(newMovie) {
  fetch("http://localhost:3001/movies", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newMovie)
  }).then(() => printMovies());
}

// Eliminar película
function deleteMovie(id) {
  fetch(`http://localhost:3001/movies/${id}`, {
    method: "DELETE"
  }).then(() => printMovies());
}

// Pintar las películas en pantalla
async function printMovies() {
  const movies = await getAllMovies();
  moviesContainer.innerHTML = ""; // limpiar

  movies.forEach(movie => {
    const movieCard = document.createElement("div");
    movieCard.innerHTML = `
      <h2>${movie.title}</h2>
      <p>Director: ${movie.director}</p>
      <button onclick="deleteMovie(${movie.id})">Eliminar</button>
    `;
    moviesContainer.appendChild(movieCard);
  });
}

// Escuchar el formulario
form.addEventListener("submit", function (e) {
  e.preventDefault();
  const newMovie = {
    title: titleInput.value,
    director: directorInput.value
  };
  createMovie(newMovie);
  form.reset();
});

printMovies();
