const { readCSVFile } = require("./fileUtils");
const { parseCSVRow } = require("./movieUtils");

function filterMoviesByGenre(csvData, genre) {
    const lines = csvData.split("\n");
    const headers = parseCSVRow(lines[0]);
    const genreIndex = headers.indexOf("genre");

    if (genreIndex === -1) {
        throw new Error("El archivo CSV no contiene una columna 'genre'.");
    }

    const filteredMovies = [];
    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        if (values[genreIndex]?.includes(genre)) {
            const movie = {};
            headers.forEach((header, index) => {
                movie[header.trim()] = values[index]?.trim();
            });
            filteredMovies.push(movie);
        }

        if (filteredMovies.length >= 10) {
            break; // Limita el resultado a un máximo de 10 películas
        }
    }

    return filteredMovies;
}

// Leer el género desde los argumentos de la línea de comandos
const genre = process.argv[2];
if (!genre) {
    console.error("Por favor, proporciona un género como argumento.");
    process.exit(1);
}

try {
    const csvData = readCSVFile();
    const movies = filterMoviesByGenre(csvData, genre);
    console.log(`Películas del género "${genre}":`, movies);
} catch (error) {
    console.error("Error al filtrar las películas:", error.message);
}