const express = require('express');
const path = require('path');

const app = express();

// Установить директорию для статических файлов
app.use(express.static(path.join('site')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

const port = 3000;

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});