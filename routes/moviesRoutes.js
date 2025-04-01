const moviesController = require("../controllers/moviesController");

module.exports = (req, res) => {
    if (req.url === "/movies/stats" && req.method === "GET") {
        moviesController.getStats(req, res); // Ruta para estadísticas
    } else if (req.url.startsWith("/movies/") && req.method === "GET") {
        moviesController.getMovieByIdOrName(req, res); // Ruta para buscar por ID o nombre
    } else if (req.url.startsWith("/movies") && req.method === "GET") {
        moviesController.getAllMovies(req, res); // Ruta para obtener todas las películas o filtrarlas
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada en /movies");
    }
};