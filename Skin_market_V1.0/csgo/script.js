document.addEventListener('DOMContentLoaded', function() {
    const skinGrid = document.querySelector('.skin-grid');
    const qualityFilter = document.getElementById('quality-filter');
    const usernameDisplay = document.getElementById('username-display');
    const logoutButton = document.getElementById('logout-button');
    const isLoggedIn = localStorage.getItem('isLoggedIn');

    // Функция для создания шкалы паттерна (если нужна)
    function createPatternBar(patternValue) {
        const patternBarContainer = document.createElement('div');
        patternBarContainer.classList.add('pattern-bar-container');

        const patternBarPointer = document.createElement('div');
        patternBarPointer.classList.add('pattern-bar-pointer');
        patternBarPointer.style.left = `${patternValue * 100}%`;

        const patternValueDisplay = document.createElement('div');
        patternValueDisplay.classList.add('pattern-value');
        patternValueDisplay.textContent = patternValue.toFixed(2);

        patternBarContainer.appendChild(patternBarPointer);
        patternBarContainer.appendChild(patternValueDisplay);
        return patternBarContainer;
    }

    // Функция для создания карточки скина
    function createSkinCard(skin) {
        const card = document.createElement('div');
        card.classList.add('skin-card');

        const img = document.createElement('img');
        img.src = skin.image;
        img.alt = skin.name;
        card.appendChild(img);

        const h3 = document.createElement('h3');
        h3.textContent = skin.name;
        card.appendChild(h3);

        const pQuality = document.createElement('p');
        pQuality.classList.add('quality');
        pQuality.textContent = `Якість: ${skin.quality}`;
        card.appendChild(pQuality);

        const patternBar = createPatternBar(skin.pattern); // Используем функцию
        card.appendChild(patternBar);

        const pPrice = document.createElement('p');
        pPrice.textContent = `Ціна: ${skin.price} UAH`;
        card.appendChild(pPrice);

        const buyButton = document.createElement('button');
        buyButton.classList.add('buy-button');
        buyButton.textContent = 'Купити';
        buyButton.addEventListener('click', () => {
            //  логика покупки
            alert(`Куплено: ${skin.name}`); //  заглушка
        });
        card.appendChild(buyButton);

        return card;
    }

    // Функция для отображения скинов
    function displaySkins(skins) {
        skinGrid.innerHTML = ''; // Очищаем контейнер
        skins.forEach(skin => {
            const card = createSkinCard(skin);
              if (card) {
                skinGrid.appendChild(card);
            }
        });
    }

    // Функция для фильтрации скинов (пример)
    function filterSkins(quality) {
        let filteredSkins = skinsData; //  skinsData
        if (quality) {
            filteredSkins = skinsData.filter(skin => skin.quality === quality);
        }
        displaySkins(filteredSkins);
    }

     //  данные о скинах (пока в JS, потом с сервера)
     const skinsData = [
        {
            name: 'AK-47 | Redline',
            quality: 'Factory New',
            pattern: 0.25,
            price: 2500,
            image: 'images/ak47_redline_fn.jpg', //  путь к изображению
        },
        {
            name: 'AWP | Asiimov',
            quality: 'Minimal Wear',
            pattern: 0.7,
            price: 3000,
            image: 'images/awp_asiimov_mw.jpg',
        },
        {
            name: 'M4A1-S | Hyper Beast',
            quality: 'Field-Tested',
            pattern: 0.5,
            price: 1400,
            image: 'images/m4a1s_hyper_beast_ft.jpg',
        },
        {
            name: 'Desert Eagle | Blaze',
            quality: 'Well-Worn',
            pattern: 0.3,
            price: 800,
            image: 'images/deagle_blaze_ww.jpg',
        },
        {
            name: 'Glock-18 | Fade',
            quality: 'Battle-Scarred',
            pattern: 0.9,
            price: 500,
            image: 'images/glock_fade_bs.jpg',
        },

    ];


    // Обработчик изменения фильтра (если нужен)
    if (qualityFilter) { // Проверяем, есть ли вообще фильтр на странице
        qualityFilter.addEventListener('change', function() {
            const selectedQuality = this.value;
            filterSkins(selectedQuality);
        });
    }

    // Обработчик для кнопки выхода (если нужен)
    if (logoutButton) { // Проверяем, есть ли кнопка
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('isLoggedIn');
            if (usernameDisplay) {
                usernameDisplay.textContent = 'Користувач: ';
            }
            window.location.href = '../index.html'; // Перенаправляем на главную
        });
    }

    // Отображаем имя пользователя, если залогинен
    if (isLoggedIn === 'true' && usernameDisplay) {
        usernameDisplay.textContent = `Користувач: Данііл`;
    }

    // Инициализация: отображаем скины
    displaySkins(skinsData);
});