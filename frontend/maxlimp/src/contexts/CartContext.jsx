import React, { createContext, useState, useContext } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(p => p.name === product.name);
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
      prevCart.map((product) =>
        product.name === productName ? { ...product, quantity: newQuantity } : product
      )
    );
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
