import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmailCode from "./pages/ConfirmEmailCode";

import AboutUs from "./pages/AboutUs";
import Config from "./pages/Config";
import Cart from "./pages/Cart";
import NotFound from "./components/NotFound";

import ProductDetails from "./products/ProductDetails";
import Address from "./pages/Address";
import { AdddresssProvider } from "./contexts/AddressProvider";
import { Admin } from "./admin/Admin";
import Orders from "./pages/Orders";

const router = createBrowserRouter([
  {
    path: "*",
    element: <NotFound />,
  },
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
    path: "carrinho/",
    element: <Cart />,
  },
  {
    path: "compra/",
    element: <Address />,
  },
  {
    path: "produto/:id",
    element: <ProductDetails />,
  },
  {
    path: "pedidos/",
    element: <Orders />,
  },
]);

export default router;
