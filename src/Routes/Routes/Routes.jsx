import { createBrowserRouter } from "react-router";
import Error from "../../Error/Error";
import Root from "../../Layouts/Root/Root";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register";
import PrivateRoutes from "../Private/PrivateRoutes";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        index: true,
        path: "/",
        element: <Home />,
      },

      {
        path: "products",
        element: <PrivateRoutes><Products></Products></PrivateRoutes>,
      },
      {
        path: "login",
        element: <Login> </Login>,
      },
      {
        path: "register",
        element: <Register> </Register>,
      },
    ],
  },
]);
