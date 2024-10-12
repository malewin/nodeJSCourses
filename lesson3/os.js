const os = require('os');

//выведет в консоль инфо о ядрах процессора
console.log(os.cpus());
//инфо об архитекутре процессора
console.log(os.arch());
//количество свободной памяти в байтах
console.log(os.freemem());
//общее количество оперативной памяти в MB
console.log(os.totalmem() / 1024 / 1024 / 1024);