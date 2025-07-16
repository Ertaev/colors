import { getColors } from "./getColors";
import { createProductCard } from "./createProductCard";
import { saveCart } from "./localStorage";
import { getCorrectWordForm } from "../utils/getCorrectWordForm";

import { closeSortModal } from "../modals/sort";

let data = [];
let cart = [];

try {
	const storedCart = localStorage.getItem("cart");
	cart = storedCart ? JSON.parse(storedCart) : [];
} catch (error) {
	console.error("Ошибка при чтении cart из localStorage:", error);
	cart = [];
}

const catalogContainer = document.querySelector(".catalog__list");
const catalogCounter = document.querySelector(".catalog__items");

const cartEmpty = document.querySelector(".cart__empty");
const cartBody = document.querySelector(".cart__body");
const cartContainer = document.querySelector(".cart__list");
const cartWrapClear = document.querySelector(".cart__wrap-clear");

const cartCounter = document.querySelector(".cart-icon span");
const cartIcon = document.querySelector(".cart-icon");

const catalogSortOption = document.querySelectorAll(".catalog__sort-option");
const currentSortOption = document.querySelector(".catalog__sort-toggle span");
const inputs = document.querySelectorAll(".switch input");

const sendCartButton = document.querySelector(".cart__order-button");

const filterState = {};
let currentSort = "priceAsc";


/**
 * Отображение товаров на странице
 * Загружает товары и отображает их в каталоге
 */
async function renderCatalog() {
	data = await getColors();

	if (data === 404) {
		catalogContainer.textContent = "Произошла ошибка";
		return;
	}

	catalogCounter.textContent = data.length + " " + getCorrectWordForm(data.length);

	catalogContainer.innerHTML = "";
	data.forEach((item) => catalogContainer.innerHTML += createProductCard("catalog", item));

	document.querySelectorAll(".catalog__item-button").forEach((button) => {
		button.addEventListener("click", (e) => {
			const productId = e.currentTarget.getAttribute("data-id");
			e.currentTarget.classList.add("active");

			addToCart(productId);
			renderCart();
		});
	});

	updateActiveButtons();
};

/**
 * ОБновление кнопки у карточек товаров в каталоге
 */
function updateActiveButtons() {
	const commonIds = data.filter(item => cart.some(cartItem => cartItem.id === item.id)).map(item => item.id);
	commonIds.forEach(id => {
		const button = document.querySelector(`button[data-id="${id}"]`);
		if (button) button.classList.add("active");
	});
};

/**
 * Добавить товар в корзину
 * @param {string} productId - Идентификатор товара
 */
function addToCart(productId) {
	if (cart.find((item) => item.id === productId)) return;

	const product = data.find(item => item.id === productId);
	if (product) {
		cart.push({ ...product, quantity: 1 });
		saveCart(cart);
		renderCart();
	}
};

/**
 * Удалить товар из корзины
 * @param {string} productId - Идентификатор товара
 */
function removeFromCart(productId) {
	const productIndex = cart.findIndex(item => item.id === productId);

	if (productIndex === -1) return

	cart.splice(productIndex, 1);
	saveCart(cart);

	document.querySelector(`li[data-id="${productId}"]`).classList.add("disable");

	document.querySelectorAll(".cart__item-change").forEach(button => {
		button.addEventListener("click", (e) => {
			e.stopPropagation();

			document.querySelector(`li[data-id="${productId}"]`).classList.remove("disable");
			const id = e.currentTarget.parentElement.getAttribute("data-id");
			addToCart(id);
			
			updateActiveButtons();
		})
	});

	updateCartTotal();
};

/**
 * Очистка товаров в корзине
 */
cartWrapClear.addEventListener("click", () => {
	cart.length = 0;
	saveCart(cart);
	renderCart();

	document.querySelectorAll(".catalog__item-button.active").forEach(button => {
		button.classList.remove("active");
	});
});

/**
 * Отображение корзины
 * Обновляет визуальное отображение корзины
 */
function renderCart() {
	cartContainer.innerHTML = "";

	if (cart.length === 0) {
		cartEmpty.style.display = "flex";
		cartBody.style.display = "none";
		cartIcon.classList.remove("cart-counter");
	} else {
		cartEmpty.style.display = "none";
		cartBody.style.display = "flex";
		cartIcon.classList.add("cart-counter");
		cartCounter.textContent = cart.length;

		cart.forEach(item => {
			cartContainer.innerHTML += createProductCard("cart", item);
		});

		document.querySelectorAll(".cart__item").forEach(el => new InputCounter(el, 1, 99));

		document.querySelectorAll(".cart__item-remove").forEach(button => {
			button.addEventListener("click", (e) => {
				e.stopPropagation();

				const id = e.currentTarget.parentElement.getAttribute("data-id");
				removeFromCart(id);
				document.querySelector(`button[data-id="${id}"]`).classList.remove("active");
				cartIcon.classList.remove("cart-counter");
			})
		});

		updateCartTotal();
	}
}

/**
 * Класс для управления счетчиком количества товаров в корзине
 */
