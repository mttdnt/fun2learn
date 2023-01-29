const fs = require("fs");
const path = require("path");
const csv = require("@fast-csv/parse");

const characters = [];

function characterCsvToJSON() {
  fs.createReadStream(path.resolve(__dirname, "", "characters.csv"))
    .pipe(csv.parse({ headers: false }))
    .on("error", (error) => console.error(error))
    .on("data", (row) => {
      characters.push({
        character: row[0],
        pinyin: row[1],
        english: row[2]
      });
    })
    .on("end", (rowCount) => {
      console.log(`Parsed ${rowCount} rows`);
      const data = JSON.stringify(characters);
      fs.writeFileSync("./src/characters.json", data);
    });
}

characterCsvToJSON();
