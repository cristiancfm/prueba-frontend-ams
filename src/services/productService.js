import axios from "axios";
import { getCache, setCache } from "../utils/cache.js";

const API_URL = "https://itx-frontend-test.onrender.com/api";

export const getProducts = async () => {
    const key = "products";
    const cached = getCache(key);
    if (cached) return cached;

    const response = await axios.get(`${API_URL}/product`);
    setCache(key, response.data);
    return response.data;
}

export const getProduct = async (id) => {
    const key = "product_" + id;
    const cached = getCache(key);
    if (cached) return cached;

    const response = await axios.get(`${API_URL}/product/${id}`);
    setCache(key, response.data);
    return response.data;
}

export const addProductToCart = (id, colorCode, storageCode) => {
    return axios.post(`${API_URL}/cart`, {
        id: id,
        colorCode: colorCode,
        storageCode: storageCode
    });
}