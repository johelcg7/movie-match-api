const { getMovieByTitle } = require("./movieUtils");
const { readCSVFile } = require("./fileUtils");
const { getRandomMovie } = require("./server");

const inputTitle = process.argv[2];

const csvData = readCSVFile();
const movie = getMovieByTitle(csvData, inputTitle);
const randomMovie = getRandomMovie(csvData);

console.log("Película buscada:", movie);
console.log("Película aleatoria:", randomMovie);