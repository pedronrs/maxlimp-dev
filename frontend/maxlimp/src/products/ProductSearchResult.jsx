import { Link } from "react-router-dom";

function ProductSearchResult({ product }) {
  const { image, name } = product;
  return (
    <Link className="py-2 duration-300 transition-all hover:bg-indigo-200 flex gap-8 items-center justify-start ">
      <img className="h-6" src={image} alt={`A imagem do produto ${name}`} />
      {name}
    </Link>
  );
}

export default ProductSearchResult;
