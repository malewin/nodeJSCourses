const fs = require('fs');
const path = require('path');


const person = {
    "name": "Ivan",
    "surname": "Ivanov",
    "age": 30,
    "city": "Moscow"
};

const personsFilePath = path.join(__dirname, 'repsons.json');

fs.writeFileSync(personsFilePath, JSON.stringify(person, null, 4));