import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (p) => p.name === product.name
      );
      if (existingProductIndex >= 0) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productName, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((product) =>
          product?.name === productName
            ? newQuantity === 0
              ? undefined
              : { ...product, quantity: newQuantity }
            : product
        )
        .filter(Boolean)
    );
  };

  const getQuantity = (productName) => {
    const product = cart.find((product) => product?.name === productName);
    return product?.quantity || 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, getQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};