class InputCounter {
	/**
	 * Создает новый счетчик для товара в корзине
	 * @param {HTMLElement} selector - Элемент DOM, содержащий счетчик
	 * @param {number} min - Минимальное значение
	 * @param {number} max - Максимальное значение
	 */
	constructor(selector, min, max) {
		this.min = min;
		this.max = max;

		this.counter = selector;
		this.incrementButton = selector.querySelector(".cart__icon--plus");
		this.decrementButton = selector.querySelector(".cart__icon--minus");
		this.counterInput = selector.querySelector(".counter__input");
		this.productId = selector.getAttribute("data-id");

		this.init();
	}

	/**
	 * Получить текущее значение счетчика
	 * @returns {number} - Текущее значение счетчика
	 */
	get value() {
		return parseInt(this.counterInput.value);
	}

	/**
	 * Установить новое значение счетчика
	 * @param {number} newValue - Новое значение счетчика
	 */
	set value(newValue) {
		this.counterInput.value = newValue;
		this.updateQuantity(newValue);
	}

	/**
	 * Инициализация событий для кнопок и поля ввода
	 */
	init() {
		this.decrementButton.addEventListener("click", (e) => this.dec(e));
		this.incrementButton.addEventListener("click", (e) => this.inc(e));
		this.counterInput.addEventListener("change", (e) => this.updateQuantity(+e.target.value));
	}

	/**
	 * Увеличить количество товара
	 * @param {Event} e - Событие клика
	 */
	inc(e) {
		e.preventDefault();
		const currentValue = this.value;
		if (currentValue >= this.max) return false;

		this.value = currentValue + 1;
	}

	/**
	 * Уменьшить количество товара
	 * @param {Event} e - Событие клика
	 */
	dec(e) {
		e.preventDefault();
		const currentValue = this.value;
		if (currentValue <= this.min) return false;

		this.value = currentValue - 1;
	}

	/**
	 * Обновить количество товара в корзине
	 * @param {number} newQuantity - Новое количество товара
	 */
	updateQuantity(newQuantity) {
		const product = cart.find(item => item.id === this.productId);

		if (product) {
			product.quantity = newQuantity;
			saveCart(cart);
			updateCartTotal();
		}
	}
}

/**
 * Обновить общую сумму и количество товаров в корзине.
 */
function updateCartTotal() {
	const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
	document.querySelector(".cart__wrap-counter").textContent = totalCount + " " + getCorrectWordForm(totalCount);

	const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
	document.querySelector(".cart__total b").textContent = total.toFixed(2);
};

document.addEventListener("DOMContentLoaded", () => {
	renderCatalog();
	renderCart();
});


/**
 * Обработчик выбора сортировки
 */
catalogSortOption.forEach(option => {
	option.addEventListener("click", () => {
		catalogSortOption.forEach(el => el.classList.remove("catalog__sort-option--active"));
		option.classList.add("catalog__sort-option--active");

		currentSortOption.textContent = option.innerText;
		currentSort = option.getAttribute("data-sort");

		updateCatalog();
		closeSortModal();
	})
});

/**
 * Обработчик выбора фильтров
 */
inputs.forEach(input => {
	input.addEventListener("change", (e) => {
		filterState[e.target.id] = e.target.checked;
		updateCatalog();
	});
});

/**
 * Функция для фильтрации и сортировки каталога товаров.
 */
function updateCatalog() {
	const filteredData = filterItems(data);
	const sortedData = sortItems(filteredData, currentSort);

	renderSortFilteredCatalog(sortedData);
}

/**
 * Фильтрация товаров.
 * @param {Array} items - Массив товаров.
 * @returns {Array} - Отфильтрованный массив товаров.
 */
function filterItems(items) {
	return items.filter(product => {
		return Object.keys(filterState).every(filter => {
			if (filterState[filter]) return product[filter] === true;
			return true;
		});
	});
}

/**
 * Сортировка товаров.
 * @param {Array} items - Массив товаров.
 * @param {string} sortBy - Ключ сортировки.
 * @returns {Array} - Отсортированный массив товаров.
 */
function sortItems(items, sortBy) {
	switch (sortBy) {
		case "priceAsc":
			return items.sort((a, b) => b.price - a.price);
		case "priceDesc":
			return items.sort((a, b) => a.price - b.price);
		case "popularity":
			return items.sort((a, b) => b.popularity - a.popularity);
		case "newest":
			return items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
		default:
			return items;
	}
}

/**
 * Отображение товаров в каталоге после сортировки и фильтрации.
 * @param {Array} data - Массив товаров.
 */
function renderSortFilteredCatalog(data) {
	catalogContainer.innerHTML = "";
	
	data.forEach((item) => catalogContainer.innerHTML += createProductCard("catalog", item));
	catalogCounter.textContent = data.length + " " + getCorrectWordForm(data.length);

	document.querySelectorAll(".catalog__item-button").forEach((button) => {
		button.addEventListener("click", (e) => {
			const productId = e.currentTarget.getAttribute("data-id");
			e.currentTarget.classList.add("active");

			addToCart(productId);
			renderCart();
		});
	});

	updateActiveButtons();
}

/**
 * Отправка заказов
 */
sendCartButton.addEventListener("click", () => {
	if (cart.length === 0) return;
	cart.length = 0;
	saveCart(cart);
	renderCart();

	document.querySelectorAll(".catalog__item-button.active").forEach(button => {
		button.classList.remove("active");
	});

	cartEmpty.querySelector(".cart__empty-title").textContent = "Спасибо за покупку!";
});