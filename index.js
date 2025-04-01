// Importamos los módulos necesarios
const http = require("http"); // Módulo para crear el servidor HTTP
const moviesRoutes = require("./routes/moviesRoutes"); // Módulo para manejar las rutas de películas

// Crear el servidor HTTP
const server = http.createServer((req, res) => {
    if (req.url.startsWith("/movies")) {
        moviesRoutes(req, res); // Delegar las rutas de /movies
    } else if (req.url === "/" && req.method === "GET") {
        // Ruta de bienvenida
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("¡Bienvenido a Movie Match API! El servidor está corriendo correctamente.");
    } else {
        // Ruta no encontrada
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada");
    }
});

// Puerto en el que escucha el servidor
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

// Exportamos las funciones para pruebas o uso externo
module.exports = { server };