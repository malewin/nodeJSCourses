const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');

const pathForWriteDB = path.resolve(__dirname, 'counters.json');

// Проверка наличия файла и его создание
async function initCounters() {
    try {
        await fs.access(pathForWriteDB);
    } catch {
        const counters = {
            '/': 0,
            '/about': 0
        };
        await fs.writeFile(pathForWriteDB, JSON.stringify(counters, null, 4));
    }
}

// Промежуточный обработчик для увеличения счётчика
app.use(async(req, res, next) => {
    try {
        const data = await fs.readFile(pathForWriteDB);
        const counters = JSON.parse(data);

        // Обновляем счётчик для текущего маршрута
        if (counters[req.path] !== undefined) {
            counters[req.path] += 1;
            await fs.writeFile(pathForWriteDB, JSON.stringify(counters, null, 4));
        }
    } catch (err) {
        console.error(err);
    }
    next();
});

app.get('/', async(req, res) => {
    const data = await fs.readFile(pathForWriteDB);
    const counters = JSON.parse(data);
    res.send(`<h1>Корневая страница</h1><br><p>Количество просмотров: ${counters['/']}</p><a href='/about'>Ссылка на страницу about</a>`);
});

app.get('/about', async(req, res) => {
    const data = await fs.readFile(pathForWriteDB);
    const counters = JSON.parse(data);
    res.send(`<h1>Страница about</h1><br><p>Количество просмотров: ${counters['/about']}</p><a href='/'>Ссылка на Корневую страницу</a>`);
});

const port = 3000;

initCounters().then(() => {
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
});