const moviesService = require("../services/moviesService");

exports.getAllMovies = (req, res) => {
    try {
        const url = new URL(req.url, `http://${req.headers.host}`);
        const genre = url.searchParams.get("genre"); // Obtener el parámetro "genre"
        const movies = genre ? moviesService.getMoviesByGenre(genre) : moviesService.getAllMovies();
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(movies, null, 2));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al obtener las películas: " + error.message);
    }
};

exports.getMovieByIdOrName = (req, res) => {
    try {
        const idOrName = decodeURIComponent(req.url.split("/movies/")[1]); // Extraer ID o nombre
        const movie = moviesService.getMovieByIdOrName(idOrName);
        if (movie) {
            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(movie, null, 2));
        } else {
            res.writeHead(404, { "Content-Type": "text/plain" });
            res.end("Película no encontrada");
        }
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al buscar la película: " + error.message);
    }
};

exports.getStats = (req, res) => {
    try {
        const stats = moviesService.getMovieStats(); // Obtener estadísticas
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(stats, null, 2));
    } catch (error) {
        res.writeHead(500, { "Content-Type": "text/plain" });
        res.end("Error al obtener estadísticas: " + error.message);
    }
};