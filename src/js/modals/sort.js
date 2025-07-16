import { handleOutsideClick } from "../utils/handleOutsideClick";

const body = document.body;
const catalogSortButton = document.querySelector(".catalog__sort-toggle");
const catalogSortDropdown = document.querySelector(".catalog__sort-dropdown");

catalogSortButton?.addEventListener("click", (e) => {
	e.stopPropagation();

	catalogSortDropdown.classList.add("is-open");
	body.classList.add("overlay", "no-scroll");
	document.documentElement.classList.add("no-scroll");
});

handleOutsideClick({ trigger: catalogSortDropdown, onClose: closeSortModal });

export function closeSortModal() {
	catalogSortDropdown.classList.remove("is-open");
	body.classList.remove("overlay", "no-scroll");
	document.documentElement.classList.remove("no-scroll");
}
