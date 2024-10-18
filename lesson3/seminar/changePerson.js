const fs = require('fs');
const path = require('path');

const personsFilePath = path.join(__dirname, 'repsons.json');

const data = fs.readFileSync(personsFilePath);
let obj = JSON.parse(data);
console.log(obj);

obj.age -= 10;
obj.city = 'Ekaterinburg';

fs.writeFileSync(personsFilePath, JSON.stringify(obj, null, 4));