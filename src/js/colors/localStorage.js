export const saveCart = (cart) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};
