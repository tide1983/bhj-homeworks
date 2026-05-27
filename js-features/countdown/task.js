// Получаем элемент таймера из DOM
const timerElement = document.getElementById('timer');

// Начальное значение таймера (в секундах)
let seconds = parseInt(timerElement.textContent);

// Функция обновления таймера
function updateTimer() {
    // Уменьшаем количество секунд
    seconds--;
    
    // Обновляем отображение
    timerElement.textContent = seconds;
    
    // Проверяем, не закончилось ли время
    if (seconds <= 0) {
        clearInterval(timerInterval);
        alert('Вы победили в конкурсе!');
        downloadFile();
    }
}

// Запускаем таймер с интервалом в 1 секунду
const timerInterval = setInterval(updateTimer, 1000);