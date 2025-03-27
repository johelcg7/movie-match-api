// Importamos los módulos necesarios
const http = require("http"); // Módulo para crear el servidor HTTP
const { readCSVFile } = require("./fileUtils"); // Función para leer el archivo CSV
const { parseCSVRow } = require("./movieUtils"); // Función para procesar filas del CSV

// Función para obtener una película aleatoria del archivo CSV
function getRandomMovie(csvData) {
    const lines = csvData.split("\n"); // Dividimos el contenido del CSV en líneas
    const randomIndex = Math.floor(Math.random() * (lines.length - 1)) + 1; // Seleccionamos un índice aleatorio (ignorando la cabecera)
    const randomMovieRow = lines[randomIndex]; // Obtenemos la fila aleatoria
    const headers = parseCSVRow(lines[0]); // Obtenemos los encabezados del CSV
    const values = parseCSVRow(randomMovieRow); // Obtenemos los valores de la fila aleatoria

    const movie = {};
    headers.forEach((header, index) => {
        movie[header.trim()] = values[index]?.trim(); // Creamos un objeto película con clave-valor
    });

    return movie; // Retornamos la película aleatoria
}

// Función para obtener todas las películas del archivo CSV
function getAllMovies(csvData) {
    const lines = csvData.split("\n"); // Dividimos el contenido del CSV en líneas
    const headers = parseCSVRow(lines[0]); // Obtenemos los encabezados del CSV
    const movies = [];

    for (let i = 1; i < lines.length; i++) { // Iteramos desde la segunda línea (ignorando la cabecera)
        const values = parseCSVRow(lines[i]); // Obtenemos los valores de la fila
        const movie = {};
        headers.forEach((header, index) => {
            movie[header.trim()] = values[index]?.trim(); // Creamos un objeto película con clave-valor
        });
        movies.push(movie); // Agregamos la película al array
    }

    return movies; // Retornamos todas las películas
}

// Función para buscar una película por ID o nombre
function getMovieByIdOrName(csvData, idOrName) {
    const lines = csvData.split("\n"); // Dividimos el contenido del CSV en líneas
    const headers = parseCSVRow(lines[0]); // Obtenemos los encabezados del CSV
    const movies = [];

    for (let i = 1; i < lines.length; i++) { // Iteramos desde la segunda línea (ignorando la cabecera)
        const values = parseCSVRow(lines[i]); // Obtenemos los valores de la fila
        const movie = {};
        headers.forEach((header, index) => {
            movie[header.trim()] = values[index]?.trim(); // Creamos un objeto película con clave-valor
        });
        movies.push(movie); // Agregamos la película al array
    }

    // Buscamos una película cuyo ID o título coincida con el parámetro proporcionado
    return movies.find(
        movie =>
            movie.id.toLowerCase() === idOrName.toLowerCase() ||
            movie.title.toLowerCase() === idOrName.toLowerCase()
    );
}

// Función para filtrar películas por género
function filterMoviesByGenre(movies, genre) {
    return movies.filter(movie =>
        movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase()) // Filtramos películas que contengan el género
    );
}

// Función para obtener estadísticas de películas agrupadas por género
function getMovieStatsByGenre(movies) {
    const stats = {};

    movies.forEach(movie => {
        if (movie.genre) { // Verificamos si la película tiene un género
            const genres = movie.genre.split(",").map(g => g.trim()); // Dividimos los géneros por comas y eliminamos espacios
            genres.forEach(genre => {
                stats[genre] = (stats[genre] || 0) + 1; // Contamos la cantidad de películas por género
            });
        }
    });

    return stats; // Retornamos las estadísticas
}

// Creamos el servidor HTTP
const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        // Ruta de bienvenida
        res.writeHead(200, { "Content-Type": "text/plain" }); // Cabecera de respuesta
        res.end("¡Bienvenido a Movie Match API! El servidor está corriendo correctamente."); // Mensaje de bienvenida
    } else if (req.url.startsWith("/movies/stats") && req.method === "GET") {
        // Ruta para estadísticas de películas por género
        try {
            const csvData = readCSVFile(); // Leemos el archivo CSV
            const movies = getAllMovies(csvData); // Obtenemos todas las películas
            const stats = getMovieStatsByGenre(movies); // Calculamos las estadísticas

            res.writeHead(200, { "Content-Type": "application/json" }); // Cabecera de respuesta
            res.end(JSON.stringify(stats, null, 2)); // Enviamos las estadísticas en formato JSON
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" }); // Cabecera de error
            res.end("Error al procesar la solicitud: " + error.message); // Mensaje de error
        }
    } else if (req.url.startsWith("/movies/") && req.method === "GET") {
        // Ruta para buscar una película por ID o nombre
        const idOrName = decodeURIComponent(req.url.split("/movies/")[1]); // Extraemos el parámetro de la URL

        try {
            const csvData = readCSVFile(); // Leemos el archivo CSV
            const movie = getMovieByIdOrName(csvData, idOrName); // Buscamos la película

            if (movie) {
                res.writeHead(200, { "Content-Type": "application/json" }); // Cabecera de respuesta
                res.end(JSON.stringify(movie, null, 2)); // Enviamos la película en formato JSON
            } else {
                res.writeHead(404, { "Content-Type": "text/plain" }); // Cabecera de error
                res.end("Película no encontrada"); // Mensaje de error
            }
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" }); // Cabecera de error
            res.end("Error al procesar la solicitud: " + error.message); // Mensaje de error
        }
    } else if (req.url.startsWith("/movies") && req.method === "GET") {
        // Ruta para obtener todas las películas o filtrarlas por género
        try {
            const csvData = readCSVFile(); // Leemos el archivo CSV
            const movies = getAllMovies(csvData); // Obtenemos todas las películas

            // Parseamos los parámetros de consulta
            const url = new URL(req.url, `http://${req.headers.host}`);
            const genre = url.searchParams.get("genre"); // Obtenemos el parámetro "genre"

            let filteredMovies = movies;

            // Filtramos por género si el parámetro está presente
            if (genre) {
                filteredMovies = filterMoviesByGenre(movies, genre);
            }

            res.writeHead(200, { "Content-Type": "application/json" }); // Cabecera de respuesta
            res.end(JSON.stringify(filteredMovies, null, 2)); // Enviamos las películas en formato JSON
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" }); // Cabecera de error
            res.end("Error al procesar la solicitud: " + error.message); // Mensaje de error
        }
    } else {
        // Ruta no encontrada
        res.writeHead(404, { "Content-Type": "text/plain" }); // Cabecera de error
        res.end("Ruta no encontrada"); // Mensaje de error
    }
});

// Puerto en el que escucha el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`); // Mensaje al iniciar el servidor
});

// Exportamos las funciones para pruebas o uso externo
module.exports = { getRandomMovie, getAllMovies, getMovieStatsByGenre, getMovieByIdOrName, filterMoviesByGenre };