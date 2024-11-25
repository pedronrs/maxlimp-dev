import React from "react";


function OverviewCards(){
    const pedidos = 325
    const faturamento = 28750.90
    const ticket = faturamento / pedidos


    const dataCards = [
        { title: "Faturamento Total", value: `R$ ${faturamento.toFixed(2).toLocaleString('pt-br')}`},
        { title: "Número Total de Pedidos", value: pedidos },
        { title: "Ticket Médio", value: `R$ ${ticket.toFixed(2).toLocaleString('pt-br')}` },
        { title: "Produtos Mais Vendidos", value: "Detergente, Desinfetante, Esponja" },
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {dataCards.map((item, index) => (
            <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 text-center"
            >
            <h3 className="text-gray-600 font-bold">{item.title}</h3>
            <p className="text-blue-900 text-lg font-semibold">{item.value}</p>
            </div>
        ))}
        </div>
    );
};

export default OverviewCards;
