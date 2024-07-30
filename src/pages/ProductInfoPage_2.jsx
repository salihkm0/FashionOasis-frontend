import { Rating } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../redux/cartSlice";
import { useDispatch } from "react-redux";

export const ProductInfoPage_2 = () => {
  const [product, setProduct] = useState("");
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [prevImg, setPrevImg] = useState(null);
  const [sizeSelected, setSizeSelected] = useState(null);

  const dispatch = useDispatch();

  const size = sizeSelected && sizeSelected.size;

  const handleAddToCart = (productId, quantity) => {
    console.log(
      " productId :",
      productId,
      "quantity : ",
      quantity,
      "size : ",
      size
    );
    dispatch(addToCart({ productId, quantity, size }));
  };

  console.log(id);

  useEffect(() => {
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `http://localhost:5555/api/v1/product/${id}`
        );
        console.log(res.data);
        if (!res) {
          return console.log("Product not found");
        }
        setProduct(res.data.product);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProductDetails();
  }, [id]);

  console.log("product:", product);
  console.log(sizeSelected);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
  }

  const { imageUrls, description, offerPrice, price, brand, sizes, _id, name } =
    product;

  return (
    <>
      {loading ? (
        "Loading..."
      ) : (
        <div className="mt-[50px]">
          <div className="font-sans">
            <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
              <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
                {/* <div className="w-full lg:sticky top-0 sm:flex gap-2 shadow-xl p-3"> */}
                <div className="w-full sm:flex gap-2 shadow-xl rounded-md p-3 ">
                  <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4 ">
                    {imageUrls.length > 0
                      ? imageUrls.map((img) => (
                          <img
                            src={img}
                            alt="Product1"
                            className="w-full cursor-pointer rounded-md outline"
                            onMouseOver={() => setPrevImg(img)}
                          />
                        ))
                      : ""}
                  </div>
                  <img
                    src={
                      imageUrls.length > 0 && prevImg === null
                        ? imageUrls[0]
                        : prevImg
                    }
                    alt="Product"
                    className="w-4/5 rounded-md object-cover"
                  />
                </div>
                <div className="ml-2">
                  <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
                  <div className="flex flex-wrap gap-4 mt-4">
                    <p className="text-gray-800 text-xl font-bold">
                      ${offerPrice.toFixed(2)}
                    </p>
                    <p className="text-gray-400 text-xl">
                      <strike>${price}</strike>
                      <span className="text-sm ml-1.5">Tax included</span>
                    </p>
                  </div>
                  <div className="flex space-x-2 mt-4">
                    <Rating
                      name="half-rating-read"
                      defaultValue={4.5}
                      precision={0.5}
                      readOnly
                    />
                    <h4 className="text-gray-800 text-base">500 Reviews</h4>
                  </div>
                  <form action="">
                    <div className="mt-8">
                      <h3 className="text-xl font-bold text-gray-800">Sizes</h3>
                      <div className="flex flex-wrap gap-4 mt-2">
                        {sizes.map((size) => (
                          <label className="filter-label flex items-center gap-3">
                            <input
                              type="radio"
                              name="category"
                              value=""
                              id=""
                              className="filter-radio-select"
                              required
                              onChange={() => setSizeSelected(size)}
                            />
                            <div className="sizeSelect uppercase font-bold rounded-md">
                              {size.size}
                            </div>
                          </label>
                        ))}
                      </div>
                      {sizeSelected
                        ? sizeSelected.quantity <= 0 && (
                            <p className="mt-3 text-red-600">Out of Stock</p>
                          )
                        : ""}
                      {sizeSelected
                        ? sizeSelected.quantity === 1 && (
                            <p className="mt-3 text-yellow-500">
                              Only 1 left, Hurry Up
                            </p>
                          )
                        : ""}
                    </div>
                    <button
                      type="button"
                      className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md disabled:opacity-60"
                      disabled={
                        sizeSelected === null || sizeSelected.quantity === 0
                      }
                      onClick={() => handleAddToCart(_id, 1)}
                    >
                      Add to cart
                    </button>
                  </form>
                  <div className="mt-8">
                    <h3 className="text-xl font-bold text-gray-800">
                      About the item
                    </h3>
                    <p className="text-md text-gray-800 mt-4">
                      {product.description}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md p-6 mx-[60px] mb-10">
            <h3 className="text-xl font-bold text-gray-800">Reviews(10)</h3>
            <div className="grid md:grid-cols-2 gap-12 mt-4">
              <div className="space-y-3">
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">5.0</p>
                  <svg
                    className="w-5 fill-blue-600 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-2/3 h-full rounded bg-blue-600" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">66%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">4.0</p>
                  <svg
                    className="w-5 fill-blue-600 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/3 h-full rounded bg-blue-600" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">33%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">3.0</p>
                  <svg
                    className="w-5 fill-blue-600 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/6 h-full rounded bg-blue-600" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">16%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">2.0</p>
                  <svg
                    className="w-5 fill-blue-600 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-1/12 h-full rounded bg-blue-600" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">8%</p>
                </div>
                <div className="flex items-center">
                  <p className="text-sm text-gray-800 font-bold">1.0</p>
                  <svg
                    className="w-5 fill-blue-600 ml-1"
                    viewBox="0 0 14 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M7 0L9.4687 3.60213L13.6574 4.83688L10.9944 8.29787L11.1145 12.6631L7 11.2L2.8855 12.6631L3.00556 8.29787L0.342604 4.83688L4.5313 3.60213L7 0Z" />
                  </svg>
                  <div className="bg-gray-400 rounded w-full h-2 ml-3">
                    <div className="w-[6%] h-full rounded bg-blue-600" />
                  </div>
                  <p className="text-sm text-gray-800 font-bold ml-3">6%</p>
                </div>
              </div>
              <div>
                <div className="flex items-start">
                  <img
                    src="https://readymadeui.com/team-2.webp"
                    className="w-12 h-12 rounded-full border-2 border-white"
                  />
                  <div className="ml-3">
                    <h4 className="text-sm font-bold text-gray-800">
                      John Doe
                    </h4>
                    <div className="flex space-x-1 mt-1">
                      <Rating
                        name="half-rating-read"
                        defaultValue={3}
                        precision={0.5}
                        readOnly
                      />
                      <p className="text-xs !ml-2 font-semibold text-gray-800">
                        2 mins ago
                      </p>
                    </div>
                    <p className="text-sm mt-4 text-gray-800">
                      Lorem ipsum dolor sit amet, consectetur adipisci elit, sed
                      eiusmod tempor incidunt ut labore et dolore magna aliqua.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-full mt-10 px-4 py-2.5 bg-transparent hover:bg-gray-50 border border-blue-600 text-gray-800 font-bold rounded"
                >
                  Read all reviews
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
