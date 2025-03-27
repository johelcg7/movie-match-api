const http = require("http");
const { readCSVFile } = require("./fileUtils");
const { parseCSVRow } = require("./movieUtils");

function getRandomMovie(csvData) {
    const lines = csvData.split("\n");
    const randomIndex = Math.floor(Math.random() * (lines.length - 1)) + 1; // Evita la cabecera
    const randomMovieRow = lines[randomIndex];
    const headers = parseCSVRow(lines[0]);
    const values = parseCSVRow(randomMovieRow);

    const movie = {};
    headers.forEach((header, index) => {
        movie[header.trim()] = values[index]?.trim(); // Asegura que no haya espacios extra
    });

    return movie;
}

const server = http.createServer((req, res) => {
    if (req.url === "/" && req.method === "GET") {
        try {
            const csvData = readCSVFile();
            const randomMovie = getRandomMovie(csvData);
            

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify(randomMovie, null, 2));
        } catch (error) {
            res.writeHead(500, { "Content-Type": "text/plain" });
            res.end("Error al procesar la solicitud: " + error.message);
        }
    } else {
        res.writeHead(404, { "Content-Type": "text/plain" });
        res.end("Ruta no encontrada");
    }
});



const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});

module.exports = { getRandomMovie };