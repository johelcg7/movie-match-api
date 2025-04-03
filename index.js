import express from "express";
import moviesRoutes from "./routes/moviesRoutes.js";
import { errorHandler } from "./utils/errorMiddleware.js";
import { getAllMovies } from "./services/moviesService.js"; // Importar la función para cargar películas

const app = express();
const PORT = 3000;

// Middleware para manejar JSON
app.use(express.json());

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("¡Bienvenido a Movie Match API! El servidor está corriendo correctamente.");
});

// Rutas de películas
app.use("/movies", moviesRoutes);

// Manejo de rutas no encontradas
app.use((req, res, next) => {
    const error = new Error("Ruta no encontrada");
    error.status = 404;
    next(error);
});

// Middleware de manejo de errores
app.use(errorHandler);

// Iniciar el servidor
app.listen(PORT, () => {
    const movies = getAllMovies(); // Cargar todas las películas
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
    console.log(`Se cargaron ${movies.length} películas.`);
});