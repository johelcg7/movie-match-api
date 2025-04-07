import * as moviesService from "../services/moviesService.js";

export const getAllMovies = (req, res, next) => {
    try {
        const { genre, name, year, fromYear, toYear, director } = req.query; // Obtener los parámetros de consulta

        // Validar que los parámetros fromYear y toYear sean números válidos
        if (fromYear && isNaN(parseInt(fromYear))) {
            const error = new Error("El parámetro 'fromYear' debe ser un número válido.");
            error.status = 400;
            throw error;
        }

        if (toYear && isNaN(parseInt(toYear))) {
            const error = new Error("El parámetro 'toYear' debe ser un número válido.");
            error.status = 400;
            throw error;
        }

        // Validar que fromYear no sea mayor que toYear
        if (fromYear && toYear && parseInt(fromYear) > parseInt(toYear)) {
            const error = new Error("El parámetro 'fromYear' no puede ser mayor que 'toYear'.");
            error.status = 400;
            throw error;
        }

        let movies;

        if (director) {
            // Filtrar por director
            movies = moviesService.getMoviesByDirector(director);
        } else if (name || year || fromYear || toYear) {
            // Buscar por criterios combinados (name, year, fromYear, toYear)
            movies = moviesService.getMoviesByCriteria({ name, year, fromYear, toYear });
        } else if (genre) {
            // Filtrar por género
            movies = moviesService.getMoviesByGenre(genre);
        } else {
            // Obtener todas las películas
            movies = moviesService.getAllMovies();
        }

        if (!movies || movies.length === 0) {
            // Lanzar un error si no se encuentran películas
            const error = new Error("No se encontraron resultados para la búsqueda.");
            error.status = 404;
            throw error;
        }

        res.status(200).json(movies); // Responder con las películas en formato JSON
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

export const getMovieByIdOrName = (req, res, next) => {
    try {
        const idOrName = req.params.idOrName; // Extraer ID o nombre de los parámetros
        if (!idOrName) {
            const error = new Error("Debe proporcionar un ID o nombre válido.");
            error.status = 400;
            throw error;
        }

        const movie = moviesService.getMovieByIdOrName(idOrName);

        if (!movie) {
            const error = new Error("No se encontró ninguna película con el ID o nombre proporcionado.");
            error.status = 404;
            throw error;
        }

        // Obtener recomendaciones basadas en el género
        const recommendations = moviesService.getRecommendationsByGenre(movie.genre, movie.id);

        res.status(200).json({
            movie,
            recommendations
        }); // Responder con la película encontrada y las recomendaciones
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

export const getStats = (req, res, next) => {
    try {
        const stats = moviesService.getMovieStats();

        if (!stats || Object.keys(stats).length === 0) {
            const error = new Error("No se encontraron estadísticas.");
            error.status = 404;
            throw error;
        }

        res.status(200).json(stats); // Responder con las estadísticas en formato JSON
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};