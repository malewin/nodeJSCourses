const express = require('express');
const joi = require('joi');
const path = require('path');
const fs = require('fs').promises;

const app = express();
const dataUsers = path.resolve(__dirname, "users.json");
let uniqueID = 0;
let users = [];

// Проверка наличия файла и его создание
async function initUsers() {
    try {
        await fs.access(dataUsers);
        const data = await fs.readFile(dataUsers);
        users = JSON.parse(data);
        uniqueID = users.length ? Math.max(users.map(user => user.id)) : 0;
    } catch {
        await fs.writeFile(dataUsers, JSON.stringify([], null, 4));
    }
}

const userSchema = joi.object({
    firstName: joi.string().min(1).required(),
    secondName: joi.string().min(1).required(),
    age: joi.number().min(0).max(150).required(),
    city: joi.string().min(1),
});

app.use(express.json());

app.get('/users', (req, res) => {
    res.send({ users });
});

app.get('/users/:id', (req, res) => {
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        res.send({ user });
    } else {
        res.status(404).send({ user: null });
    }
});

app.post("/users", async(req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }
    uniqueID += 1;
    const newUser = { id: uniqueID, ...req.body };
    users.push(newUser);
    await fs.writeFile(dataUsers, JSON.stringify(users, null, 4));
    res.send({ id: uniqueID });
});

app.put('/users/:id', async(req, res) => {
    const result = userSchema.validate(req.body);
    if (result.error) {
        return res.status(400).send({ error: result.error.details });
    }
    const userId = Number(req.params.id);
    const user = users.find(user => user.id === userId);
    if (user) {
        Object.assign(user, req.body);
        await fs.writeFile(dataUsers, JSON.stringify(users, null, 4));
        res.send({ user });
    } else {
        res.status(404).send({ user: null });
    }
});

app.delete('/users/:id', async(req, res) => {
    const userId = Number(req.params.id);
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        const deletedUser = users.splice(userIndex, 1)[0];
        await fs.writeFile(dataUsers, JSON.stringify(users, null, 4));
        res.send({ user: deletedUser });
    } else {
        res.status(404).send({ user: null });
    }
});

const port = 3000;

initUsers().then(() => {
    app.listen(port, () => {
        console.log(`Сервер запущен на порту ${port}`);
    });
});