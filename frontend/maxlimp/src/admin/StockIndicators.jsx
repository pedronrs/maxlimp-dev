import React from "react";

function StockIndicators(){
  const data = [
    { title: "Produtos em Baixa", value: "5" },
    { title: "Produtos Esgotados", value: "2" },
  ];

  return (
    <div className="bg-white shadow-md rounded-lg p-6">
      <h3 className="text-gray-600 font-bold mb-4">Indicadores de Estoque</h3>
      <ul>
        {data.map((item, index) => (
          <li key={index} className="text-gray-800">
            <strong>{item.title}:</strong> {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StockIndicators;
