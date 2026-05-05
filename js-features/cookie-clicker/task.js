// Получаем элементы из DOM
const cookie = document.getElementById('cookie');
const clickerCounter = document.getElementById('clicker__counter');

// Флаг для отслеживания размера печеньки
let isCookieBig = false;

// Переменная для хранения времени последнего клика
let lastClickTime = Date.now();

// Создаём элемент для отображения скорости клика
const speedDisplay = document.createElement('div');
speedDisplay.id = 'clicker__speed';
speedDisplay.style.marginTop = '15px';
speedDisplay.style.fontSize = '18px';
speedDisplay.style.fontWeight = 'bold';
speedDisplay.textContent = 'Скорость клика: 0 кликов/сек';

// Добавляем элемент на страницу после счётчика
clickerCounter.parentNode.insertBefore(speedDisplay, clickerCounter.nextSibling);

// Функция для обновления скорости клика
function updateClickSpeed() {
    const currentTime = Date.now();
    const timeDifference = (currentTime - lastClickTime) / 1000; // в секундах
    
    if (timeDifference > 0) {
        const speed = (1 / timeDifference).toFixed(2);
        speedDisplay.textContent = `Скорость клика: ${speed} кликов/сек`;
    }
    
    lastClickTime = currentTime;
}

// Обработчик клика на печеньку
cookie.addEventListener('click', function() {
    // Увеличиваем счётчик кликов
    let currentClicks = parseInt(clickerCounter.textContent);
    currentClicks++;
    clickerCounter.textContent = currentClicks;
    
    // Обновляем скорость клика
    updateClickSpeed();
    
    // Чередуем размер печеньки
    if (isCookieBig) {
        // Уменьшаем печеньку до исходного размера
        cookie.style.width = '200px';
        cookie.style.height = '200px';
    } else {
        // Увеличиваем печеньку
        cookie.style.width = '250px';
        cookie.style.height = '250px';
    }
    
    // Меняем флаг на противоположный
    isCookieBig = !isCookieBig;
});