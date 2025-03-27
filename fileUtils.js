const fs = require("fs");
const path = require("path");

function readCSVFile() {


    const csvFilePath = path.join(__dirname, "data", "movies.csv");
    const csvContent = fs.readFileSync(csvFilePath, "utf8");; // Renombré la variable a csvContent
    return csvContent; // Devuelve el contenido del archivo CSV
}

module.exports = { readCSVFile };