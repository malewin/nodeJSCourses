const tonConnectUI = new TON_CONNECT_UI.TonConnectUI({
    manifestUrl: 'https://ton-connect.github.io/demo-dapp-with-react-ui/tonconnect-manifest.json',
    buttonRootId: 'ton_connect_button'
});

tonConnectUI.onStatusChange(console.log);

async function createAccount() {
    // Пример логики создания аккаунта
    const data = { /* Данные аккаунта */ };
    await axios.post('/api/createAccount', data);
    // Обновление интерфейса или редирект
}

async function createSong() {
    // Пример логики создания песни
    const data = { /* Данные песни */ };
    await axios.post('/api/createSong', data);
    // Обновление интерфейса
}

async function createAlbum() {
    const files = document.getElementById('albumFile').files;
    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file);
    }

    await axios.post('/api/createAlbum', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
    // Обновление интерфейса
}

async function getUser(userId) {
    const response = await axios.get(`/api/getUser/${userId}`);
    return response.data;
}

async function getAllUsers() {
    const response = await axios.get('/api/getAllUsers');
    return response.data;
}

async function getAllSongsOfUser(userId) {
    const response = await axios.get(`/api/getAllSongsOfUser/${userId}`);
    return response.data;
}

async function updateAccount(userId, data) {
    await axios.put(`/api/updateAccount/${userId}`, data);
    // Обновление интерфейса
}

async function deleteAccount(userId) {
    await axios.delete(`/api/deleteAccount/${userId}`);
    // Обновление интерфейса
}

async function deleteSong(songId) {
    await axios.delete(`/api/deleteSong/${songId}`);
    // Обновление интерфейса
}

async function purchaseSubscription() {
    const subscription = document.querySelector('input[name="subscription"]:checked').value;
    const userId = 'yourUserId'; // Получите ID текущего пользователя
    await updateAccount(userId, { hasPaySubscribe: true, rateStatus: subscription });
    // Обновление интерфейса
}

// Логика для добавления аудиофайлов в список на странице создания альбома
document.getElementById('albumFile').addEventListener('change', (event) => {
    const audioList = document.getElementById('audioList');
    audioList.innerHTML = ''; // Очистить список

    for (const file of event.target.files) {
        const listItem = document.createElement('li');
        listItem.textContent = file.name;
        audioList.appendChild(listItem);
    }
});