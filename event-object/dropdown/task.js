// Находим все элементы dropdown на странице
const dropdowns = document.querySelectorAll('.dropdown');

// Перебираем каждый найденный dropdown
dropdowns.forEach(dropdown => {
    // Находим элементы внутри текущего dropdown: значение и список
    const valueElement = dropdown.querySelector('.dropdown__value');
    const listElement = dropdown.querySelector('.dropdown__list');
    
    // --- 1. Обработчик клика на кнопку (значение) ---
    // Отвечает за открытие/закрытие списка
    valueElement.addEventListener('click', function(e) {
        // Переключаем класс активности
        // Если класс есть - убираем, если нет - добавляем
        listElement.classList.toggle('dropdown__list_active');
    });

    // --- 2. Обработчик клика на пункты списка ---
    // Используем делегирование событий: вешаем обработчик на список, 
    // так как пунктов много и они могут быть динамическими
    listElement.addEventListener('click', function(e) {
        const link = e.target.closest('.dropdown__link'); // Ищем ссылку, по которой кликнули
        
        // Если кликнули не по ссылке (например, по пустому месту списка) — ничего не делаем
        if (!link) return;

        // --- Запрещаем переход по ссылке ---
        e.preventDefault();

        // --- Устанавливаем новое значение ---
        // Текст ссылки заменяем текст в элементе value
        valueElement.textContent = link.textContent;

        // --- Закрываем список ---
        listElement.classList.remove('dropdown__list_active');
    });
});