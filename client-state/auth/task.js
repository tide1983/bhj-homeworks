const signin = document.getElementById('signin');
const welcome = document.getElementById('welcome');
const userIdSpan = document.getElementById('user_id');
const form = document.getElementById('signin__form');
const btn = document.getElementById('signin__btn');

const STORAGE_KEY = 'user_id';

// Функции для работы с интерфейсом
const ui = {
    showWelcome(userId) {
        userIdSpan.textContent = userId;
        welcome.classList.add('welcome_active');
        signin.classList.remove('signin_active');
    },
    showSignin() {
        signin.classList.add('signin_active');
        welcome.classList.remove('welcome_active');
    },
    clearForm() {
        form.reset();
    },
    setLoading(isLoading) {
        btn.disabled = isLoading;
        btn.textContent = isLoading ? 'Загрузка...' : 'Войти';
    }
};

// Функции для работы с localStorage
const storage = {
    save(userId) {
        localStorage.setItem(STORAGE_KEY, userId);
    },
    get() {
        return localStorage.getItem(STORAGE_KEY);
    },
    clear() {
        localStorage.removeItem(STORAGE_KEY);
    }
};

// Создание кнопки выхода
function addLogoutButton() {
    if (!document.getElementById('logout-btn')) {
        const logoutBtn = document.createElement('button');
        logoutBtn.id = 'logout-btn';
        logoutBtn.textContent = 'Выйти';
        logoutBtn.className = 'btn';
        logoutBtn.style.marginTop = '10px';
        logoutBtn.style.backgroundColor = '#dc3545';
        welcome.appendChild(logoutBtn);
        
        logoutBtn.addEventListener('click', () => {
            storage.clear();
            ui.showSignin();
            ui.clearForm();
            logoutBtn.remove();
        });
    }
}

// Проверка сохранённой сессии
const savedUserId = storage.get();
if (savedUserId) {
    ui.showWelcome(savedUserId);
    addLogoutButton();
} else {
    ui.showSignin();
}

// Обработка отправки формы
form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const login = form.querySelector('[name="login"]').value.trim();
    const password = form.querySelector('[name="password"]').value.trim();
    
    if (!login || !password) {
        alert('Заполните оба поля');
        return;
    }
    
    ui.setLoading(true);
    
    const formData = new FormData(form);
    
    fetch('https://students.netoservices.ru/nestjs-backend/auth', {
        method: 'POST',
        body: formData
    })
    .then(res => res.json())
    .then(data => {
        if (data.success) {
            storage.save(data.user_id);
            ui.showWelcome(data.user_id);
            ui.clearForm();
            addLogoutButton();
        } else {
            alert('Неверный логин/пароль');
        }
    })
    .catch(() => alert('Ошибка соединения'))
    .finally(() => ui.setLoading(false));
});