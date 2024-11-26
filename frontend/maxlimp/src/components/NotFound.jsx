import { Link } from "react-router-dom";
import HeaderHome from "./HeaderHome";

function NotFound() {
  return (
    <>
      <HeaderHome showSearch={false} />{" "}
      <div className="flex flex-col gap-4 items-center justify-center h-screen">
        <h2 className="text-2xl font-semibold">Página não encontrada!</h2>
        <Link to="/">
          <button className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide">
            Retorne à loja!
          </button>
        </Link>
      </div>
    </>
  );
}

export default NotFound;
