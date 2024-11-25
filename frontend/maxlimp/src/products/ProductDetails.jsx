import {
  Box,
  Grid,
  Typography,
  Paper,
  Rating,
  CircularProgress,
} from "@mui/material";
import AddToCart from "../components/AddToCart";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../services/data";
import HeaderHome from "../components/HeaderHome";
import Footer from "../components/Footer";
import ProductComments from "./ProductComment";
import { useState } from "react";
import Loading from "../components/Loading";

function ProductDetails() {
  const { id } = useParams();
  const [rating, setRating] = useState(0);
  const [averageRating, setAverageRating] = useState(0);

  const handleAverageRatingUpdate = (newAverage) => {
    setAverageRating(newAverage);
  };

  const { data: product, isLoading } = useSWR(
    `products/especific-product?product=${id}`,
    getFetcher
  );

  if (isLoading) {
    return (
      <>
        {" "}
        <HeaderHome showSearch={false}></HeaderHome>
        <Grid container justifyContent="center" alignItems="center">
          <Loading classNames="w-[30%]" />
        </Grid>
      </>
    );
  }

  if (!product?.description) {
    return (
      <>
        <HeaderHome showSearch={false} />
        <Box
          display="flex"
          justifyContent="center"
          alignItems="center"
          height="100vh"
        >
          <Typography variant="h5">Produto não encontrado</Typography>
        </Box>
      </>
    );
  }

  return (
    <>
      <HeaderHome showSearch={false} />
      <Box
        p={4}
        display="flex"
        justifyContent="center"
        alignItems="start"
        minHeight="100vh"
        sx={{ backgroundColor: "#f5f5f5" }}
      >
        <Paper
          elevation={3}
          sx={{ padding: 3, borderRadius: 2, width: "100%", maxWidth: 900 }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <img
                src={product.image}
                alt={product.name}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h4" component="div" gutterBottom>
                {product.name}
              </Typography>
              <Typography variant="body1" gutterBottom>
                {product.description}
              </Typography>
              <Rating precision={0.5} value={Number(averageRating)} readOnly />
              <Typography variant="h6" color="text.secondary">
                R$ {product.price}
              </Typography>
              <AddToCart product={product} />
            </Grid>
          </Grid>

          <ProductComments
            product={product}
            rating={rating}
            setRating={setRating}
            onAverageRatingUpdate={handleAverageRatingUpdate}
          />
        </Paper>
      </Box>
    </>
  );
}

export default ProductDetails;
