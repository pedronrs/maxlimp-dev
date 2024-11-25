import aboutUs from "../assets/aboutUs.jpeg";
import logo from "../assets/logo.png";

function AboutUsSection() {
  return (
    <div className="relative text-slate-50">
      <img
        className="w-full object-cover h-[700px] "
        src={aboutUs}
        alt="Uma pessoa limpando um vidro"
      />
      <div className="top-0 h-full w-full bg-stone-900 opacity-65 absolute z-10"></div>
      <div className="px-12 absolute top-[5%] z-20">
        <div className="flex gap-8 items-center justify-start">
          <img className="h-24" src={logo} alt="Logo da Maxlimp" />
          <h1 className="font-semibold tracking-tight text-8xl uppercase ">
            Sobre Nós
          </h1>
        </div>
        <p className="leading-normal mt-8 ml-4 text-2xl max-w-lg">
          Somos uma micro empresa especializada na venda de materiais de limpeza
          sob encomenda. Estamos no mercado desde 2020 oferecendo um serviço
          profissional e produtos de qualidade.
        </p>
      </div>
    </div>
  );
}

export default AboutUsSection;
