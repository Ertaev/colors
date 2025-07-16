import "../styles/main.scss";
import "./sliders";
import "./modals/menu";
import "./modals/sort";
import "./modals/filters";
import "./modals/cart";

document.addEventListener("keydown", (e) => {
	if (e.key === "Escape" && document.body.classList.contains("overlay")) {
		const activeElement = document.querySelector(".is-open");

		if (activeElement) {
			activeElement.classList.remove("is-open");
		}

		document.body.classList.remove("overlay", "no-scroll");
		document.documentElement.classList.remove("no-scroll");
		document.querySelector(".filters").style.transition = "";
		document.querySelector(".filters").style.transform = "";
	}
});
