const path = require('path');

//выведет в консолль путь
console.log(path.join('/Users/viktortarkhanov/Desktop', 'nodeJSCourse/lesson3/path.js'));
//выведет в консоль объект пути
console.log(path.parse('/Users/viktortarkhanov/Desktop/nodeJSCourse/lesson3/path.js'));
//выведет в консоль путь директории убрав навзание файла
console.log(path.dirname('/Users/viktortarkhanov/Desktop/nodeJSCourse/lesson3/path.js'));
//выведет в консоль расширение файла .js
console.log(path.extname('/Users/viktortarkhanov/Desktop/nodeJSCourse/lesson3/path.js'));