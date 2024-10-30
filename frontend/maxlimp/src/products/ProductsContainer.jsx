import Loading from "../components/Loading";
import { getFetcher } from "../services/data";
import { useProducts } from "../contexts/ProductsProvider";

import useSWR from "swr";
import ProductBox from "./ProductBox";
import ProductsTitle from "./ProductsTitle";

function ProductsContainer() {
  const { products, search } = useProducts();

  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  const productsToDisplay = search ? products : data;

  if (isLoading)
    return (
      <>
        <ProductsTitle>{search ? `"${search}"` : "em destaque"}</ProductsTitle>
        <div className="flex items-center justify-center">
          <Loading classNames="h-36" />
        </div>
      </>
    );

  const displayableProducts =
    productsToDisplay?.length > 5
      ? productsToDisplay.slice(0, 5)
      : productsToDisplay;

  return (
    <>
      <ProductsTitle>{search ? `"${search}"` : "em destaque"}</ProductsTitle>
      <div
        className={`gap-8 flex items-center ${
          displayableProducts?.length === 5
            ? "justify-between"
            : "justify-start"
        }`}
      >
        {displayableProducts.map((product) => (
          <ProductBox key={product.name} product={product} />
        ))}
      </div>
    </>
  );
}

export default ProductsContainer;
