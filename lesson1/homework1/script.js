const http = require('http');

const server = http.createServer((req, res) => {
    console.log('Запрос получен');

    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' }, );
        res.end('<a href="/about"><h1>Перейдите на страницу "Обо мне"</h1></a>');
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' }, );
        res.end('<a href="/"><h1>Перейдите на Главную страницу</h1></a>');
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' }, );
        res.end('<h1>Страница не найдена</h1>');
    }
});

const port = 3000;

server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});