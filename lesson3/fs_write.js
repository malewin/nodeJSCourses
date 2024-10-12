const fs = require('fs');

fs.writeFile('./testWrite.txt', 'console.log("Hello")', (err) => {
    if (err) {
        console.error(err);
    }
    console.log('The file was saved!');
});