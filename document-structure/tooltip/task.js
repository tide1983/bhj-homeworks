/* 
 * Домашнее задание к занятию 2.3 «Изменение структуры HTML-документа».
 * Всплывающая подсказка
 */

(function() {
    'use strict';

    // Находим все элементы, которым нужна подсказка
    const tooltipElements = document.querySelectorAll('.has-tooltip');

    // Переменная для хранения активной подсказки (чтобы закрывать старую)
    let activeTooltip = null;

    // Функция для создания и позиционирования подсказки
    function showTooltip(element) {
        // 1. Если уже есть открытая подсказка — удаляем её
        if (activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
        }

        // 2. Получаем текст подсказки из атрибута title
        const title = element.getAttribute('title');
        if (!title) return;

        // 3. Создаем элемент подсказки
        const tooltip = document.createElement('div');
        tooltip.className = 'tooltip tooltip_active';
        tooltip.textContent = title;

        // 4. Определяем позицию (по умолчанию bottom)
        const position = element.getAttribute('data-position') || 'bottom';

        // 5. Получаем координаты элемента, на который кликнули
        const elementRect = element.getBoundingClientRect();

        // 6. Вычисляем координаты подсказки в зависимости от позиции
        let top = 0;
        let left = 0;

        switch (position) {
            case 'top':
                top = elementRect.top - tooltip.offsetHeight - 5; // 5px отступ
                left = elementRect.left + (elementRect.width / 2) - (tooltip.offsetWidth / 2);
                break;
            case 'left':
                top = elementRect.top + (elementRect.height / 2) - (tooltip.offsetHeight / 2);
                left = elementRect.left - tooltip.offsetWidth - 5;
                break;
            case 'right':
                top = elementRect.top + (elementRect.height / 2) - (tooltip.offsetHeight / 2);
                left = elementRect.right + 5;
                break;
            case 'bottom':
            default:
                top = elementRect.bottom + 5;
                left = elementRect.left + (elementRect.width / 2) - (tooltip.offsetWidth / 2);
                break;
        }

        // 7. Применяем стили позиционирования
        tooltip.style.top = top + 'px';
        tooltip.style.left = left + 'px';

        // 8. Добавляем подсказку в DOM (в body)
        document.body.appendChild(tooltip);

        // 9. Сохраняем ссылку на активную подсказку
        activeTooltip = tooltip;
    }

    // Функция для удаления подсказки (опционально, если нужно при клике вне)
    function removeTooltip() {
        if (activeTooltip) {
            activeTooltip.remove();
            activeTooltip = null;
        }
    }

    // Обработчик кликов
    document.addEventListener('click', function(event) {
        // Находим ближайший элемент с классом has-tooltip (на случай клика внутри)
        const target = event.target.closest('.has-tooltip');
        
        if (target) {
            // Отменяем стандартное поведение ссылки
            event.preventDefault();
            
            // Показываем подсказку
            showTooltip(target);
        } else {
            // Если кликнули не по элементу с подсказкой — скрываем её (удобно для UX)
            removeTooltip();
        }
    });

})();