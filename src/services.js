const apiURL = "http://localhost:3006/movies";
let moviesContainer = document.getElementById("movie-section");

// CREATE (POST)
async function createMovie(newMovie) {
    await fetch(apiURL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMovie)
    });
}

// READ (GET)
async function getMovies() {
    const response = await fetch(apiURL);
    const data = await response.json();
    return data;
}

// UPDATE (PUT)
async function updateMovie(id, editedMovie) {
    const response = await fetch(`${apiURL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editedMovie)
    });

    if (response.ok) {
        console.log(`Película con ID ${id} actualizada`);
        printMovies();
    } else {
        console.error("Error al actualizar la película");
    }
}

// DELETE
async function deleteMovie(id) {
    const response = await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    if (response.ok) {
        console.log(`Película con ID ${id} eliminada`);
        printMovies();
    } else {
        console.error(`No se pudo eliminar la película con ID ${id}`);
    }
}

// Mostrar películas en pantalla
async function printMovies() {
    const movies = await getMovies();
    moviesContainer.innerHTML = "";

    movies.forEach(movie => {
        const movieElement = document.createElement("div");
        movieElement.innerHTML = `
            <h2>${movie.title} (${movie.year})</h2>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p>${movie.synopsis}</p>
            <button class="delete-btn">Eliminar</button>
            <button class="edit-btn">Editar</button>
        `;

        movieElement.querySelector(".delete-btn").addEventListener("click", () => deleteMovie(movie.id));
        movieElement.querySelector(".edit-btn").addEventListener("click", () => showEditModal(movie));

        moviesContainer.appendChild(movieElement);
    });
}

// Escuchar envío del formulario de añadir película
const form = document.getElementById("add-movie-form");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const newMovie = {
        title: document.getElementById("title").value,
        year:Number(document.getElementById("year").value),
        director: document.getElementById("director").value,
        synopsis: document.getElementById("synopsis").value
    };
    await createMovie(newMovie);
    form.reset();
    printMovies();
});


// MODAL PARA EDITAR //
const modal = document.getElementById("edit-modal");
const titleInput = document.getElementById("edit-title");
const yearInput = document.getElementById("edit-year");
const directorInput = document.getElementById("edit-director");
const synopsisInput = document.getElementById("edit-synopsis");
const editForm = document.getElementById("edit-form");
const cancelBtn = document.getElementById("cancel-edit-btn");

let currentEditId = null;

function showEditModal(movie) {
    currentEditId = movie.id;
    titleInput.value = movie.title;
    yearInput.value = movie.year;
    directorInput.value = movie.director;
    synopsisInput.value = movie.synopsis;
    modal.style.display = "flex"; 
}

function closeModal() {
    modal.style.display = "none";
    currentEditId = null;
}

// Enviar cambios desde el modal
editForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!currentEditId) return;

    const editedMovie = {
        title: titleInput.value,
        year: yearInput.value,
        director: directorInput.value,
        synopsis: synopsisInput.value
    };

    await updateMovie(currentEditId, editedMovie);
    closeModal();
});

// Cancelar edición
cancelBtn.addEventListener("click", closeModal);

// Cerrar modal al hacer clic fuera del contenido
window.addEventListener("click", (e) => {
    if (e.target === modal) {
        closeModal();
    }
});
window.addEventListener("DOMContentLoaded", () => {
    printMovies();
});