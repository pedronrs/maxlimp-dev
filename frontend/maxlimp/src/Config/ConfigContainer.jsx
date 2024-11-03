import { HiCog6Tooth } from "react-icons/hi2";
import ConfigList from "./ConfigList";

function ConfigContainer() {
  return (
    <div className="text-stone-800 px-12 mt-20 mb-20">
      <div className="flex items-center justify-start gap-6 text-3xl tracking-tight font-light uppercase border-b-2 border-stone-500">
        <HiCog6Tooth className="fill-indigo-600 w-8 h-8" />
        configurações
      </div>
      <div className="flex">
        <ConfigList />
      </div>
    </div>
  );
}

export default ConfigContainer;
