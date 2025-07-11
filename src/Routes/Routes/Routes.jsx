import { createBrowserRouter } from "react-router";
import Error from "../../Error/Error";
import Root from "../../Layouts/Root/Root";
import Home from "../../Pages/Home/Home";
import Products from "../../Pages/Products/Products";
import Login from "../../Pages/Login/Login";
import Register from "../../Pages/Register/Register";
import PrivateRoutes from "../Private/PrivateRoutes";
import DashboardLayout from "../../Layouts/Deshbord/DashboardLayout";
import Products_Details_Page from "../../Pages/Products_Details/Products_Details_Page";
import My_Profile from "../../Pages/My_Profile/My_Profile";
import My_Products from "../../Pages/My_products/My_Products";
import Add_Products from "../../Pages/Add_Products/Add_Products";
import ReviewQueue from "../../Pages/Review/ReviewQueue";
import MangeCoupon from "../../Pages/ManageCoupon/MangeCoupon";
import MangeUser from "../../Pages/ManageUser/MangeUser";
import Statistics from "../../Pages/statisticis/Statistics";
import ReportedContent from "../../Pages/Report/ReportedContent";
import ReportDetails from "../../Pages/ReportDetails/ReportDetails";

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
        element: <Products></Products>,
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
        element: (
          <PrivateRoutes>
            <Products_Details_Page></Products_Details_Page>
          </PrivateRoutes>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <PrivateRoutes>
        {" "}
        <DashboardLayout></DashboardLayout>{" "}
      </PrivateRoutes>
    ),
    errorElement: <Error></Error>,

    children: [
      {
        index: true,
        path: "/dashboard/profile",
        element: (
          <PrivateRoutes>
            {" "}
            <My_Profile></My_Profile>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/myProducts",
        element: (
          <PrivateRoutes>
            <My_Products></My_Products>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/addProduct",
        element: (
          <PrivateRoutes>
            {" "}
            <Add_Products></Add_Products>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reviewQueue",
        element: (
          <PrivateRoutes>
            {" "}
            <ReviewQueue></ReviewQueue>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reportedContents",
        element: (
          <PrivateRoutes>
            {" "}
            <ReportedContent></ReportedContent>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/statistics",
        element: (
          <PrivateRoutes>
            {" "}
            <Statistics></Statistics>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/manageUsers",
        element: (
          <PrivateRoutes>
            {" "}
            <MangeUser></MangeUser>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/manageCoupons",
        element: (
          <PrivateRoutes>
            {" "}
            <MangeCoupon></MangeCoupon>{" "}
          </PrivateRoutes>
        ),
      },
      {
        path: "/dashboard/reportDetails/:id",
        element: (
          <PrivateRoutes>
            {" "}
            <ReportDetails></ReportDetails>{" "}
          </PrivateRoutes>
        ),
      },
    ],
  },
]);
