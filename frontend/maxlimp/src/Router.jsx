import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmailCode from "./pages/ConfirmEmailCode";

import AboutUs from "./pages/AboutUs";
import Config from "./pages/Config";

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
]);

export default router;
