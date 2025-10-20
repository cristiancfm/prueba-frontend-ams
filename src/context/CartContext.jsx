import {createContext, useContext, useState} from "react";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(
        parseInt(localStorage.getItem("cartItems")) || 0
    );

    const updateCartItems = (items) => {
        setCartItems(items);
        localStorage.setItem("cartItems", items);
    }

    return (
        <CartContext.Provider value={{ cartItems, updateCartItems }}>
            {children}
        </CartContext.Provider>
    );
}

export const useCart = () => useContext(CartContext);
