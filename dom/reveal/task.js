// Находим все элементы, которые нужно отслеживать
const revealBlocks = document.querySelectorAll('.reveal');

// Функция для проверки видимости элемента
function isElementInViewport(element) {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  // Проверяем, виден ли элемент хотя бы частично
  const isVisible = (
    rect.top < windowHeight &&    // верхняя граница выше нижней границы окна
    rect.bottom > 0 &&            // нижняя граница ниже верхней границы окна
    rect.left < windowWidth &&    // левая граница левее правой границы окна
    rect.right > 0                // правая граница правее левой границы окна
  );

  return isVisible;
}

// Функция для обработки всех блоков
function checkVisibility() {
  revealBlocks.forEach(block => {
    if (isElementInViewport(block)) {
      // Если элемент виден, добавляем класс reveal_active
      block.classList.add('reveal_active');
    } else {
      // Если элемент не виден, удаляем класс reveal_active
      block.classList.remove('reveal_active');
    }
  });
}

// Отслеживаем событие прокрутки
window.addEventListener('scroll', checkVisibility);

// Проверяем видимость при загрузке страницы (на случай, если блоки уже видны)
checkVisibility();