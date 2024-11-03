import React from 'react';
import { Grid, CircularProgress, Typography } from '@mui/material';
import useSWR from 'swr';
import { getFetcher } from '../services/data';
import { useProducts } from '../contexts/ProductsProvider';
import ProductBox from './ProductBox';
import ProductsTitle from './ProductsTitle';

function ProductsContainer() {
  const { products, search } = useProducts();
  const { data, isLoading } = useSWR("products/all-products/", getFetcher);

  const productsToDisplay = search ? products : data;

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

  const displayableProducts = productsToDisplay?.length > 5
    ? productsToDisplay.slice(0, 5)
    : productsToDisplay;

  return (
    <>
      <ProductsTitle>{search ? `"${search}"` : "em destaque"}</ProductsTitle>
      <Grid container spacing={2} justifyContent="center">
        {displayableProducts.map((product) => (
          <Grid item xs={12} sm={6} md={4} lg={3} xl={2} key={product.name}>
            <ProductBox product={product} />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default ProductsContainer;
