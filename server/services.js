//URL http://localhost:3001/movies

//Create método POST
function createMovie(newMovie) {
}

// READ método GET
 async function getAllmovies (){
    const response = await fetch("http://localhost:3001/movies")
    const movieData = await response.json()
    console.log(movieData)
    return movieData
}    
getAllmovies()

//Update método PUT
function updateMovie(id, editedMovie) {

}
//Detele método DELETE
function deleteMovie(id){
    fetch(`http://localhost:3001/movies${id}`, {
        method: "DELETE"
    })
    .then(() => console.log(`Película con ID ${id} eliminada.`))
    .catch(error => console.error("Error al eliminar:", error));
}
//imprimir
let moviesContainer = document.querySelector("section")
async function printMovies(){
    console.log("Hola!")
    let movies = await getAllMovies();
    const movieList = movies.map(movie =>{
        return moviesContainer.innerHTML += `<h1>${movie.title}</h1>`
    });
    return movieList                                  
}