import { handleOutsideClick } from "../utils/handleOutsideClick";

const body = document.body;
const openFiltersButton = document.querySelector(".catalog__filters");
const filtersModal = document.querySelector(".filters");

openFiltersButton?.addEventListener("click", (e) => {
	e.stopPropagation();

	filtersModal.classList.add("is-open");
	body.classList.add("overlay", "no-scroll");
	document.documentElement.classList.add("no-scroll");
});

handleOutsideClick({ trigger: filtersModal, onClose: closeFiltersModal });

function closeFiltersModal() {
	filtersModal.classList.remove("is-open");
	body.classList.remove("overlay", "no-scroll");
	document.documentElement.classList.remove("no-scroll");

	filtersModal.style.transition = "";
	filtersModal.style.transform = "";
}

let startY = 0;
let currentY = 0;
let isSwiping = false;
const swipeThreshold = 100;

filtersModal?.addEventListener("touchstart", (e) => {
	startY = e.touches[0].clientY;
	isSwiping = true;
});

filtersModal?.addEventListener("touchmove", (e) => {
	if (!isSwiping) return;

	currentY = e.touches[0].clientY;
	const deltaY = currentY - startY;

	if (deltaY > 0) {
		filtersModal.style.transform = `translateY(${deltaY}px)`;
	}
});

filtersModal?.addEventListener("touchend", () => {
	if (!isSwiping) return;
	isSwiping = false;

	const deltaY = currentY - startY;

	if (deltaY > swipeThreshold) {
		closeFiltersModal();
	} else {
		filtersModal.style.transition = "transform 0.3s ease";
		filtersModal.style.transform = "translateY(0)";

		setTimeout(() => {
			filtersModal.style.transition = "";
			filtersModal.style.transform = "";
		}, 300);
	}
});
