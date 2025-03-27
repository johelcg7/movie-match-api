function parseCSVRow(row) {
	const result = [];
	let current = "";
	let insideQuotes = false;

	for (let i = 0; i < row.length; i++) {
		const char = row[i];
		if (char === '"') {
			if (insideQuotes && row[i + 1] === '"') {
				// Se agrega una comilla escape y se salta la siguiente
				current += '"';
				i++;
			} else {
				insideQuotes = !insideQuotes;
			}
		} else if (char === "," && !insideQuotes) {
			result.push(current);
			current = "";
		} else {
			current += char;
		}
	}
	result.push(current);
	return result;
}

function getMovieByTitle(csvData, inputTitle) {
    const lines = csvData.split("\n");
    const headers = parseCSVRow(lines[0]);

    let movie = {};

    for (let i = 1; i < lines.length; i++) {
        const values = parseCSVRow(lines[i]);
        if (values[1] === inputTitle) {
            headers.forEach((header, index) => {
                movie[header] = values[index];
            });
            break;
        }
    }

    return movie;
}

module.exports = {getMovieByTitle, parseCSVRow};

