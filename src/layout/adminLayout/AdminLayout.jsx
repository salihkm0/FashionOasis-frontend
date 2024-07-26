import React from 'react'
import { Outlet } from 'react-router-dom'
import { AdminNavbar } from '../../components/navbar/AdminNavbar'

export const AdminLayout = () => {
  return (
    <>
    <AdminNavbar/>
    <Outlet/>
    </>
  )
}
