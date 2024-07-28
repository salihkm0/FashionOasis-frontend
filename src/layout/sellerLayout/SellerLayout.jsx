import React, { useEffect } from 'react'
import { SellerNavbar } from '../../components/navbar/SellerNavbar'
import { Outlet } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserProfile } from '../../redux/authSlice';
import { fetchProducts } from '../../redux/productsSlice';
import { Loading } from '../../components/loading/Loading';

export const SellerLayout = () => {
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
        <SellerNavbar/>
        <Outlet/>
    </>
  )
}
