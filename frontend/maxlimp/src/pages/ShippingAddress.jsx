import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useOrder } from '../contexts/OrderContext';

function ShippingAddress() {
  const { order, setOrder } = useOrder();
  const [address, setAddress] = useState(order.address);
  const [shippingCost, setShippingCost] = useState(order.shippingCost);
  const navigate = useNavigate();

  const calculateShipping = () => {
    const cost = 5;
    setShippingCost(cost);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOrder((prevOrder) => ({ ...prevOrder, address, shippingCost }));
    navigate('/payment');
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="w-7/10">
        <h2 className="text-2xl font-semibold mb-4">Endereço de Entrega</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            className="border p-2 rounded"
            placeholder="Digite seu endereço"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button
            type="button"
            className="bg-indigo-600 text-white px-4 py-2 rounded-full transition-all duration-300"
            onClick={calculateShipping}
          >
            Calcular Frete
          </button>
          {(shippingCost !== null && shippingCost > 0) && (
            <div className="text-lg">
              Valor do frete: R${shippingCost}
            </div>
          )}
          <button
            type="submit"
            className="bg-green-400 text-white px-4 py-2 rounded-full transition-all duration-300"
          >
            Ir para Pagamento
          </button>
        </form>
      </div>
    </div>
  );
}

export default ShippingAddress;
