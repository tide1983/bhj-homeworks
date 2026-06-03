const editor = document.getElementById('editor');
const STORAGE_KEY = 'text-editor-content';

// Функция загрузки сохранённого текста
function loadSavedText() {
    const savedText = localStorage.getItem(STORAGE_KEY);
    if (savedText !== null) {
        editor.value = savedText;
    }
}

// Функция сохранения текста
function saveText() {
    localStorage.setItem(STORAGE_KEY, editor.value);
}

// Функция очистки содержимого
function clearContent() {
    editor.value = '';
    localStorage.removeItem(STORAGE_KEY);
}

// Загружаем сохранённый текст
loadSavedText();

// Сохраняем текст при каждом изменении
editor.addEventListener('input', saveText);

// Создаём и добавляем кнопку очистки (если её нет в HTML)
if (!document.getElementById('clear-button')) {
    const clearButton = document.createElement('button');
    clearButton.id = 'clear-button';
    clearButton.textContent = 'Очистить содержимое';
    clearButton.style.marginTop = '10px';
    clearButton.style.padding = '8px 16px';
    clearButton.style.backgroundColor = '#dc3545';
    clearButton.style.color = 'white';
    clearButton.style.border = 'none';
    clearButton.style.borderRadius = '4px';
    clearButton.style.cursor = 'pointer';
    
    // Добавляем кнопку после textarea
    const card = document.querySelector('.card');
    if (card) {
        card.appendChild(clearButton);
    }
    
    clearButton.addEventListener('click', clearContent);
} else {
    // Если кнопка уже есть в HTML
    const clearButton = document.getElementById('clear-button');
    clearButton.addEventListener('click', clearContent);
}