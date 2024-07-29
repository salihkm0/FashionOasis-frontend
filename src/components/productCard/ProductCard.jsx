import { Link } from "@mui/material";
import React from "react";
import "./ProductCard.css";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../../redux/cartSlice";
import { useDispatch } from "react-redux";

export const ProductCard = ({ image, name, price, offerPrice, id, brand }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (productId, quantity) => {
    console.log(' productId :', productId,"quantity : ", quantity)
    dispatch(addToCart({ productId, quantity }));
  };

  return (
    <>
      {/* <div className=" mt-5border border-gray-300 rounded-md overflow-hidden shadow-md cursor-pointer">
        <img
          className="lg:h-80  h-96 w-full"
          src={image}
          alt="blog"
          onClick={() => navigate(`/product/${index}`)}
        />
        <div className="p-6">
          <h2
            className="tracking-widest text-xs title-font font-medium text-gray-400 mb-1"
            onClick={() => navigate(`/product/${index}`)}
          >
            E-bharat
          </h2>
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3"
            onClick={() => navigate(`/product/${index}`)}
          >
            {title.substring(0, 25)}
          </h1>
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3"
            onClick={() => navigate(`/product/${index}`)}
          >
            {color.substring(0, 25)}
          </h1>
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3"
            onClick={() => navigate(`/product/${index}`)}
          >
            {category.substring(0, 25)}
          </h1>
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3"
            onClick={() => navigate(`/product/${index}`)}
          >
            {subCategory.substring(0, 25)}
          </h1>
          <h1
            className="title-font text-lg font-medium text-gray-900 mb-3"
            onClick={() => navigate(`/product/${index}`)}
          >
            ₹{price}
          </h1>

          <div className="flex justify-center ">
            {quantity === 0 ? (
              <button disabled style={{cursor : "not-allowed"}} className="bg-red-500 hover:bg-red-500 w-full text-white py-[4px] rounded-lg font-bold">
                Out of Stock
              </button>
            ) : (
              <button className=" bg-green-500 hover:bg-green-500 w-full text-white py-[4px] rounded-md font-bold">
                Add To Cart
              </button>
            )}
          </div>
        </div>
      </div> */}
      <div className="product-card">
        <div className="product-img">
          <img src={image} alt="" />
        </div>
        <div className="p-5">
          <div className="product-details">
            <p className="product-barnd">{brand}</p>
            <h1 className="product-title">{name}</h1>
            <div className="product-price-details">
              <div className="product-offerPrice">{offerPrice.toFixed(2)}</div>
              <div className="product-price">{price.toFixed(2)}</div>
            </div>
          </div>
          <div className="product-action">
            {/* <div className="add-to-cart"> */}
            <button onClick={() => handleAddToCart(id,1)}>Add to Cart</button>
            {/* </div> */}
          </div>
        </div>
      </div>
    </>
  );
};
