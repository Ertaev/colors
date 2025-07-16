import { handleOutsideClick } from "../utils/handleOutsideClick";
import { applyNoScroll, removeNoScroll } from "../utils/noScroll";

const body = document.body;
const cartModal = document.querySelector(".cart");
const openCartButton = document.querySelector(".cart-icon");
const closeCartButtons = document.querySelectorAll("[data-modal-close='cart']");
const emptyText = document.querySelector(".cart__empty-title")

openCartButton.addEventListener("click", (e) => {
	e.stopPropagation();

	cartModal.classList.add("is-open");
	body.classList.add("overlay");

	applyNoScroll();
});

closeCartButtons.forEach((button) => {
	button.addEventListener("click", () => {
		closeCartModal();
	});
});

function closeCartModal() {
	cartModal.classList.remove("is-open");
	body.classList.remove("overlay");
	removeNoScroll();
	emptyText.textContent = "В корзине пусто";
}

handleOutsideClick({ trigger: cartModal, onClose: closeCartModal });
