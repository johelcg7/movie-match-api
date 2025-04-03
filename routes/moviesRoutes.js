import express from "express";
import * as moviesController from "../controllers/moviesController.js";

const router = express.Router();

// Ruta para obtener todas las películas o filtrarlas por género
router.get("/", moviesController.getAllMovies);
// Ruta para obtener una película por ID o nombre
router.get("/:idOrName", moviesController.getMovieByIdOrName);
// Ruta para obtener estadísticas de películas
router.get("/stats", moviesController.getStats);


export default router;