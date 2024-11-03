import React, { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { useOrder } from '../contexts/OrderContext';
import { createStaticPix, hasError } from 'pix-utils';
import { Box, Typography, Paper } from '@mui/material';

function Payment() {
  const { order } = useOrder();
  const { total, shippingCost } = order;
  const totalAmount = (parseFloat(total) + parseFloat(shippingCost)).toFixed(2);
  const [qrValue, setQrValue] = useState('');

  useEffect(() => {
    if (!isNaN(totalAmount)) {
      const payload = createStaticPix({
        merchantName: 'maxlimp',
        merchantCity: 'rio',
        pixKey: 'davidpereira2302@gmail.com',
        infoAdicional: '',
        transactionAmount: Number(totalAmount),
      });

      if (!hasError(payload)) {
        const brCode = payload.toBRCode();
        setQrValue(brCode);
      }
    }
  }, [totalAmount]);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      p={2}
      sx={{ backgroundColor: '#f5f5f5' }}
    >
      <Paper elevation={3} sx={{ padding: 4, borderRadius: 3, maxWidth: 400, textAlign: 'center' }}>
        <Typography variant="h4" component="h2" gutterBottom>
          Pagamento
        </Typography>
        <Typography variant="h6" gutterBottom>
          Total da compra: R$ {totalAmount}
        </Typography>
        {qrValue && (
          <Box display="flex" flexDirection="column" alignItems="center" mt={3}>
            <QRCode value={qrValue} size={200} />
            <Typography variant="body1" mt={2}>
              Use o QR Code acima para pagar com Pix.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Payment;
