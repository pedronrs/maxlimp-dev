import { getFetcher } from "../services/data";
import { useProducts } from "../contexts/ProductsProvider";
import { useFilter } from "../contexts/FilterProvider";

import useSWR from "swr";
import ProductBox from "./ProductBox";
import ProductsTitle from "./ProductsTitle";
import Tag from "../components/Tag";

import React, { useState, useEffect } from "react";
import { Grid, CircularProgress, Box, Pagination } from "@mui/material";

function ProductsContainer() {
  const { products, search, setProducts, setFilter } = useProducts();
  const { categories, price, handleCategoryChange } = useFilter();
  const [page, setPage] = useState(1);
  const maxItens = 2; // Quantidade para teste, mudar depois da adição de mais produtos
  const [totalPages, setTotalPages] = useState(1);

  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  useEffect(() => {
    if (data) {
      setProducts(data);
      setTotalPages(Math.ceil(data.length / maxItens));
    }
  }, [data]);

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

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const startIndex = (page - 1) * maxItens;
  const displayableProducts = data.slice(startIndex, startIndex + maxItens);

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
      <div className={`gap-8 flex items-center justify-center`}>
        <Grid container spacing={2} justifyContent="center">
          {displayableProducts.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.name}>
              <ProductBox product={product} />
            </Grid>
          ))}
        </Grid>
      </div>
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </Box>
    </>
  );
}

export default ProductsContainer;
