const pollTitle = document.getElementById('poll__title');
const pollAnswers = document.getElementById('poll__answers');
const apiUrl = 'https://students.netoservices.ru/nestjs-backend/poll';

let currentPollId = null;

// Функция для отображения результатов голосования
function displayResults(stat) {
    // Очищаем контейнер
    pollAnswers.innerHTML = '';
    
    // Подсчитываем общее количество голосов
    const totalVotes = stat.reduce((sum, item) => sum + item.votes, 0);
    
    // Отображаем каждый результат
    stat.forEach(item => {
        const percentage = totalVotes > 0 ? (item.votes / totalVotes * 100).toFixed(1) : 0;
        
        const resultDiv = document.createElement('div');
        resultDiv.className = 'poll__result';
        resultDiv.innerHTML = `
            <div class="poll__answer-text">${item.answer}</div>
            <div class="poll__votes-count">${item.votes} голосов (${percentage}%)</div>
        `;
        pollAnswers.appendChild(resultDiv);
    });
}

// Функция для отправки голоса
function sendVote(pollId, answerIndex) {
    const xhr = new XMLHttpRequest();
    xhr.open('POST', apiUrl);
    xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
    
    xhr.onload = function() {
        if (xhr.status === 201 || xhr.status === 200) {
            const response = JSON.parse(xhr.responseText);
            // Отображаем результаты голосования
            displayResults(response.stat);
        } else {
            console.error('Ошибка при отправке голоса');
            alert('Произошла ошибка. Попробуйте еще раз.');
        }
    };
    
    xhr.onerror = function() {
        console.error('Ошибка сети');
        alert('Произошла ошибка сети. Попробуйте еще раз.');
    };
    
    xhr.send(`vote=${pollId}&answer=${answerIndex}`);
}

// Функция для отображения опроса
function displayPoll(data) {
    currentPollId = data.id;
    pollTitle.textContent = data.data.title;
    pollAnswers.innerHTML = '';
    
    data.data.answers.forEach((answer, index) => {
        const button = document.createElement('button');
        button.className = 'poll__answer';
        button.textContent = answer;
        
        button.addEventListener('click', () => {
            // Показываем сообщение о засчитанном голосе
            alert('Спасибо, ваш голос засчитан!');
            // Отправляем голос на сервер
            sendVote(currentPollId, index);
        });
        
        pollAnswers.appendChild(button);
    });
}

// Загружаем опрос
fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        displayPoll(data);
    })
    .catch(error => {
        console.error('Ошибка:', error);
        pollTitle.textContent = 'Ошибка загрузки опроса';
    });