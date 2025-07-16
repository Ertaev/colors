import axios from "axios";

const API_URL = "https://687542b4dd06792b9c975c8d.mockapi.io/api/paints";

export const getColors = async () => {
	try {
		const response = await axios.get(API_URL);
		return response.data;
	} catch (error) {
		console.error("Ошибка при загрузке товаров:", error);
		return error.status;
	}
};