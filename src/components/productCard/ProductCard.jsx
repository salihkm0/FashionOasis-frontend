import React from "react";

export const ProductCard = ({
  image,
  title,
  price,
  color,
  subCategory,
  quantity,
  category
}) => {
  return (
    <>
      <div className=" mt-5border border-gray-300 rounded-md overflow-hidden shadow-md cursor-pointer">
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
      </div>
    </>
  );
};
