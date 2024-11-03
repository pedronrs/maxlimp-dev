import React from "react";
import { useNavigate } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { useOrder } from "../contexts/OrderContext";

function CheckoutActions({ selectedItems, cart }) {
  const navigate = useNavigate();
  const { setOrder } = useOrder();

  const calculateTotal = () => {
    return cart
      .filter((product) => selectedItems.includes(product.name))
      .reduce((total, product) => total + (parseFloat(product.price) * product.quantity), 0)
      .toFixed(2);
  };

  const total = calculateTotal();

  const handleCheckout = () => {
    setOrder((prevOrder) => ({ ...prevOrder, total }));
    navigate('/shipping');
  };

  const handleWhatsAppCheckout = () => {
    const message = selectedItems.map((productName) => {
      const product = cart.find(p => p.name === productName);
      return `${product.name} - Quantidade: ${product.quantity}`;
    }).join('\n') + `\n\nTotal da compra: R$${total}`;
    const whatsappLink = `https://wa.me/5521999993707?text=${encodeURIComponent(message)}`;
    window.open(whatsappLink, '_blank');
  };

  return (
    <div>
      {total > 0 && (
        <div className="mt-4">
          <h3 className="text-xl font-semibold">Total: R${total}</h3>
          <div className="flex justify-between mt-4">
            <button
              className="bg-indigo-600 text-white px-4 py-2 rounded-full transition-all duration-300"
              onClick={handleCheckout}
            >
              Continuar
            </button>
            <button
              className="bg-green-400 text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
              onClick={handleWhatsAppCheckout}
            >
              Finalizar pelo WhatsApp <FaWhatsapp />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CheckoutActions;
