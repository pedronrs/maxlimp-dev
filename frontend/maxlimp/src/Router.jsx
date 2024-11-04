import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmailCode from "./pages/ConfirmEmailCode";

import AboutUs from "./pages/AboutUs";
import Config from "./pages/Config";
import Cart from "./pages/Cart";
import ShippingAddress from "./pages/ShippingAddress";
import Payment from "./pages/payment";
import ProductDetails from "./products/ProductDetails";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "configuracoes/",
    element: <Config />,
  },
  {
    path: "configuracoes/:config",
    element: <Config />,
  },
  {
    path: "entrar/",
    element: <Login />,
  },
  {
    path: "registro/",
    element: <Register />,
  },
  {
    path: "validacao/",
    element: <ConfirmEmailCode />,
  },
  {
    path: "sobre-nos/",
    element: <AboutUs />,
  },
  {
    path: "cart/",
    element: <Cart />,
  },
  {
    path: "shipping/",
    element: <ShippingAddress />,
  },
  {
    path: "payment/",
    element: <Payment />,
  },
  {
    path: "product/:id",
    element: <ProductDetails />,
  },
]);

export default router;
