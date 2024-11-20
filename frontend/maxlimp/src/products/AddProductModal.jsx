import React, { useState } from 'react';
import { Box, Modal, Button, TextField, Typography } from '@mui/material';
import { postFetcher } from '../services/data';

const AddProductModal = ({ open, onClose, onSuccess }) => {
  const [productName, setProductName] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productQuantity, setProductQuantity] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAddProduct = async () => {
    setLoading(true);
    setError(null);
    try {
      await postFetcher('admin/add-product/', {
        arg: {
          name: productName,
          price: productPrice,
          description: productDescription,
          image: productImage,
          quantity: productQuantity,
          category: productCategory,
        }
      });
      setProductName('');
      setProductPrice('');
      setProductImage('');
      setProductDescription('');
      setProductQuantity('');
      setProductCategory('');
      onSuccess();
      onClose();
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="add-product-modal-title"
      aria-describedby="add-product-modal-description"
    >
      <Box sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      }}>
        <Typography id="add-product-modal-title" variant="h6" component="h2">
          Adicionar Produto
        </Typography>
        <Box component="form" sx={{ mt: 2 }}>
          <TextField
            label="Nome do Produto"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Preço do Produto"
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Descrição do Produto"
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="URL da Imagem"
            value={productImage}
            onChange={(e) => setProductImage(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Quantidade"
            value={productQuantity}
            onChange={(e) => setProductQuantity(e.target.value)}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Categoria"
            value={productCategory}
            onChange={(e) => setProductCategory(e.target.value)}
            fullWidth
            margin="normal"
          />
          {error && <Typography color="error" variant="body2">{error}</Typography>}
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddProduct}
            disabled={loading}
            fullWidth
            sx={{ mt: 2 }}
          >
            {loading ? 'Adicionando...' : 'Adicionar Produto'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default AddProductModal;
