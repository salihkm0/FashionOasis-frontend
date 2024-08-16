import React, { useEffect, useState } from "react";
import { StatusCard } from "../../components/statusCard/StatusCard";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PersonIcon from "@mui/icons-material/Person";
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import { useSelector } from "react-redux";
import axios from "axios";

export const AdminDashboard = () => {
  const { products } = useSelector((state) => state.products);
  const { orders, loading, error } = useSelector((state) => state.orders);

  
  
  console.log(orders.length)

  return (
    <div className="mx-[5%] mt-[40px]">
      <div className="w-full flex items-center	gap-2 justify-between">
        <StatusCard
          Icon={Inventory2Icon}
          title={"Total Products"}
          count={products.length}
        />
        <StatusCard Icon={ShoppingCartIcon} title={"Total Orders"} count={orders.length} />
        <StatusCard
          Icon={CurrencyRupeeIcon}
          title={"Total Revenue"}
          count={10250}
        />
        <StatusCard Icon={PersonIcon} title={"Total Users"} count={8} />
      </div>
    </div>
  );
};
