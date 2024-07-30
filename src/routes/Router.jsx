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
import { AllProducts } from "../pages/admin/AllProducts";
import { AllUsers } from "../pages/admin/AllUsers";
import { AllOrders } from "../pages/admin/AllOrders";
import { SellerLayout } from "../layout/sellerLayout/SellerLayout";
import { SellerDashboard } from "../pages/seller/SellerDashboard";
import { AuthOptionSelectPage } from "../pages/AuthOptionSelectPage";
import { AddProductPage } from "../pages/seller/AddProductPage";
// import { UpdateProductPage } from "../pages/seller/UpdateProductPage";
import { CouponList } from "../pages/admin/AllCoupons";
import { ProductInfoPage_2 } from "../pages/ProductInfoPage_2";
// import { GustLayout } from "../layout/gustLayout/GustLayout";
export const router = createBrowserRouter([
  {
    path: "/signin",
    element: <AuthOptionSelectPage />,
  },
  {
    path: "/signin/email",
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
      {
        path: "/products/add",
        element: <AddProductPage />,
      },
      // {
      //   path: "/products/update/:id",
      //   element: <UpdateProductPage />,
      // },
      {
        path: "/admin/products",
        element: <AllProducts />,
      },
      {
        path: "/admin/coupons",
        element: <CouponList />,
      },
      {
        path: "/admin/users",
        element: <AllUsers />,
      },
      {
        path: "/admin/orders",
        element: <AllOrders />,
      },
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
        element: <About />,
      },
      {
        path: "/shop",
        element: <AllProductPage />,
      },
      {
        path: "/product/2/:id",
        element: <ProductInfoPage />,
      },
      {
        path: "/product/:id",
        element: <ProductInfoPage_2 />,
      },
      {
        path: "/user/cart",
        element: <CartPage />,
      },
      {
        path: "/user/checkout",
        element: <CheckoutPage />,
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
        element: <ProfilePage />,
      },
    ],
  },
  {
    element: <SellerLayout />,
    children: [
      {
        path: "/seller/dashboard",
        element: <SellerDashboard />,
      },
      {
        path: "/seller/products",
        element: <AllProducts />,
      },
      {
        path: "/seller/coupons",
        element: <CouponList />,
      },
      {
        path: "/seller/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/seller/orders",
        element: <AllOrders />,
      },
      {
        path: "/products/add",
        element: <AddProductPage />,
      },
    ],
  },
]);
