import { readCSVFile } from "../utils/fileUtils.js";
import { parseCSVRow } from "../utils/parseUtils.js";

function getAllMovies() {
    const csvData = readCSVFile(); // Leer el archivo CSV
    const lines = csvData.split("\n");
    const headers = parseCSVRow(lines[0]);
    const movies = [];

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        if (values.length !== headers.length) continue; // Ignorar filas mal formateadas
        const movie = {};
        headers.forEach((header, index) => {
            movie[header.trim()] = values[index]?.trim();
        });
        movies.push(movie);
    }

    return movies;
}

export { getAllMovies };

export const getMoviesByCriteria = (criteria) => {
    const movies = getAllMovies();

    return movies.filter(movie => {
        let matches = true;

        // Filtrar por nombre parcial
        if (criteria.name) {
            matches =
                matches &&
                movie.title.toLowerCase().includes(criteria.name.toLowerCase());
        }

        // Filtrar por año
        if (criteria.year) {
            matches = matches && movie.year === criteria.year;
        }

        return matches;
    });
};

export const getMoviesByGenre = (genre) => {
    const movies = getAllMovies();
    return movies.filter(movie =>
        movie.genre && movie.genre.toLowerCase().includes(genre.toLowerCase())
    );
};

export const getMovieByIdOrName = (idOrName) => {
    const movies = getAllMovies();
    return movies.find(
        movie =>
            movie.id.toLowerCase() === idOrName.toLowerCase() ||
            movie.title.toLowerCase() === idOrName.toLowerCase()
    );
};

export const getMovieStats = () => {
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

export const getRecommendationsByGenre = (genre, excludeMovieId) => {
    const movies = getAllMovies();
    return movies.filter(movie =>
        movie.genre &&
        movie.genre.toLowerCase().includes(genre.toLowerCase()) &&
        movie.id !== excludeMovieId // Excluir la película consultada
    ).slice(0, 5); // Limitar a 5 recomendaciones
};