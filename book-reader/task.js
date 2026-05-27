/* 
 * Домашнее задание к занятию 2.1 «DOM».
 * Онлайн-читалка (Полная версия)
 */

(function() {
    'use strict';

    // Находим основной элемент книги
    const book = document.getElementById('book');

    // --- 1. УПРАВЛЕНИЕ РАЗМЕРОМ ШРИФТА ---
    
    const fontSizeControls = document.querySelector('.book__control_font-size');
    
    if (fontSizeControls) {
        fontSizeControls.addEventListener('click', function(event) {
            const target = event.target.closest('.font-size');
            if (!target) return;

            event.preventDefault();

            // Убираем активный класс у всех кнопок размера
            const allSizes = this.querySelectorAll('.font-size');
            allSizes.forEach(item => item.classList.remove('font-size_active'));

            // Добавляем активный класс на нажатую кнопку
            target.classList.add('font-size_active');

            // Управляем классами книги
            const size = target.dataset.size;
            
            book.classList.remove('book_fs-big', 'book_fs-small');

            if (size) {
                book.classList.add(`book_fs-${size}`);
            }
        });
    }

    // --- 2. УПРАВЛЕНИЕ ЦВЕТОМ ТЕКСТА ---
    
    const textColorControls = document.querySelector('.book__control_color');
    
    if (textColorControls) {
        textColorControls.addEventListener('click', function(event) {
            const target = event.target.closest('.color');
            if (!target) return;

            event.preventDefault();

            // Убираем активный класс у всех кнопок цвета в этой панели
            const allColors = this.querySelectorAll('.color');
            allColors.forEach(item => item.classList.remove('color_active'));

            // Добавляем активный класс на нажатую кнопку
            target.classList.add('color_active');

            // Получаем значение цвета
            const color = target.dataset.textColor;

            // Удаляем старые классы цвета текста
            book.classList.remove('book_color-gray', 'book_color-whitesmoke', 'book_color-black');

            // Добавляем новый класс, если он есть
            if (color) {
                book.classList.add(`book_color-${color}`);
            }
        });
    }

    // --- 3. УПРАВЛЕНИЕ ЦВЕТОМ ФОНА ---
    
    const bgColorControls = document.querySelector('.book__control_background');
    
    if (bgColorControls) {
        bgColorControls.addEventListener('click', function(event) {
            const target = event.target.closest('.color');
            if (!target) return;

            event.preventDefault();

            // Убираем активный класс у всех кнопок фона
            const allColors = this.querySelectorAll('.color');
            allColors.forEach(item => item.classList.remove('color_active'));

            // Добавляем активный класс на нажатую кнопку
            target.classList.add('color_active');

            // Получаем значение фона
            const bg = target.dataset.bgColor;

            // Удаляем старые классы фона
            book.classList.remove('book_bg-gray', 'book_bg-black', 'book_bg-white');

            // Добавляем новый класс, если он есть
            if (bg) {
                book.classList.add(`book_bg-${bg}`);
            }
        });
    }

})();