import { useCart } from "../contexts/CartContext";
import { IoIosArrowBack } from "react-icons/io";
import { IoIosArrowForward } from "react-icons/io";

function CartCounter({ quantity, onClick }) {
  return (
    <div className="flex gap-2 items-center justify-center">
      <button onClick={() => onClick(-1)}>
        <IoIosArrowBack className="w-6 h-6 fill-slate-50" />
      </button>
      <span className="text-xl">{quantity}</span>
      <button onClick={() => onClick(1)}>
        <IoIosArrowForward className="w-6 h-6 fill-slate-50" />
      </button>
    </div>
  );
}

export default CartCounter;
