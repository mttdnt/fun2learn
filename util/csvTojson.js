const fs = require('fs');
const path = require('path');
const csv = require('@fast-csv/parse');

const characters = [];
const sentences = [];

function characterCsvToJSON() {
  fs.createReadStream(path.resolve(__dirname, '', 'characters.csv'))
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    characters.push({
      character: row[0],
      pinyin: row[1],
      english: row[2],
    });
  })
  .on('end', rowCount => {
    console.log(`Parsed ${rowCount} rows`);
    const data = JSON.stringify(characters);
    fs.writeFileSync('./src/characters.json', data);
  });
}

function sentenceCsvToJSON() {
  fs.createReadStream(path.resolve(__dirname, '', 'sentences.csv'))
  .pipe(csv.parse({ headers: false }))
  .on('error', error => console.error(error))
  .on('data', row => {
    const pinyin = row[0].toLowerCase().split(" ");
    const characterMap = pinyin.map((p) => {
      const stringHasPunc = p.match(/[.,/#!?$%^&*;:{}=\-_`~]/g);

      const character = (char) => {
        const found = characters.find((x) => x.pinyin.toLowerCase() === char.toLowerCase());
        if (found) {
          return { string: found.character, isCharacter: true };
        } else {
          return {
            string: char,
            isCharacter: false,
          }
        }
      };

      let resolvedCharacters = [];
  
      if (stringHasPunc) {
        const puncIndex = p.indexOf(stringHasPunc);
        const separatedChars = [p.slice(0, puncIndex), p.slice(puncIndex)];
        separatedChars.forEach((x) => resolvedCharacters.push(character(x)));
      } else {
        resolvedCharacters.push(character(p));
      }
  
      return resolvedCharacters;
    });

    sentences.push({
      character: characterMap.flatMap((x) => x),
      pinyin: row[0],
      english: row[1],
    });
  })
  .on('end', rowCount => {
    console.log(`Parsed ${rowCount} rows`);
    const data = JSON.stringify(sentences);
    fs.writeFileSync('./src/sentences.json', data);
  });
}

characterCsvToJSON();
sentenceCsvToJSON();
