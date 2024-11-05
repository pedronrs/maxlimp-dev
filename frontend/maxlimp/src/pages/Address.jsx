import { FaWhatsapp } from "react-icons/fa";
import HeaderHome from "../components/HeaderHome";
import BoxAddress from "../Config/Address";
import useAuthRedirect from "../hooks/useAuthRedirect";
import { useAdddresss } from "../contexts/AddressProvider";
import { useAuth } from "../contexts/AuthProvider";

function capitalize(str) {
  if (typeof str !== "string") {
    return "";
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}
function getCurrentDate() {
  const date = new Date();

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}

function Address({ total, selectedItems }) {
  const { active } = useAdddresss();
  const { user } = useAuth();

  console.log(selectedItems);
  const handleWhatsAppCheckout = () => {
    if (!active?.id) return;
    const message = `Nome: ${capitalize(user.name)}\n
    Email: ${user.email}\n
    Data: ${getCurrentDate()}\n
    Pedido: ${selectedItems?.reduce((acc, i) => {
      return (
        acc +
        `
    Nome: ${i.name}\n
    Quantidade: ${i.quantity}x
    Preço: ${i.quantity * i.price}
    ` +
        "\n"
      );
    }, "")}
    \n
    Endereço: ${capitalize(active?.district)} ${capitalize(
      active?.address
    )} ${capitalize(active?.complement)}
    Total: R$${total.toFixed(2)}`;
    console.log(message);
    const whatsappLink = `https://wa.me/5521999993707?text=${encodeURIComponent(
      message
    )}`;
    window.open(whatsappLink, "_blank");
  };
  return (
    <>
      <div className="p-4 flex justify-center">
        <div className="w-1/2">
          <h2 className="text-2xl font-semibold mb-4">Endereço</h2>
          <BoxAddress showDelete={false} />
          <button
            disabled={!active?.id}
            className="bg-green-400 disabled:opacity-50 mt-4 ml-auto text-white px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-2"
            onClick={handleWhatsAppCheckout}
          >
            Finalizar pelo WhatsApp <FaWhatsapp />
          </button>
        </div>
      </div>
    </>
  );
}

export default Address;
