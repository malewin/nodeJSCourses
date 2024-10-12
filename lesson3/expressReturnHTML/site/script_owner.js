// const validCredentials = { username: 'admin', password: 'password' }; // Замените на ваши данные

// // Функция для инициализации
// function initiate() {
//     const loginForm = document.getElementById('loginForm');
//     const btnSettings = document.getElementById('btn_settings');
//     const loginBtn = document.getElementById('loginBtn');

//     if (btnSettings) {
//         btnSettings.addEventListener('click', () => {
//             loginForm.classList.toggle('hidden');
//         });
//     }

//     if (loginBtn) {
//         loginBtn.addEventListener('click', () => {
//             const username = document.getElementById('username').value;
//             const password = document.getElementById('password').value;

//             if (username === validCredentials.username && password === validCredentials.password) {
//                 // Перенаправление на новую страницу после успешного входа
//                 window.location.href = './ownerPage.html'; // Укажите правильный путь
//             } else {
//                 alert('Неверный логин или пароль');
//             }
//         });
//     }
// }

// // Функция для работы со списком
// function manageItems() {
//     const domainInput = document.getElementById('domainInput');
//     const dealDateInput = document.getElementById('dealDateInput');
//     const rentalsTimeInput = document.getElementById('rentalsTimeInput');
//     const arendatorInput = document.getElementById('arendatorInput');
//     const saveNewBtn = document.getElementById('saveNewBtn');
//     const gridContainer = document.getElementById('gridContainer');

//     // Загружаем элементы при инициализации
//     document.addEventListener('DOMContentLoaded', () => {
//         loadItems();
//     });

//     if (saveNewBtn) {
//         saveNewBtn.addEventListener('click', () => {
//             const domain = domainInput.value;
//             const dealDate = dealDateInput.value;
//             const rentalsTime = rentalsTimeInput.value;
//             const arendator = arendatorInput.value;

//             if (domain && dealDate && rentalsTime && arendator) {
//                 const item = { domain, dealDate, rentalsTime, arendator };
//                 saveItem(item);
//                 renderItems();
//                 clearNewItemInputs();
//             } else {
//                 alert('Пожалуйста, заполните все поля');
//             }
//         });
//     }
// }

// function saveItem(item) {
//     const items = JSON.parse(localStorage.getItem('items')) || [];
//     items.push(item);
//     localStorage.setItem('items', JSON.stringify(items));
// }

// function loadItems() {
//     const items = JSON.parse(localStorage.getItem('items')) || [];
//     items.forEach((item, index) => {
//         renderItem(item, index);
//     });
// }

// function renderItems() {
//     const gridContainer = document.getElementById('gridContainer');
//     if (gridContainer) {
//         gridContainer.innerHTML = ''; // Очищаем контейнер перед обновлением
//         const items = JSON.parse(localStorage.getItem('items')) || [];
//         items.forEach((item, index) => {
//             renderItem(item, index);
//         });
//     }
// }

// function renderItem(item, index) {
//     const gridContainer = document.getElementById('gridContainer');
//     if (gridContainer) {
//         const div = document.createElement('div');
//         div.classList.add('itemRow');

//         const domainElement = `<span class="itemCell">${item.domain}</span>`;
//         const dealDateElement = `<span class="itemCell">${item.dealDate}</span>`;
//         const rentalsTimeElement = `<span class="itemCell">${item.rentalsTime}</span>`;
//         const arendatorElement = `<a href="${item.arendator}" target="_blank" class="itemCell">go to</a>`;

//         div.innerHTML = `
//             <div class="itemCell">${domainElement}</div>
//             <div class="itemCell">${dealDateElement}</div>
//             <div class="itemCell">${rentalsTimeElement}</div>
//             <div class="itemCell">${arendatorElement}</div>
//             <button class="save-btn" onclick="saveEditedItem(${index})"></button>
//             <button class="delete-btn" onclick="deleteItem(${index})"></button>
//         `;

//         gridContainer.appendChild(div);
//     }
// }

// function clearNewItemInputs() {
//     const domainInput = document.getElementById('domainInput');
//     const dealDateInput = document.getElementById('dealDateInput');
//     const rentalsTimeInput = document.getElementById('rentalsTimeInput');
//     const arendatorInput = document.getElementById('arendatorInput');

//     if (domainInput) domainInput.value = '';
//     if (dealDateInput) dealDateInput.value = '';
//     if (rentalsTimeInput) rentalsTimeInput.value = '';
//     if (arendatorInput) arendatorInput.value = '';
// }

// function deleteItem(index) {
//     const items = JSON.parse(localStorage.getItem('items')) || [];
//     items.splice(index, 1); // Удаляем элемент по индексу
//     localStorage.setItem('items', JSON.stringify(items)); // Сохраняем обновленный список
//     renderItems(); // Обновляем отображение элементов
// }

