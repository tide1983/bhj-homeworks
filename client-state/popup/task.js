// Находим элементы
const modal = document.getElementById('subscribe-modal');
const closeButton = document.querySelector('.modal__close');

// Ключ для cookie
const COOKIE_NAME = 'modalClosed';

// Функция получения cookie по имени
function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        return parts.pop().split(';').shift();
    }
    return null;
}

// Функция установки cookie
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value}; ${expires}; path=/`;
}

// Функция закрытия модального окна
function closeModal() {
    modal.classList.remove('modal_active');
    // Устанавливаем cookie, что окно было закрыто
    setCookie(COOKIE_NAME, 'true', 365);
}

// Функция открытия модального окна
function openModal() {
    modal.classList.add('modal_active');
}

// Проверяем, было ли окно закрыто ранее
const isModalClosed = getCookie(COOKIE_NAME);

// Если в cookie нет информации о закрытии, показываем окно
if (!isModalClosed) {
    openModal();
}

// Добавляем обработчик на кнопку закрытия
closeButton.addEventListener('click', closeModal);