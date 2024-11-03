import { StrictMode } from "react";
import { createRoot } from "react-dom/client";


import { RouterProvider } from "react-router-dom";

import router from "./Router";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";
import { CartProvider } from "./contexts/CartContext";
import { OrderProvider } from "./contexts/OrderContext";
import { ProductProvider } from "./contexts/ProductContext";

createRoot(document.getElementById("root")).render(
  <CartProvider>
    <StrictMode>
      <AuthProvider>
        <OrderProvider>
          <ProductsProvider>
            <ProductProvider>
              <RouterProvider router={router} />
            </ProductProvider>
          </ProductsProvider>
        </OrderProvider>
      </AuthProvider>
    </StrictMode>
  </CartProvider>
);
