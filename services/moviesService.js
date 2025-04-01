const { readCSVFile } = require("../utils/fileUtils");
const { parseCSVRow } = require("../utils/parseUtils");

function getAllMovies() {
    const csvData = readCSVFile(); // Leer el archivo CSV
    const lines = csvData.split("\n");
    const headers = parseCSVRow(lines[0]);
    const movies = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        const movie = {};
        headers.forEach((header, index) => {
            movie[header.trim()] = values[index]?.trim();
        });
        movies.push(movie);
    }

    return movies;
}

exports.getAllMovies = getAllMovies;

exports.getMoviesByGenre = (genre) => {
    const movies = getAllMovies();
    return movies.filter(movie =>
        movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
};

exports.getMovieByIdOrName = (idOrName) => {
    const movies = getAllMovies();
    return movies.find(
        movie =>
            movie.id.toLowerCase() === idOrName.toLowerCase() ||
            movie.title.toLowerCase() === idOrName.toLowerCase()
    );
};

exports.getMovieStats = () => {
    const movies = getAllMovies();
    const stats = {};

    movies.forEach(movie => {
        if (movie.genre) {
            const genres = movie.genre.split(",").map(g => g.trim());
            genres.forEach(genre => {
                stats[genre] = (stats[genre] || 0) + 1;
            });
        }
    });

    return stats;
};