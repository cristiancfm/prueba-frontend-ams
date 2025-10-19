import axios from "axios";

const API_URL = "https://itx-frontend-test.onrender.com/api";

export const getProducts = () => {
    return axios.get(`${API_URL}/product`);
}