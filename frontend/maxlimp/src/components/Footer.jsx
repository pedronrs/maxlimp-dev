import logo from "../assets/logo.png";
import { FaWhatsapp } from "react-icons/fa6";
import { FaBoxOpen } from "react-icons/fa";
import { useLocation } from "react-router";
import { useEffect } from "react";

function Footer() {
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replaceAll("#", "");

      const element = document.getElementById(elementId);

      if (element && elementId === "contatos") {
        element.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  }, [location.hash]);
  return (
    <footer
      id="contatos"
      className="px-12 py-8 border-indigo-600  border-t-2 grid grid-cols-3 text-stone-700 justify-start"
    >
      <div className="flex gap-4 items-center justify-start  uppercase tracking-tight text-2xl">
        <img src={logo} className="h-24" alt="Logo da Maxlimp" />
        Maxlimp
      </div>

      <div className="flex justify-self-center items-start gap-8 flex-col justify-center text-md">
        <div className="font-bold text-lg">Contatos:</div>
        <div>Email</div>
        <div>Telefone</div>
        <div>Whatsapp</div>
      </div>
      <div className="flex items-end justify-center justify-self-end gap-8 flex-col">
        <div className="flex self-center justify-center items-center gap-4 text-md">
          <FaWhatsapp className="h-10 w-10 fill-indigo-600 mr-3" />
          Fale conosco
          <br /> pelo WhatsApp
        </div>
        <div className="flex self-center justify-center items-center gap-4 text-md">
          <FaBoxOpen className="h-10 w-10 fill-indigo-600" />
          Compre com até <br />
          90 dias a pagar.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
