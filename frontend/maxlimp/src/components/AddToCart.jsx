import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { toast } from "react-toastify";
import { useCart } from "../contexts/CartContext";

function AddToCart({ product }) {
  const { addToCart } = useCart();

  const handleClick = () => {
    addToCart(product);
    toast.success("Produto adicionado!", {
      position: "top-right",
      autoClose: 1000,
    });
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
      >
        <CiShoppingCart className="w-8 h-8 fill-slate-50" />
        Adicionar
      </button>
    </div>
  );
}

export default AddToCart;
