import React from 'react'
import { SellerNavbar } from '../../components/navbar/SellerNavbar'
import { Outlet } from 'react-router-dom'

export const SellerLayout = () => {
  return (
    <>
        <SellerNavbar/>
        <Outlet/>
    </>
  )
}
