import React, { useEffect } from 'react';
import { useLocation } from 'react-router';
import logo from "../assets/logo.png";
import { FaWhatsapp, FaBoxOpen } from "react-icons/fa";

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
      className="px-4 py-3 sm:px-12 border-indigo-600 border-t-2 flex flex-col sm:flex-row justify-between items-center text-stone-700"
    >
      <div className="flex gap-2 items-center uppercase tracking-tight text-xl sm:text-2xl">
        <img src={logo} className="h-8" alt="Logo da Maxlimp" />
        Maxlimp
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-sm sm:text-md mt-2 sm:mt-0">
        <div className="font-bold text-lg">Contatos:</div>
        <div>Email</div>
        <div className="hidden sm:block">|</div>
        <div>Telefone</div>
        <div className="hidden sm:block">|</div>
        <div>Whatsapp</div>
      </div>

      <div className="flex flex-col items-center gap-2 sm:gap-4 text-sm sm:text-md mt-4 sm:mt-0">
        <div className="flex items-center gap-2 sm:gap-4">
          <FaBoxOpen className="h-8 fill-indigo-600" />
          <span>Compre com até 90 dias a pagar.</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
