const body = document.body;
const iOS = !!navigator.platform && /iPad|iPhone|iPod/.test(navigator.platform);

export function applyNoScroll() {
	if (iOS) {
		body.style.position = "fixed";
		body.style.top = "0px";
		body.style.width = "100vw";
	} else {
		body.classList.add("no-scroll");
		document.documentElement.classList.add("no-scroll");
		document.documentElement.style.height = "100%";
		body.style.height = "100%";
	}
}

export function removeNoScroll() {
	if (iOS) {
		body.style.position = "";
		body.style.top = "";
		body.style.width = "";
	} else {
		body.classList.remove("no-scroll");
		document.documentElement.classList.remove("no-scroll");
		document.documentElement.style.height = "";
		body.style.height = "";
	}
}
