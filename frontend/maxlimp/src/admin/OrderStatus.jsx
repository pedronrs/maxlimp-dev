import React from "react";
import { Link } from "react-router-dom";

const pedidosData = [
  { name: "Pendentes", value: 5 },
  { name: "Em Processamento", value: 15 },
  { name: "Entregues", value: 300 },
  { name: "Cancelados", value: 5 },
];

function OrdersStatus(){
  return (
    <Link to='/pedidos'>
        <div className="bg-white shadow-md rounded-lg p-6">
        <h3 className="text-gray-600 font-bold mb-4">Gestão de Pedidos</h3>
        <ul>
            {pedidosData.map((item, index) => (
            <li key={index} className="text-gray-800">
                <strong>{item.name}:</strong> {item.value}
            </li>
            ))}
        </ul>
        </div>
    </Link>
  );
};

export default OrdersStatus;


