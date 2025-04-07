import * as moviesService from "../services/moviesService.js";
import * as favoritesService from "../services/favoritesService.js";

// Controlador para agregar una película a favoritos
export const addFavorite = (req, res, next) => {
    try {
        const { idOrName } = req.body; // Obtener el ID o nombre de la película del cuerpo de la solicitud
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

        const favorite = favoritesService.addFavorite(movie);

        res.status(201).json({
            message: "Película marcada como favorita.",
            favorite
        });
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

// Controlador para obtener la lista de películas favoritas
export const getFavorites = (req, res, next) => {
    try {
        const favorites = favoritesService.getFavorites();

        if (!favorites || favorites.length === 0) {
            return res.status(200).json({
                message: "No tienes películas favoritas.",
                favorites: []
            });
        }

        res.status(200).json(favorites);
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};

// Controlador para eliminar una película de favoritos
export const removeFavorite = (req, res, next) => {
    try {
        const { idOrName } = req.params; // Obtener el ID o nombre de la película de los parámetros
        if (!idOrName) {
            const error = new Error("Debe proporcionar un ID o nombre válido.");
            error.status = 400;
            throw error;
        }

        const removedMovie = favoritesService.removeFavorite(idOrName);

        res.status(200).json({
            message: "Película eliminada de favoritos.",
            removedMovie
        });
    } catch (error) {
        next(error); // Pasar el error al middleware de manejo de errores
    }
};