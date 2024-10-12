const express = require('express');

const app = express();

//промежуточный обработчик запроса
app.use((req, res, next) => {
    console.log('Поступил запрос', req.method, req.url);
    next();
});

//корневая стравница
app.get('/', (req, res) => {
    res.send('<h1>Добро пожаловать на мой сайт Express!</h1>');
});
//страница about
app.get('/buy', (req, res) => {
    res.send('<h1>Купи домен!</h1>');
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});