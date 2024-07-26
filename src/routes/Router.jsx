import { createBrowserRouter } from "react-router-dom";
import { AdminLayout } from "../layout/adminLayout/AdminLayout";
import { UserLayout } from "../layout/userLayout/UserLayout";
import { AdminDashboard } from "../pages/admin/AdminDashboard";
import { CartPage } from "../pages/CartPage";
import { HomePage } from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import { ProductInfoPage } from "../pages/ProductInfoPage";
import { AllProductPage } from "../pages/AllProductPage";
import About from "../pages/AboutPage";
import { RegisterPage } from "../pages/RegisterPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { OrderSummary } from "../pages/OrderSummary";
import { MyOrders } from "../pages/MyOrders";
export const router = createBrowserRouter([
    //gust routes
    // {
    //   path: "/admin/signin",
    //   element: <AdminSignin />,
    // }
    {
      path: "/signin",
      element: <LoginPage />,
    },
    {
      path: "/register",
      element: <RegisterPage />,
    },
    // admin routes
    {
      element: <AdminLayout />,
      children: [
        {
          path: "/admin/dashboard",
          element: <AdminDashboard />,
        },
    //     {
    //       path: "/admin/profile",
    //       element: <AdminProfile />,
    //     },
    //     {
    //       path: "/products/add",
    //       element: <AddProductPage />,
    //     },
    //     {
    //       path: "/products",
    //       element: <ProductLists />,
    //     },
    //     {
    //       path: "/coupons",
    //       element: <CouponPage />,
    //     },
    //     {
    //       path: "/sellers",
    //       element: <SellerPage />,
    //     },
    //     {
    //       path: "/customers",
    //       element: <CustomersPage />,
    //     },
    //     {
    //       path: "/orders",
    //       element: <OrderPage />,
    //     },
    //     {
    //       path: "/categories",
    //       element: <CategoriesPage />,
    //     },
      ],
    },
    //user routes
    {
      element: <UserLayout />,
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/about",
          element : <About/>
        },
        // {
        //   path: "/about",
        //   element: <AboutPage />,
        // },
        // // {
        // //   path: "/shop",
        // //   element: <ShopPage />,
        // // },
        {
          path: "/shop",
          element: <AllProductPage />,
        },
        {
          path: "/cart",
          element: <CartPage />,
        },
        {
          path: "/checkout",
          element: <CheckoutPage/>,
        },
        {
          path: "/order-summary/:id",
          element: <OrderSummary />,
        },
        {
          path: "/my-orders",
          element: <MyOrders />,
        },
        {
          path: "/product/:id",
          element: <ProductInfoPage/>,
        },
      ],
    },
  ]);
  