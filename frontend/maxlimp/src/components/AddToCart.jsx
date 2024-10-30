import { CiShoppingCart } from "react-icons/ci";

function AddToCart() {
  return (
    <button className="rounded-md px-4 py-2 bg-indigo-600 transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-slate-50 text-sm uppercase tracking-wide">
      <CiShoppingCart className="w-8 h-8 fill-slate-50" />
      Adicionar
    </button>
  );
}

export default AddToCart;
