import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const AllProducts = () => {
const [allProducts, setAllProducts] = useState({})

  const { products, productStatus, error } = useSelector(
    (state) => state.products
  );


  const handleSetProducts = () => {
    setAllProducts(products);
  }


  useEffect(() => {
    handleSetProducts()
  }, [allProducts,products])
  
  return (
    <div className="mx-[100px] my-[50px]">
      <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} >
      <h1 className="text-3xl my-5">Products</h1>
      <Link to={'/products/add'} className="text-xl p-2 rounded-[4px] bg-green-500 text-white hover:bg-green-600">Add Product</Link>
      </Stack>
      
      {productStatus === "loading" ? (
        <p>Loading...</p>
      ) : productStatus === "failed" ? (
        <p>Error: {error}</p>
      ) : (
        <ul className="w-full h-auto border p-4 font-bold">
          {products.map((product) => (
            <li className="text-lg font-bold flex gap-4" key={product._id}>
              <span>{product.name}</span>
              <span>{product.price}</span>
              <span>{product.offerPrice.toFixed(2)}</span>
              <span>{product.category}</span>
              <span>{product.subCategory}</span>
              <span>{product.subSubCategory}</span>
              <span>{product.brand}</span>
              
              
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
