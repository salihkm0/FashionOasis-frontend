import React, { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar } from '../../components/navbar/AdminNavbar'
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../redux/productsSlice';
import { fetchUserProfile } from '../../redux/authSlice';
import { Loading } from '../../components/loading/Loading';
// import Sidebar from '../../components/sidebar/Sidebar';

export const AdminLayout = () => {
  const dispatch = useDispatch();
  const { user, status } = useSelector((state) => state.auth);
  const { products, productStatus, error } = useSelector((state) => state.products);
  const [isDrawerOpen, setDrawerOpen] = useState(false)


  
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
    <AdminNavbar/>
    {/* <Sidebar onClose={() => setDrawerOpen(false)} open={isDrawerOpen}/> */}
    <Outlet/>
    </>
  )
}
