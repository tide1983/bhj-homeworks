// Находим элементы
const loader = document.getElementById('loader');
const itemsContainer = document.getElementById('items');

// URL для запроса
const apiUrl = 'https://students.netoservices.ru/nestjs-backend/slow-get-courses';

// Функция для отображения курсов валют
function displayCurrencies(valutes) {
    // Очищаем контейнер
    itemsContainer.innerHTML = '';
    
    // Перебираем все валюты
    for (const key in valutes) {
        const currency = valutes[key];
        
        // Создаём элемент валюты
        const item = document.createElement('div');
        item.className = 'item';
        
        // Создаём и добавляем код валюты
        const codeDiv = document.createElement('div');
        codeDiv.className = 'item__code';
        codeDiv.textContent = currency.CharCode;
        item.appendChild(codeDiv);
        
        // Создаём и добавляем значение
        const valueDiv = document.createElement('div');
        valueDiv.className = 'item__value';
        valueDiv.textContent = currency.Value;
        item.appendChild(valueDiv);
        
        // Создаём и добавляем валюту
        const currencyDiv = document.createElement('div');
        currencyDiv.className = 'item__currency';
        currencyDiv.textContent = 'руб.';
        item.appendChild(currencyDiv);
        
        // Добавляем элемент в контейнер
        itemsContainer.appendChild(item);
    }
}

// Показываем анимацию загрузки (кружочек или гифку)
loader.classList.add('loader_active');

// Выполняем GET-запрос
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Получаем объект с валютами
        const valutes = data.response.Valute;
        
        // Отображаем валюты
        displayCurrencies(valutes);
        
        // Скрываем анимацию загрузки
        loader.classList.remove('loader_active');
    })
    .catch(error => {
        console.error('Ошибка загрузки:', error);
        // Скрываем анимацию в случае ошибки
        loader.classList.remove('loader_active');
        // Показываем сообщение об ошибке
        itemsContainer.innerHTML = '<div style="color: red;">Ошибка загрузки курсов валют</div>';
    });