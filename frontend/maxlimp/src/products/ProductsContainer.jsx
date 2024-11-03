import Loading from "../components/Loading";
import { getFetcher, postFetcher } from "../services/data";
import { useProducts } from "../contexts/ProductsProvider";
import { useFilter } from "../contexts/FilterProvider";

import useSWR from "swr";
import ProductBox from "./ProductBox";
import ProductsTitle from "./ProductsTitle";
import Tag from "../components/Tag";
import { useEffect, useMemo } from "react";
import useSWRMutation from "swr/mutation";

function ProductsContainer() {
  const { products, search, setProducts, setFilter } = useProducts();
  const { categories, price, handleCategoryChange } = useFilter();

  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  const productsToDisplay = products !== undefined ? products : data;

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
      ? productsToDisplay?.slice(0, 5)
      : productsToDisplay;

  return (
    <>
      <ProductsTitle>
        <div className="flex gap-6">
          {search ? (
            <>
              Resultados da busca{" "}
              <span className="font-bold">&quot;{search}&quot;</span>
            </>
          ) : (
            <> em destaque</>
          )}{" "}
          {products !== undefined
            ? categories?.map?.((category) => (
                <Tag name={category} key={category} />
              ))
            : ""}
        </div>
      </ProductsTitle>
      <div
        className={`gap-8 flex items-center ${
          displayableProducts?.length === 5
            ? "justify-between"
            : "justify-start"
        }`}
      >
        {" "}
        {displayableProducts?.map?.((product) => (
          <ProductBox key={product.name} product={product} />
        ))}{" "}
      </div>
    </>
  );
}

export default ProductsContainer;
