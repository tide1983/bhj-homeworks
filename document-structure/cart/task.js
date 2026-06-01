(function() {
    'use strict';

    // --- 1. Поиск элементов ---
    const products = document.querySelectorAll('.product');
    const cartProducts = document.querySelector('.cart__products');
    const cartContainer = document.querySelector('.cart');

    // --- 2. Функция сохранения корзины в localStorage ---
    function saveCart() {
        const cartItems = [];
        document.querySelectorAll('.cart__product').forEach(item => {
            const id = item.dataset.id;
            const count = item.querySelector('.cart__product-count').textContent;
            const imgSrc = item.querySelector('.cart__product-image').src;
            cartItems.push({ id, count, imgSrc });
        });
        localStorage.setItem('cart', JSON.stringify(cartItems));
    }

    // --- 3. Функция загрузки корзины из localStorage ---
    function loadCart() {
        const saved = localStorage.getItem('cart');
        if (saved) {
            try {
                const items = JSON.parse(saved);
                items.forEach(item => {
                    createCartItem(item.id, item.imgSrc, parseInt(item.count));
                });
                updateCartVisibility();
            } catch (e) {
                console.error('Ошибка загрузки корзины:', e);
            }
        }
    }

    // --- 4. Функция создания элемента корзины ---
    function createCartItem(id, imgSrc, count) {
        const cartItem = document.createElement('div');
        cartItem.className = 'cart__product';
        cartItem.dataset.id = id;

        const img = document.createElement('img');
        img.className = 'cart__product-image';
        img.src = imgSrc;

        const countElement = document.createElement('div');
        countElement.className = 'cart__product-count';
        countElement.textContent = count;

        cartItem.appendChild(img);
        cartItem.appendChild(countElement);
        cartProducts.appendChild(cartItem);

        // Добавляем обработчик удаления (двойной клик для удаления)
        cartItem.addEventListener('dblclick', function() {
            this.remove();
            updateCartVisibility();
            saveCart();
        });

        return cartItem;
    }

    // --- 5. Функция обновления видимости корзины ---
    function updateCartVisibility() {
        const items = document.querySelectorAll('.cart__product');
        if (items.length === 0) {
            cartContainer.style.display = 'none';
        } else {
            cartContainer.style.display = 'block';
        }
    }

    // --- 6. Функция добавления товара в корзину ---
    function addToCart(productId, productImage, quantity) {
        // Проверяем, есть ли уже такой товар в корзине
        const existingItem = document.querySelector(`.cart__product[data-id="${productId}"]`);

        if (existingItem) {
            // Если есть — увеличиваем количество
            const countElement = existingItem.querySelector('.cart__product-count');
            const currentCount = parseInt(countElement.textContent);
            countElement.textContent = currentCount + quantity;
        } else {
            // Если нет — создаем новый элемент
            createCartItem(productId, productImage, quantity);
        }

        updateCartVisibility();
        saveCart();
    }

    // --- 7. Обработчики для карточек товаров ---

    products.forEach(product => {
        const id = product.dataset.id;
        const image = product.querySelector('.product__image').src;
        const quantityValue = product.querySelector('.product__quantity-value');
        const quantityDec = product.querySelector('.product__quantity-control_dec');
        const quantityInc = product.querySelector('.product__quantity-control_inc');
        const addBtn = product.querySelector('.product__add');

        // Уменьшение количества
        quantityDec.addEventListener('click', function() {
            let current = parseInt(quantityValue.textContent);
            if (current > 1) {
                quantityValue.textContent = current - 1;
            }
        });

        // Увеличение количества
        quantityInc.addEventListener('click', function() {
            let current = parseInt(quantityValue.textContent);
            quantityValue.textContent = current + 1;
        });

        // Добавление в корзину
        addBtn.addEventListener('click', function() {
            const quantity = parseInt(quantityValue.textContent);
            addToCart(id, image, quantity);
        });
    });

    // --- 8. Загрузка корзины при старте ---
    loadCart();

})();