import { Link } from "react-router-dom";

function AuthButtons() {
  return (
    <div className="flex gap-12">
      <Link
        className="uppercase tracking-wide border-2 rounded-md px-4 py-2 text-indigo-600 border-indigo-600 hover:bg-indigo-600 hover:text-slate-50 flex items-center justify-center duration-300 text-lg"
        to="/entrar/"
      >
        Entrar
      </Link>
      <Link
        className="uppercase tracking-wide border-2 rounded-md px-4 py-2 text-slate-50 bg-indigo-600 border-indigo-600 hover:bg-slate-50 hover:text-indigo-600 flex items-center justify-center duration-300 text-lg"
        to="/registro/"
      >
        registrar
      </Link>
    </div>
  );
}

export default AuthButtons;