// function saveEditedItem(index) {
//     // Ваш код для редактирования, если такой нужен
//     renderItems(); // Обновляем отображение элементов
// }

// // Вызываем инициализацию для страницы
// window.addEventListener('DOMContentLoaded', () => {
//     if (document.getElementById('loginForm')) {
//         initiate();
//     } else {
//         manageItems();
//     }
// });

const validCredentials = { username: 'admin', password: 'password' }; // Замените на ваши данные

// Функция для инициализации
function initiate() {
    const loginForm = document.getElementById('loginForm');
    const btnSettings = document.getElementById('btn_settings');
    const loginBtn = document.getElementById('loginBtn');

    if (btnSettings) {
        btnSettings.addEventListener('click', () => {
            loginForm.classList.toggle('hidden');
        });
    }

    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            if (username === validCredentials.username && password === validCredentials.password) {
                // Перенаправление на новую страницу после успешного входа
                window.location.href = './ownerPage.html'; // Укажите правильный путь
            } else {
                alert('Неверный логин или пароль');
            }
        });
    }
}

// Функция для управления элементами
function manageItems() {
    const domainInput = document.getElementById('domainInput');
    const dealDateInput = document.getElementById('dealDateInput');
    const rentalsTimeInput = document.getElementById('rentalsTimeInput');
    const arendatorInput = document.getElementById('arendatorInput');
    const saveNewBtn = document.getElementById('saveNewBtn');
    const gridContainer = document.getElementById('gridContainer');

    // Загружаем элементы при инициализации
    loadItems();

    if (saveNewBtn) {
        saveNewBtn.addEventListener('click', () => {
            const domain = domainInput.value;
            const dealDate = dealDateInput.value;
            const rentalsTime = rentalsTimeInput.value;
            const arendator = arendatorInput.value;

            if (domain && dealDate && rentalsTime && arendator) {
                const item = { domain, dealDate, rentalsTime, arendator };
                saveItem(item);
                renderItem(item, (JSON.parse(localStorage.getItem('items')).length - 1)); // Отображаем новый элемент
                clearNewItemInputs();
            } else {
                alert('Пожалуйста, заполните все поля');
            }
        });
    }
}

// Сохранение элемента в localStorage
function saveItem(item) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.push(item);
    localStorage.setItem('items', JSON.stringify(items));
}

// Загрузка всех элементов
function loadItems() {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.forEach((item, index) => {
        renderItem(item, index);
    });
}

// Отображение всех элементов
function renderItems() {
    const gridContainer = document.getElementById('gridContainer');
    if (gridContainer) {
        gridContainer.innerHTML = ''; // Очищаем контейнер перед обновлением
        loadItems(); // Загружаем элементы
    }
}

// Отображение одного элемента
function renderItem(item, index) {
    const gridContainer = document.getElementById('gridContainer');
    if (gridContainer) {
        const div = document.createElement('div');
        div.classList.add('itemRow');

        const domainElement = `<span class="itemCell">${item.domain}</span>`;
        const dealDateElement = `<span class="itemCell">${item.dealDate}</span>`;
        const rentalsTimeElement = `<span class="itemCell">${item.rentalsTime}</span>`;
        const arendatorElement = `<a href="${item.arendator}" target="_blank" class="itemCell">go to</a>`;

        div.innerHTML = `
            <div class="itemCell">${domainElement}</div>
            <div class="itemCell">${rentalsTimeElement}</div>
            <div class="itemCell">${dealDateElement}</div>
            <div class="itemCell">${arendatorElement}</div>
             <button class="delete-btn" onclick="deleteItem(${index})"></button>
        `;

        gridContainer.appendChild(div);
    }
}

// Очистка полей ввода
function clearNewItemInputs() {
    const domainInput = document.getElementById('domainInput');
    const dealDateInput = document.getElementById('dealDateInput');
    const rentalsTimeInput = document.getElementById('rentalsTimeInput');
    const arendatorInput = document.getElementById('arendatorInput');

    if (domainInput) domainInput.value = '';
    if (dealDateInput) dealDateInput.value = '';
    if (rentalsTimeInput) rentalsTimeInput.value = '';
    if (arendatorInput) arendatorInput.value = '';
}

// Удаление элемента
function deleteItem(index) {
    const items = JSON.parse(localStorage.getItem('items')) || [];
    items.splice(index, 1); // Удаляем элемент по индексу
    localStorage.setItem('items', JSON.stringify(items)); // Сохраняем обновленный список
    renderItems(); // Обновляем отображение элементов
}

// Вызываем инициализацию для страницы
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('loginForm')) {
        initiate();
    } else {
        manageItems();
    }
});