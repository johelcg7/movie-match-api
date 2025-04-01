const fs = require("fs");
const path = require("path");

function readCSVFile() {
    const csvFilePath = path.join(__dirname, "..", "data", "movies.csv");
    const csvContent = fs.readFileSync(csvFilePath, "utf8");
    return csvContent;
}

module.exports = { readCSVFile };