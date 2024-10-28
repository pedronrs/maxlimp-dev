import { createBrowserRouter } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ConfirmEmailCode from "./pages/ConfirmEmailCode";
import Profile from "./pages/Profile";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "perfil/",
    element: <Profile />,
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
]);

export default router;
