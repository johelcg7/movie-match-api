import express from "express";
import * as moviesController from "../controllers/moviesController.js";
import { addFavorite, getFavorites, removeFavorite } from "../controllers/favoritesController.js";

const router = express.Router();

// Ruta para obtener todas las películas o filtrarlas por género
router.get("/", moviesController.getAllMovies);
// Ruta para obtener una película por ID o nombre
router.get("/search/:idOrName", moviesController.getMovieByIdOrName);
// Ruta para obtener estadísticas de películas
router.get("/stats", moviesController.getStats);


// Ruta para marcar una película como favorita
router.post("/favorites", addFavorite);
// Ruta para obtener la lista de películas favoritas
router.get("/favorites", getFavorites);
// Ruta para eliminar una película de favoritos
router.delete("/favorites/:idOrName", removeFavorite);

export default router;