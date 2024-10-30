import { CiHeart } from "react-icons/ci";
import AddToCart from "../components/AddToCart";

function ProductBox({ product }) {
  return (
    <div className="rounded-md p-4  border-2 border-indigo-600">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
      />
      <h3 className="text-md text-stone-800 font-normal mt-2">
        {product.name}
      </h3>
      <p className="text-xl text-indigo-600 font-bold mt-2">
        R${product.price}
      </p>
      <div className="flex items-center justify-between mt-4 gap-4">
        <CiHeart className="w-8 h-8 fill-indigo-600" />
        <AddToCart />
      </div>
    </div>
  );
}

export default ProductBox;
