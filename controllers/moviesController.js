import * as moviesService from "../services/moviesService.js";

export const getAllMovies = (req, res, next) => {
    try {
        const { genre, name, year } = req.query; // Obtener los parámetros de consulta

        let movies;

        if (name || year) {
            // Buscar por criterios combinados (name y/o year)
            movies = moviesService.getMoviesByCriteria({ name, year });
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