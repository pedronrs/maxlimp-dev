import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";

import { getFetcher, postFetcher } from "../services/data";
import useSWR from "swr";
import useSWRMutation from "swr/mutation";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { data, isLoading } = useSWR("products/get-cart/", getFetcher);
  const { trigger: addCart } = useSWRMutation(
    "products/add-to-cart/",
    postFetcher
  );
  const { trigger: deleteCart } = useSWRMutation(
    "products/delete-cart/",
    postFetcher
  );

  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (data?.length && !isLoading) {
      setCart(data);
    }
  }, [data?.length, data, isLoading]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      addCart({
        product: {
          id: product.id,
          quantity: 1,
        },
      });
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const updateQuantity = (productName, newQuantity) => {
    setCart((prevCart) =>
      prevCart
        .map((product) => {
          if (product?.name === productName) {
            if (newQuantity === 0) {
              deleteCart({
                product: {
                  id: product.id,
                },
              });
              return undefined;
            }

            addCart({
              product: {
                id: product.id,
                quantity: newQuantity,
              },
            });
            return { ...product, quantity: newQuantity };
          }

          return product;
        })
        .filter(Boolean)
    );
  };

  const getQuantity = (productName) => {
    const product = cart.find((product) => product?.name === productName);
    return product?.quantity || 0;
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, getQuantity, setCart }}
    >
      {children}
    </CartContext.Provider>
  );
};
