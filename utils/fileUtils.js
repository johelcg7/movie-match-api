import fs from "fs";
import path from "path";

export function readCSVFile() {
    const csvFilePath = path.join(path.resolve(), "data", "movies.csv");
    const csvContent = fs.readFileSync(csvFilePath, "utf8");
    return csvContent;
}