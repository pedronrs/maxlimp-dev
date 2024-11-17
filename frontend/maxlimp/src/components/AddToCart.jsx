import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthProvider";

import CartCounter from "./CartCounter";
import ProductButton from "./ProductButton";

function AddToCart({ product }) {
  const { addToCart, getQuantity, updateQuantity } = useCart();
  const { user } = useAuth();

  const cartQuantity = getQuantity(product.name);

  const handleAdd = () => {
    if (!user) {
      toast.error("Faça login!", {
        position: "top-right",
        autoClose: 1000,
      });
      return;
    }

    toast.success("Produto adicionado!", {
      position: "top-right",
      autoClose: 1000,
    });
    addToCart(product);
  };

  const handleEdit = (vector) => {
    if (cartQuantity + vector === 0) {
      addToCart(product);
      toast.error("Produto removido!", {
        position: "top-right",
        autoClose: 1000,
      });
    }
    updateQuantity(product.name, cartQuantity + vector);
  };

  return (
    <div>
      {" "}
      <>
        {cartQuantity === 0 ? (
          <ProductButton onClick={handleAdd}>
            <CiShoppingCart className="w-8 h-8 fill-slate-50" />
            Adicionar
          </ProductButton>
        ) : (
          <ProductButton type="div" onClick={() => {}}>
            <CartCounter quantity={cartQuantity} onClick={handleEdit} />
            Editar
          </ProductButton>
        )}
      </>
    </div>
  );
}

export default AddToCart;
