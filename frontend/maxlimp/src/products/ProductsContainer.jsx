import Loading from "../components/Loading";
import { getFetcher } from "../services/data";

import useSWR from "swr";
import ProductBox from "./ProductBox";

function ProductsContainer() {
  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loading classNames="h-36" />
      </div>
    );

  const displayableProducts = data?.length > 5 ? data.slice(0, 5) : data;
  console.log(data);
  return (
    <div className=" flex justify-between items-center">
      {displayableProducts.map((product) => (
        <ProductBox key={product.name} product={product} />
      ))}
    </div>
  );
}

export default ProductsContainer;
