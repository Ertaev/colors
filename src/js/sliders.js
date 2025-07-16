import "@splidejs/splide/dist/css/splide.min.css";

import Splide from "@splidejs/splide";

document.addEventListener("DOMContentLoaded", () => {
	const slider = document.querySelector(".hero__slider");

	if (slider) {
		new Splide(".hero__slider", {
			pagination: true,
			perPage: 1,
			rewind: true,
			type: "fade",
		}).mount();
	}
});
