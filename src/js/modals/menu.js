import { applyNoScroll, removeNoScroll } from "../utils/noScroll";

const openMenuBtn = document.querySelector(".header__menu");
const modalMenu = document.querySelector(".menu");

openMenuBtn?.addEventListener("click", () => {
	modalMenu.classList.toggle("menu--active");
	openMenuBtn.classList.toggle("header__menu--active");

	modalMenu.classList.contains("menu--active") ? applyNoScroll() : removeNoScroll();
});

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape") {
		modalMenu.classList.remove("menu--active");
		openMenuBtn.classList.remove("header__menu--active");

		removeNoScroll();
	}
});