import express from "express";
import moviesRoutes from "./routes/moviesRoutes.js";
import errorHandler from "./middlewares/errorHandler.js"; // Importar el middleware de manejo de errores
import { getAllMovies } from "./services/moviesService.js"; // Importar la función para cargar películas
import { logger } from "./middlewares/logger.js"; // Importar el middleware de logging
import { corsMiddleware } from "./middlewares/cors.js"; // Importar el middleware de CORS

const app = express();
const PORT = process.env.PORT || 3000; // Usa el puerto de .env o 3000 por defecto

// Middleware para manejar JSON
app.use(express.json());

// Middleware de CORS
app.use(corsMiddleware);

// Middleware de logging
app.use(logger);

// Ruta de bienvenida
app.get("/", (req, res) => {
    res.send("¡Bienvenido a Movie Match API! El servidor está corriendo correctamente.");
    console.log(req.headers); // Muestra todas las cabeceras de la solicitud
    res.set("X-Custom-Header", "MovieMatchAPI"); // Establece un encabezado personalizado en la respuesta
    res.set("Access-Control-Allow-Origin", "*"); // Permitir acceso desde cualquier origen (CORS)
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