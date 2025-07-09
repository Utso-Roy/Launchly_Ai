import { createBrowserRouter } from "react-router";
import Error from "../../Error/Error";
import Root from "../../Layouts/Root/Root";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";
import Login from "../../Pages/Login/Login"
import Register from "../../Pages/Register/Register";
import PrivateRoutes from "../Private/PrivateRoutes";
import DashboardLayout from "../../Layouts/Deshbord/DashboardLayout";
import Products_Details_Page from "../../Pages/Products_Details/Products_Details_Page";

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
      {
        path: "/products/:id",
        element: <PrivateRoutes><Products_Details_Page></Products_Details_Page></PrivateRoutes>,
      },
    ],
  },

  {
    path: '/dashboard',
    element: <DashboardLayout></DashboardLayout>,
    errorElement: <Error></Error>,
    
    children: [
      {
        index: true,
        path: '/dashboard',
        // element : <Home></Home>
        

      }



    ]



}

]);
