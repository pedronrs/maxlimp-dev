import { Link } from "react-router-dom";

function ConfigList({ active }) {
  const paths = ["perfil", "endereços", "pedidos", "suporte"];
  return (
    <div className="flex-col flex  gap-4 border-r-stone-500 border-r-2 divide-indigo-100 items-start justify-start pr-4 pt-8">
      {paths.map((path) => (
        <Link
          to={`/configuracoes/${path}`}
          className={`uppercase duration-300 transition-all text-lg flex justify-start items-center gap-2 w-full rounded-md hover:bg-stone-200 pr-1 pt-1 pb-1 ${
            path === active ? "bg-stone-200" : ""
          }`}
          key={path}
        >
          {path}
        </Link>
      ))}
    </div>
  );
}

export default ConfigList;
