import React from "react";
import { Link } from "react-router-dom";
import { CiShoppingCart } from "react-icons/ci";
import { useCart } from "../contexts/CartContext";

function CartIcon() {
  const { cart } = useCart();

  return (
    <div className="relative flex flex-col items-center">
      <Link
        to="/carrinho/"
        className="flex items-center justify-center flex-col gap-2 text-indigo-600"
      >
        <CiShoppingCart className="w-8 h-8 fill-indigo-600" />
        {cart.length > 0 && (
          <span className="absolute top-0 right-0 bg-red-600 text-white text-sm rounded-full px-1">
            {cart.length}
          </span>
        )}
        <span className="text-md tracking-wide capitalize max-w-16 ">
          Carrinho
        </span>
      </Link>
    </div>
  );
}

export default CartIcon;
