import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useOrder } from "../contexts/OrderContext";
import useAuthRedirect from "../hooks/useAuthRedirect";

function CheckoutActions({ selectedItems, cart }) {
  useAuthRedirect("/compra", "/entrar");
  const navigate = useNavigate();

  const handleWhatsAppCheckout = () => {
    const message =
      selectedItems
        .map((productName) => {
          const product = cart.find((p) => p.name === productName);
          return `${product.name} - Quantidade: ${product.quantity}`;
        })
        .join("\n") + `\n\nTotal da compra: R$${total}`;
    const whatsappLink = `https://wa.me/5521999993707?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-7/10">
        <h2 className="text-2xl font-semibold mb-4">Carrinho</h2>{" "}
        <button
          className="bg-green-400 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
          onClick={handleWhatsAppCheckout}
        >
          Finalizar pelo WhatsApp <FaWhatsapp />
        </button>
      </div>
    </div>
  );
}

export default CheckoutActions;
