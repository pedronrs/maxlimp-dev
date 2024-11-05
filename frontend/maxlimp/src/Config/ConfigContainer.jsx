import { HiCog6Tooth } from "react-icons/hi2";
import ConfigList from "./ConfigList";
import Profile from "./Profile";
import Address from "./Address";

function ConfigContainer({ config }) {
  let Path;

  console.log(config);

  switch (config) {
    case "":
      Path = "";
      break;
    case "perfil":
      Path = Profile;
      break;
    case "endereços":
      Path = Address;
      break;
    default:
      Path = "";
      break;
  }
  return (
    <div className="text-stone-800 px-12 mt-20 mb-20">
      <div className="flex items-center justify-start gap-6 text-3xl tracking-tight font-light uppercase border-b-2 border-stone-500">
        <HiCog6Tooth className="fill-indigo-600 w-8 h-8" />
        {Path === "" ? "Configurações" : config}
      </div>
      <div className="flex">
        <ConfigList active={config} />
        <div className="basis-full relative p-8">
          {Path === "" ? (
            <p className="uppercase text-md tracking-wide absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-1/2">
              Escolha uma seção!
            </p>
          ) : (
            <Path />
          )}
        </div>
      </div>
    </div>
  );
}

export default ConfigContainer;
