const express = require('express');
const multer = require('multer');
const Joi = require('joi');
const fs = require('fs');
const path = require('path');

const router = express.Router();
const upload = multer({
    dest: 'uploads/Artists/',
    limits: { fileSize: 20 * 1024 * 1024 } // Ограничение на размер файла 20 МБ
});

const usersFilePath = path.join(__dirname, '../users.json');

// Утилиты для работы с пользователями
const readUsersFromFile = () => {
    const data = fs.readFileSync(usersFilePath) || '[]';
    return JSON.parse(data);
};

const writeUsersToFile = (users) => {
    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 4));
};

// Схема валидации для загружаемых аудиозаписей
const songSchema = Joi.object({
    file: Joi.object({
        mimetype: Joi.string().valid('audio/mp3').required(),
    }).required(),
});

// Создание аккаунта
router.post('/connect', (req, res) => {
    const { walletAddress } = req.body;
    const users = readUsersFromFile();
    const newUser = {
        id: users.length + 1,
        walletAddress,
        hasPaySubscribe: false,
        rateStatus: 'free',
        songs: []
    };
    users.push(newUser);
    writeUsersToFile(users);
    res.json(newUser);
});

// Получение всех аккаунтов
router.get('/', (req, res) => {
    const users = readUsersFromFile();
    res.json(users);
});

// Получение информации о пользователе
router.get('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const users = readUsersFromFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');
    res.json(user);
});

// Обновление аккаунта
router.put('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const users = readUsersFromFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');

    const { walletAddress, hasPaySubscribe, rateStatus } = req.body;
    user.walletAddress = walletAddress || user.walletAddress;
    user.hasPaySubscribe = hasPaySubscribe !== undefined ? hasPaySubscribe : user.hasPaySubscribe;
    user.rateStatus = rateStatus || user.rateStatus;

    writeUsersToFile(users);
    res.json(user);
});

// Удаление аккаунта
router.delete('/:id', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    let users = readUsersFromFile();
    users = users.filter(u => u.id !== userId);
    writeUsersToFile(users);

    res.send('User deleted successfully.');
});

// Загрузка песни
router.post('/:id/songs', upload.single('file'), (req, res) => {
    // Убедитесь, что файл был загружен
    if (!req.file) return res.status(400).send('No file uploaded.');

    const userId = parseInt(req.params.id, 10);
    const users = readUsersFromFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');

    const songsLimit = user.rateStatus === 'free' ? 1 :
        user.rateStatus === 'album' ? 10 :
        Infinity;

    if (user.songs.length >= songsLimit) {
        return res.status(403).send('Song limit reached for your subscription level.');
    }

    // Создание папки для пользователя, если она не существует
    const userFolder = path.join(__dirname, '../uploads/Artists', user.id.toString());

    if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
    }

    // Сохранение файла с оригинальным именем
    const originalFileName = req.file.originalname; // Получаем оригинальное имя файла
    const newFilePath = path.join(userFolder, originalFileName);

    // Проверяем, существует ли файл с таким же именем, если да, добавляем номер
    let fileCounter = 1;
    let uniqueFilePath = newFilePath;
    const fileExtension = path.extname(originalFileName);
    const baseName = path.basename(originalFileName, fileExtension);

    while (fs.existsSync(uniqueFilePath)) {
        uniqueFilePath = path.join(userFolder, `${baseName}(${fileCounter++})${fileExtension}`);
    }

    // Переименовать временный файл в конечный
    fs.renameSync(req.file.path, uniqueFilePath);

    user.songs.push(uniqueFilePath); // Сохраняем путь к файлу пользователя
    writeUsersToFile(users);

    res.send('Song uploaded successfully.');
});


// Получение списка песен пользователя
router.get('/:id/songs', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const users = readUsersFromFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');
    res.json(user.songs);
});

// Удаление песни
router.delete('/:id/songs/:songName', (req, res) => {
    const userId = parseInt(req.params.id, 10);
    const songName = req.params.songName;
    const users = readUsersFromFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');

    // Удаляем песню из списка и удаляем файл
    user.songs = user.songs.filter(song => song !== songName);
    const userFolder = path.join(__dirname, '../uploads/Artists', userId.toString());
    const filePath = path.join(userFolder, songName);

    if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
    }

    writeUsersToFile(users);
    res.send('Song deleted successfully.');
});

// router.get('/:id', (req, res) => {
//     const userId = parseInt(req.params.id, 10);
//     console.log(`Requested user ID: ${userId}`); // Логируем запрашиваемый ID

//     const users = readUsersFromFile();
//     console.log(users); // Логируем всех пользователей для проверки

//     const user = users.find(u => u.id === userId);

//     if (!user) return res.status(404).send('User not found.');
//     res.json(user);
// });


// Загрузка альбома (несколько песен)
router.post('/:id/songs/album', upload.array('files', 10), (req, res) => {
    // Убедитесь, что файлы были загружены
    if (!req.files || req.files.length === 0) return res.status(400).send('No files uploaded.');

    const userId = parseInt(req.params.id, 10);
    const users = readUsersFromFile();
    const user = users.find(u => u.id === userId);

    if (!user) return res.status(404).send('User not found.');

    const songsLimit = user.rateStatus === 'free' ? 1 :
        user.rateStatus === 'album' ? 10 :
        Infinity;

    if (user.songs.length + req.files.length > songsLimit) {
        return res.status(403).send('Song limit exceeded for your subscription level.');
    }

    // Создание папки для пользователя, если она не существует
    const userFolder = path.join(__dirname, '../uploads/Artists', user.id.toString());

    if (!fs.existsSync(userFolder)) {
        fs.mkdirSync(userFolder, { recursive: true });
    }

    req.files.forEach(file => {
        // Сохранение файла с оригинальным именем
        const originalFileName = file.originalname; // Получаем оригинальное имя файла
        const newFilePath = path.join(userFolder, originalFileName);

        // Проверяем, существует ли файл с таким же именем, если да, добавляем номер
        let fileCounter = 1;
        let uniqueFilePath = newFilePath;
        const fileExtension = path.extname(originalFileName);
        const baseName = path.basename(originalFileName, fileExtension);

        while (fs.existsSync(uniqueFilePath)) {
            uniqueFilePath = path.join(userFolder, `${baseName}(${fileCounter++})${fileExtension}`);
        }

        // Переименовать временный файл в конечный
        fs.renameSync(file.path, uniqueFilePath);

        user.songs.push(uniqueFilePath); // Сохраняем путь к файлу пользователя
    });

    writeUsersToFile(users);

    res.send('Album uploaded successfully.');
});


module.exports = router;