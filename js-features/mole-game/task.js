// Получаем элементы для отображения счётчиков
const dead = document.getElementById('dead');
const lost = document.getElementById('lost');

// Создаём элементы для игровой статистики
const gameStatus = document.createElement('div');
gameStatus.id = 'game-status';
gameStatus.style.cssText = `
    text-align: center;
    margin-top: 20px;
    font-size: 24px;
    font-weight: bold;
`;

const restartButton = document.createElement('button');
restartButton.textContent = 'Начать заново';
restartButton.style.cssText = `
    display: block;
    margin: 20px auto;
    padding: 10px 20px;
    font-size: 16px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
`;

// Добавляем элементы на страницу
document.body.appendChild(gameStatus);
document.body.appendChild(restartButton);

// Константы игры
const WIN_SCORE = 10;
const LOSE_SCORE = 5;
let gameActive = true;

// Функция для получения лунки по индексу
function getHole(index) {
    return document.getElementById(`hole${index}`);
}

// Функция для получения текущего счёта
function getScore() {
    return {
        dead: parseInt(dead.textContent),
        lost: parseInt(lost.textContent)
    };
}

// Функция для обновления счёта
function updateScore(type) {
    const element = type === 'dead' ? dead : lost;
    element.textContent = parseInt(element.textContent) + 1;
    
    // Анимация изменения счёта
    element.style.transform = 'scale(1.5)';
    element.style.transition = 'transform 0.3s ease';
    setTimeout(() => {
        element.style.transform = 'scale(1)';
    }, 300);
}

// Функция обновления статуса игры
function updateGameStatus() {
    const { dead: deadScore, lost: lostScore } = getScore();
    const remainingWins = WIN_SCORE - deadScore;
    const remainingLosses = LOSE_SCORE - lostScore;
    
    gameStatus.textContent = `До победы: ${remainingWins} | Осталось промахов: ${remainingLosses}`;
    gameStatus.style.color = remainingLosses <= 2 ? '#ff4444' : '#333';
}

// Функция показа сообщения
function showMessage(message, isWin) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background-color: ${isWin ? 'rgba(76, 175, 80, 0.9)' : 'rgba(244, 67, 54, 0.9)'};
        color: white;
        padding: 20px 40px;
        border-radius: 10px;
        font-size: 24px;
        z-index: 1000;
        animation: fadeIn 0.5s;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.style.animation = 'fadeOut 0.5s';
        setTimeout(() => {
            document.body.removeChild(messageDiv);
        }, 500);
    }, 2000);
}

// Функция проверки окончания игры
function checkGameOver() {
    const { dead: deadScore, lost: lostScore } = getScore();
    
    if (deadScore >= WIN_SCORE && gameActive) {
        gameActive = false;
        showMessage('🎉 Поздравляем! Вы победили!', true);
        gameStatus.textContent = 'Победа! Нажмите "Начать заново"';
        gameStatus.style.color = '#4CAF50';
        return true;
    }
    
    if (lostScore >= LOSE_SCORE && gameActive) {
        gameActive = false;
        showMessage('😞 Вы проиграли! Попробуйте ещё раз.', false);
        gameStatus.textContent = 'Поражение! Нажмите "Начать заново"';
        gameStatus.style.color = '#F44336';
        return true;
    }
    
    return false;
}

// Функция сброса игры
function resetGame() {
    dead.textContent = '0';
    lost.textContent = '0';
    gameActive = true;
    gameStatus.textContent = '';
    gameStatus.style.color = '#333';
}

// Функция обработки клика по лунке
function createHoleHandler(index) {
    return function(event) {
        if (!gameActive) return;
        
        const hole = event.currentTarget;
        const { dead: deadScore, lost: lostScore } = getScore();
        
        if (hole.classList.contains('hole_has-mole')) {
            // Попадание по кроту
            updateScore('dead');
            
            // Визуальный эффект попадания
            hole.style.backgroundColor = 'rgba(76, 175, 80, 0.5)';
            hole.style.transform = 'scale(0.9)';
            
            // Создаём эффект частиц
            createParticles(event.clientX, event.clientY, '#4CAF50');
            
            setTimeout(() => {
                hole.style.backgroundColor = '';
                hole.style.transform = '';
            }, 200);
            
            // Звук попадания (опционально)
            playSound('hit');
        } else {
            // Промах
            updateScore('lost');
            
            // Визуальный эффект промаха
            hole.style.backgroundColor = 'rgba(244, 67, 54, 0.5)';
            hole.style.animation = 'shake 0.3s';
            
            setTimeout(() => {
                hole.style.backgroundColor = '';
                hole.style.animation = '';
            }, 300);
            
            // Звук промаха (опционально)
            playSound('miss');
        }
        
        // Обновляем статус игры
        updateGameStatus();
        
        // Проверяем условия окончания
        checkGameOver();
    };
}

// Функция создания эффекта частиц
function createParticles(x, y, color) {
    for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: fixed;
            left: ${x}px;
            top: ${y}px;
            width: 5px;
            height: 5px;
            background-color: ${color};
            border-radius: 50%;
            pointer-events: none;
            z-index: 999;
            animation: particle 0.6s ease-out forwards;
        `;
        
        const angle = (Math.PI * 2 * i) / 10;
        const velocity = 50 + Math.random() * 50;
        particle.style.setProperty('--tx', Math.cos(angle) * velocity + 'px');
        particle.style.setProperty('--ty', Math.sin(angle) * velocity + 'px');
        
        document.body.appendChild(particle);
        
        setTimeout(() => {
            document.body.removeChild(particle);
        }, 600);
    }
}

// Функция воспроизведения звука (заглушка)
function playSound(type) {
    // Здесь можно добавить воспроизведение звуков
    // console.log(`Playing ${type} sound`);
}

// Регистрируем обработчики для всех лунок
function initGame() {
    for (let i = 1; i <= 9; i++) {
        const hole = getHole(i);
        if (hole) {
            hole.addEventListener('click', createHoleHandler(i));
        }
    }
    
    // Обработчик для кнопки перезапуска
    restartButton.addEventListener('click', resetGame);
}

// Добавляем необходимые стили
const styles = document.createElement('style');
styles.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-5px); }
        75% { transform: translateX(5px); }
    }
    
    @keyframes fadeIn {
        from { opacity: 0; transform: translate(-50%, -60%); }
        to { opacity: 1; transform: translate(-50%, -50%); }
    }
    
    @keyframes fadeOut {
        from { opacity: 1; transform: translate(-50%, -50%); }
        to { opacity: 0; transform: translate(-50%, -40%); }
    }
    
    @keyframes particle {
        to {
            transform: translate(var(--tx), var(--ty)) scale(0);
            opacity: 0;
        }
    }
`;
document.head.appendChild(styles);

// Инициализация игры при загрузке страницы
initGame();