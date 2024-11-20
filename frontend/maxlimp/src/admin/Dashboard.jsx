import React from "react";
import OverviewCards from "./OverviewCards";
import StockIndicators from "./StockIndicators";
import { SalesChart } from "./SalesChart";
import OrdersStatus from "./OrderStatus";

function Dashboard() {
  return (
    <div className="space-y-6 mx-5 pb-3">
      <header className="bg-blue-900 text-white p-4 rounded-md">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
      </header>
      <OverviewCards />
      <SalesChart />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StockIndicators />
        <OrdersStatus />
      </div>
    </div>
  );
}

export default Dashboard;
