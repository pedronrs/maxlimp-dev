import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { RouterProvider } from "react-router-dom";

import router from "./Router";
import { AuthProvider } from "./contexts/AuthProvider";
import { ProductsProvider } from "./contexts/ProductsProvider";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <ProductsProvider>
        <RouterProvider router={router} />
      </ProductsProvider>
    </AuthProvider>
  </StrictMode>
);
