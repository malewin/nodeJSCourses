const fs = require('fs');

fs.appendFile(__filename, 'console.log("Hello");\n', (err) => {
    if (err) {
        console.error(err);
    }
    console.log('The file was saved!');
});
console.log("Hello");