import { Box, Grid, Typography, Paper } from "@mui/material";
import AddToCart from "../components/AddToCart";
import { Link, useParams } from "react-router-dom";
import useSWR from "swr";
import { getFetcher } from "../services/data";
import HeaderHome from "../components/HeaderHome";
import Footer from "../components/Footer";

function ProductDetails() {
  const { id } = useParams();

  const { data: product } = useSWR(
    `products/especific-product?product=${id}`,
    getFetcher
  );

  if (!product) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Typography variant="h5">Produto não encontrado</Typography>
      </Box>
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
              <Typography variant="h6" color="text.secondary">
                R$ {product.price}
              </Typography>
              <AddToCart product={product} />
            </Grid>
          </Grid>
        </Paper>
      </Box>
    </>
  );
}

export default ProductDetails;
