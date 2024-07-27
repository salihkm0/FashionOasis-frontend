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
import { ProfilePage } from "../pages/ProfilePage";
// import { GustLayout } from "../layout/gustLayout/GustLayout";
export const router = createBrowserRouter([
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
        {
          path: "/shop",
          element: <AllProductPage />,
        },
        {
          path: "/product/:id",
          element: <ProductInfoPage/>,
        },
        {
          path: "/user/cart",
          element: <CartPage />,
        },
        {
          path: "/user/checkout",
          element: <CheckoutPage/>,
        },
        {
          path: "/user/order-summary/:id",
          element: <OrderSummary />,
        },
        {
          path: "/user/my-orders",
          element: <MyOrders />,
        },
        {
          path: "/user/profile",
          element: <ProfilePage/>,
        },
      ],
    },
    // {
    //   element: <GustLayout />,
    //   children: [
        
    //   ],
    // },
  ]);
  