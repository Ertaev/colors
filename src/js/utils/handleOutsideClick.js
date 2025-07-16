export function handleOutsideClick({ trigger, onClose }) {
	document.body.addEventListener("click", (e) => {
		if (!trigger.classList.contains("is-open")) return;

		const clickedOnTrigger = trigger?.contains(e.target);

		if (document.body.classList.contains("overlay") && !clickedOnTrigger) {
			onClose?.();
		}
	});
}