import { CiHeart } from "react-icons/ci";
import AddToCart from "../components/AddToCart";
import { Button } from "@mui/material";
import { FaInfoCircle } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useProduct } from "../contexts/ProductContext";

function ProductBox({ product }) {
  const { setProduct } = useProduct();
  const navigate = useNavigate();

  const handleSaibaMais = () => {
    setProduct(product);
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="rounded-md p-4 border-2 border-indigo-600">
      <img
        src={product.image}
        alt={product.name}
        className="h-48 w-full object-cover"
        style={{ objectFit: 'contain', width: '100%', height: 'auto' }}
      />
      <h3 className="text-md text-stone-800 font-normal mt-2">
        {product.name}
      </h3>
      <p className="text-xl text-indigo-600 font-bold mt-2">
        R${product.price}
      </p>
      <div className="mt-4 flex flex-col gap-4">
        {/* <CiHeart className="w-8 h-8 fill-indigo-600" /> */}
        <button
          variant="contained"
          onClick={handleSaibaMais}
          className="w-full rounded-md px-6 py-2 bg-indigo-600 text-white transition-all duration-300 hover:bg-indigo-700 flex items-center justify-center gap-4 text-sm uppercase tracking-wide"
        >
          <FaInfoCircle className="w-8 h-8 fill-slate-50" />
          Saiba mais
        </button>
        <AddToCart product={product} />
      </div>
    </div>
  );
}

export default ProductBox;
