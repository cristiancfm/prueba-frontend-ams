import axios from "axios";

const API_URL = "https://itx-frontend-test.onrender.com/api";

export const getProducts = () => {
    return axios.get(`${API_URL}/product`);
}

export const getProduct = (id) => {
    return axios.get(`${API_URL}/product/${id}`);
}

export const addProductToCart = (id, colorCode, storageCode) => {
    return axios.post(`${API_URL}/cart`, {
        id: id,
        colorCode: colorCode,
        storageCode: storageCode
    });
}