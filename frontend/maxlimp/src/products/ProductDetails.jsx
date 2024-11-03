import React from 'react';
import { useProduct } from '../contexts/ProductContext';
import { Box, Grid, Typography, Paper } from '@mui/material';
import AddToCart from '../components/AddToCart';
import { Link } from 'react-router-dom';

function ProductDetails() {
  const { product } = useProduct();

  if (!product) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Typography variant="h5">Produto não encontrado</Typography>
      </Box>
    );
  }

  return (
    <Box 
      p={4} 
      display="flex" 
      justifyContent="center" 
      alignItems="center" 
      minHeight="100vh"
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Paper elevation={3} sx={{ padding: 3, borderRadius: 2, width: '100%', maxWidth: 900 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <img
              src={product.image}
              alt={product.name}
              style={{ width: '100%', height: 'auto', borderRadius: '8px' }}
            />
          </Grid>
          <Grid item xs={12} md={6} >
            <Typography variant="h4" component="div" gutterBottom>
              {product.name}
            </Typography>
            <Typography variant="body1" gutterBottom>
              {product.description}
            </Typography>
            <Typography variant="h6" color="text.secondary">
              R$ {product.price}
            </Typography>
            <Link to='/cart'><AddToCart product={product}/></Link> 
          </Grid>
        </Grid>
      </Paper>
    </Box>
  );
}

export default ProductDetails;
