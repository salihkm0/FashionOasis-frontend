import React, { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { Footer } from "../../components/footer/Footer";
import { Navbar } from "../../components/navbar/Navbar";
import { ScrollTop } from "../../components/scrollTop/ScrollTop";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../redux/authSlice";
import { fetchProducts } from "../../redux/productsSlice";
import { Loading } from "../../components/loading/Loading";
import Navbar2 from "../../components/navbar/Navbar_2";
// import { fetchCurrentUser } from '../../redux/authSlice';


export const UserLayout = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const { products, productStatus, error } = useSelector((state) => state.products);


  
  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchUserProfile());
    }
    if (productStatus === 'idle') {
      dispatch(fetchProducts());
    }
  }, [status, dispatch ,productStatus,user]);

  if (status === 'loading') {
    return <Loading/>;
    // return <div>Loading...</div>;
  }


  console.log('products' , products)

  console.log("user", user)

  return (
    <>
      {/* <Navbar /> */}
      <Navbar2/>
      <div className="main-content min-h-screen">
        <ScrollTop />
        <Outlet />
      </div>
      <Footer />
    </>
  );
};
