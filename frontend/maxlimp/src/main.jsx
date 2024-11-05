import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import router from "./Router";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";

import { FilterProvider } from "./contexts/FilterProvider";
import { AdddresssProvider } from "./contexts/AddressProvider";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <AuthProvider>
        <AdddresssProvider>
          <FilterProvider>
            <OrderProvider>
              <ProductsProvider>
                <RouterProvider router={router} />
              </ProductsProvider>
            </OrderProvider>
          </FilterProvider>
        </AdddresssProvider>
      </AuthProvider>
    </StrictMode>
  </CartProvider>
);
