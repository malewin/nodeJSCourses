const express = require('express');
const { engine } = require('express-handlebars');
const fs = require('fs').promises;
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

app.engine('handlebars', engine({}));
app.set('view engine', 'handlebars');

app.use(express.static(path.join(__dirname, 'public')));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Путь к файлу JSON с пользователями
const usersFilePath = path.join(__dirname, 'users.json');

// Функции для работы с данными пользователей
const readUsersFile = async() => {
    const data = await fs.readFile(usersFilePath);
    return JSON.parse(data);
};

const writeUsersFile = async(data) => {
    await fs.writeFile(usersFilePath, JSON.stringify(data, null, 4)); // 4 - отступы для читаемости
};

// Функция для получения всех песен всех пользователей
const getAllSongs = async() => {
    const users = await readUsersFile();
    let allSongs = [];

    users.forEach(user => {
        if (user.songs) {
            user.songs.forEach(fileName => {
                // Создаем объект песни для каждого файла
                allSongs.push({
                    title: path.basename(fileName), // Имя файла без пути
                    artist: `${user.id}`, // Можно указать артиста по ID пользователя
                    path: fileName, // Полный путь к файлу
                });
            });
        }
    });

    return allSongs; // Возвращаем объединённый массив песен
};


app.get('/', async(req, res) => {
    const allSongs = await getAllSongs(); // Получаем все песни
    res.render('home', { songs: allSongs }); // Отправляем все песни на главную страницу
});
// // Функция для получения всех песен пользователя
// const getAllSongsOfUser = async(userId) => {
//     const users = await readUsersFile();
//     const user = users.find(u => u.id === userId);
//     return user ? user.songs : []; // Возвращает песни или пустой массив
// };

// // Главная страница (например, для пользователя с ID 5)
// app.get('/', async(req, res) => {
//     const userId = 5; // Замените на ID текущего пользователя
//     const allSongs = await getAllSongsOfUser(userId); // Получаем песни для конкретного пользователя
//     res.render('home', { songs: allSongs });
// });

// Маршрут для создания аккаунта
app.post('/api/createAccount', async(req, res) => {
    const users = await readUsersFile();
    const newUser = {
        id: users.length + 1,
        hasPaySubscribe: false,
        rateStatus: "free",
        songs: []
    };
    users.push(newUser);
    await writeUsersFile(users);
    res.status(201).json(newUser);
});


// Маршрут для создания песни
app.post('/api/createSong', async(req, res) => {
    const newSong = req.body; // Предполагается, что данные песни приходят в теле запроса
    newSong.id = songs.length + 1; // Увеличиваем ID
    songs.push(newSong); // Добавляем песню в массив
    res.status(201).json(newSong); // Возвращаем созданную песню
});

// Маршрут для получения пользователя по ID
app.get('/api/getUser/:id', async(req, res) => {
    const users = await readUsersFile();
    const user = users.find(u => u.id === parseInt(req.params.id));
    if (user) {
        res.json(user);
    } else {
        res.status(404).send('User not found');
    }
});

// Маршрут для обновления аккаунта
app.put('/api/updateAccount/:id', async(req, res) => {
    const users = await readUsersFile();
    const userIndex = users.findIndex(u => u.id === parseInt(req.params.id));
    if (userIndex !== -1) {
        Object.assign(users[userIndex], req.body);
        await writeUsersFile(users);
        res.json(users[userIndex]);
    } else {
        res.status(404).send('User not found');
    }
});

// Маршрут для удаления аккаунта
app.delete('/api/deleteAccount/:id', async(req, res) => {
    const users = await readUsersFile();
    const newUsers = users.filter(u => u.id !== parseInt(req.params.id));
    if (newUsers.length < users.length) {
        await writeUsersFile(newUsers);
        res.status(204).send();
    } else {
        res.status(404).send('User not found');
    }
});

//маршрут для удаления песни
app.delete('/api/deleteSong/:userId/songs/:songName', async(req, res) => { // Добавлено async
    const userId = parseInt(req.params.userId, 10);
    const songName = req.params.songName;

    const users = await readUsersFile(); // Теперь используется await
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');

    // Находим полный путь к файлу
    const userFolder = path.join(__dirname, '../uploads/Artists', userId.toString());
    const filePath = path.join(userFolder, songName); // Имя файла для удаления.

    // Удаляем песню из списка
    user.songs = user.songs.filter(song => song.split('/').pop() !== songName);

    if (fs.existsSync(filePath)) {
        await fs.unlink(filePath); // Удаляем файл
    } else {
        return res.status(404).send('File not found');
    }

    await writeUsersFile(users);
    res.send({ message: 'Song deleted successfully.' });
});



// Маршрут для отображения профиля пользователя
app.get('/profile/:id', async(req, res) => {
    const userId = parseInt(req.params.id);
    const users = await readUsersFile();
    const user = users.find(u => u.id === userId);

    if (user) {
        const userSongs = user.songs.map(song => ({
            title: path.basename(song), // Имя файла без пути
            artist: `${user.id}`, // Имя артиста (можно поменять по желанию)
            id: song // Или используйте уникальный ID для удаления
        }));
        res.render('profile', { user, songs: userSongs }); // Отправляем пользователя и его песни в шаблон
    } else {
        res.status(404).send('User not found');
    }
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});