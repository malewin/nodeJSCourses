const http = require('http');
let counter1 = 0;
let counter2 = 0;

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        counter1++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' }, );

        // function counter = () => {
        //     const counter = 0;
        //     window.addEventListener('load', () => {
        //         ++counter;
        //     })
        //     return counter;
        // };

        res.end(`<h1>Главная страница</h1><br><p>Просмотрено:${counter1} раз</p><br><a href="/about"><h1>Перейдите на страницу "Обо мне"</h1></a>`);
    } else if (req.url === '/about') {
        counter2++;
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' }, );
        res.end(`<h1>Страница "Обо мне"</h1><br><p>Просмотрено:${counter2} раз</p><br><a href="/"><h1>Перейдите на Главную страницу</h1></a>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' }, );
        res.end('<h1>Страница не найдена</h1>');
    }


});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});