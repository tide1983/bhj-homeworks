(function() {
    'use strict';

    // --- 1. Ищем элементы по вашим ID (с двойным подчеркиванием) ---
    const taskInput = document.getElementById('task__input');
    const taskList = document.getElementById('tasks__list');
    const addButton = document.getElementById('tasks__add');
    const form = document.getElementById('tasks__form');

    console.log('Скрипт запущен!');
    console.log('Поле ввода:', taskInput);
    console.log('Список задач:', taskList);

    // --- 2. Функция сохранения в localStorage ---
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('.task__title').forEach(title => {
            tasks.push(title.textContent.trim());
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // --- 3. Функция загрузки из localStorage ---
    function loadTasks() {
        const saved = localStorage.getItem('tasks');
        if (saved) {
            try {
                const tasks = JSON.parse(saved);
                tasks.forEach(text => addTaskToDOM(text));
            } catch (e) {
                console.error('Ошибка загрузки:', e);
            }
        }
    }

    // --- 4. Функция создания задачи в DOM ---
    function addTaskToDOM(text) {
        // Создаем контейнер задачи
        const task = document.createElement('div');
        task.className = 'task';

        // Создаем текст задачи
        const title = document.createElement('div');
        title.className = 'task__title';
        title.textContent = text;

        // Создаем кнопку удаления
        const removeBtn = document.createElement('a');
        removeBtn.className = 'task__remove';
        removeBtn.href = '#';
        removeBtn.textContent = '×';

        // Обработчик удаления
        removeBtn.addEventListener('click', function(e) {
            e.preventDefault();
            this.parentElement.remove();
            saveTasks();
        });

        // Собираем задачу
        task.appendChild(title);
        task.appendChild(removeBtn);
        taskList.appendChild(task);
    }

    // --- 5. Функция добавления задачи ---
    function handleAddTask() {
        const text = taskInput.value.trim();
        if (text !== '') {
            addTaskToDOM(text);
            saveTasks();
            taskInput.value = '';
        }
    }

    // --- 6. Обработчики событий ---

    // Добавление по Enter
    taskInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            e.preventDefault();
            handleAddTask();
        }
    });

    // Добавление по кнопке "Добавить"
    if (addButton) {
        addButton.addEventListener('click', function(e) {
            e.preventDefault();
            handleAddTask();
        });
    }

    // Блокировка отправки формы
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
        });
    }

    // --- 7. Загрузка задач при старте ---
    loadTasks();

})();