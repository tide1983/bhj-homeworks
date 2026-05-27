// Находим все ротаторы на странице
const rotators = document.querySelectorAll('.rotator');

// Функция для запуска одного ротатора
function startRotator(rotator) {
  const cases = Array.from(rotator.querySelectorAll('.rotator__case'));
  if (cases.length === 0) return;

  let currentIndex = cases.findIndex(item => item.classList.contains('rotator__case_active'));
  if (currentIndex === -1) {
    currentIndex = 0;
    cases[0].classList.add('rotator__case_active');
  }

  function applyStyle(element) {
    // Применяем цвет из data-color, если он задан
    const color = element.dataset.color;
    if (color) {
      element.style.color = color;
    }
  }

  function rotate() {
    // Удаляем активный класс и сбрасываем цвет
    cases[currentIndex].classList.remove('rotator__case_active');
    cases[currentIndex].style.color = '';
    
    // Переходим к следующему элементу
    currentIndex = (currentIndex + 1) % cases.length;
    
    // Добавляем активный класс и применяем стили
    cases[currentIndex].classList.add('rotator__case_active');
    applyStyle(cases[currentIndex]);
    
    // Получаем скорость для следующего переключения
    const speed = parseInt(cases[currentIndex].dataset.speed, 10);
    if (speed && !isNaN(speed)) {
      clearInterval(interval);
      interval = setInterval(rotate, speed);
    }
  }

  // Применяем стили к активному элементу при старте
  applyStyle(cases[currentIndex]);
  
  // Получаем начальную скорость (по умолчанию 1000 мс)
  let speed = 1000;
  const initialSpeed = parseInt(cases[currentIndex].dataset.speed, 10);
  if (initialSpeed && !isNaN(initialSpeed)) {
    speed = initialSpeed;
  }
  
  // Запускаем интервал
  let interval = setInterval(rotate, speed);
}

// Запускаем все ротаторы
rotators.forEach(startRotator);