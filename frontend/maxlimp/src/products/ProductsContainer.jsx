import { postFetcher, getFetcher } from "../services/data";
import { useProducts } from "../contexts/ProductsProvider";
import { useFilter } from "../contexts/FilterProvider";

import useSWR from "swr";
import ProductBox from "./ProductBox";
import ProductsTitle from "./ProductsTitle";
import Tag from "../components/Tag";

import React from "react";
import { Grid, CircularProgress, Typography } from "@mui/material";

function ProductsContainer() {
  const { products, search, setProducts, setFilter } = useProducts();
  const { categories, price, handleCategoryChange } = useFilter();

  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  const productsToDisplay = products !== undefined ? products : data;

  if (isLoading) {
    return (
      <>
        <ProductsTitle>{search ? `"${search}"` : "em destaque"}</ProductsTitle>
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      </>
    );
  }

  const displayableProducts =
    productsToDisplay?.length > 5
      ? productsToDisplay.slice(0, 5)
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
        <Grid container spacing={2} justifyContent="center">
          {displayableProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.name}>
              <ProductBox product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}

export default ProductsContainer;
