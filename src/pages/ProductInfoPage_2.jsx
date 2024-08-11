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
import AddReview from "../components/review/ReviewForm";
import ProductReviews from "../components/review/ReviewDisplay";
import ReviewSection from "../components/review/ReviewDisplay";

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
          `https://fashionoasis-backend.onrender.com/api/v1/product/${id}`
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
          <h3 className="text-xl font-bold text-gray-800">Add your Review</h3>
            <AddReview productId = {id} />
          </div>
          <div>
            <ReviewSection productId = {id}/>
          </div>
        </div>
      )}
    </>
  );
};




// export const ProductInfoPage_2 = () => {
//   const [product, setProduct] = useState("");
//   const { id } = useParams();
//   const [loading, setLoading] = useState(false);
//   const [refreshReviews, setRefreshReviews] = useState(false); // State for refreshing reviews
//   const [prevImg, setPrevImg] = useState(null);
//   const [sizeSelected, setSizeSelected] = useState(null);

//   const dispatch = useDispatch();

//   const size = sizeSelected && sizeSelected.size;

//   const handleAddToCart = (productId, quantity) => {
//     dispatch(addToCart({ productId, quantity, size }));
//   };

//   useEffect(() => {
//     const fetchProductDetails = async () => {
//       setLoading(true);
//       try {
//         const res = await axios.get(
//           `https://fashionoasis-backend.onrender.com/api/v1/product/${id}`
//         );
//         if (res) {
//           setProduct(res.data.product);
//         }
//       } catch (error) {
//         console.error(error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProductDetails();
//   }, [id]);

//   // Function to trigger a refresh of the reviews
//   const refreshReviewsHandler = () => {
//     setRefreshReviews(!refreshReviews);
//   };

//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!product) {
//     return <div>Product not found</div>;
//   }

//   const { imageUrls, description, offerPrice, price, brand, sizes, _id, name } =
//     product;

//   return (
//     <>
//       <div className="mt-[50px]">
//         <div className="font-sans">
//           <div className="p-4 lg:max-w-5xl max-w-lg mx-auto">
//             <div className="grid items-start grid-cols-1 lg:grid-cols-2 gap-6 max-lg:gap-12">
//               <div className="w-full sm:flex gap-2 shadow-xl rounded-md p-3 ">
//                 <div className="sm:space-y-3 w-16 max-sm:w-12 max-sm:flex max-sm:mb-4 max-sm:gap-4 ">
//                   {imageUrls.length > 0
//                     ? imageUrls.map((img) => (
//                         <img
//                           src={img}
//                           alt="Product1"
//                           className="w-full cursor-pointer rounded-md outline"
//                           onMouseOver={() => setPrevImg(img)}
//                         />
//                       ))
//                     : ""}
//                 </div>
//                 <img
//                   src={
//                     imageUrls.length > 0 && prevImg === null
//                       ? imageUrls[0]
//                       : prevImg
//                   }
//                   alt="Product"
//                   className="w-4/5 rounded-md object-cover"
//                 />
//               </div>
//               <div className="ml-2">
//                 <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
//                 <div className="flex flex-wrap gap-4 mt-4">
//                   <p className="text-gray-800 text-xl font-bold">
//                     ${offerPrice.toFixed(2)}
//                   </p>
//                   <p className="text-gray-400 text-xl">
//                     <strike>${price}</strike>
//                     <span className="text-sm ml-1.5">Tax included</span>
//                   </p>
//                 </div>
//                 <div className="flex space-x-2 mt-4">
//                   <Rating
//                     name="half-rating-read"
//                     defaultValue={4.5}
//                     precision={0.5}
//                     readOnly
//                   />
//                   <h4 className="text-gray-800 text-base">500 Reviews</h4>
//                 </div>
//                 <form action="">
//                   <div className="mt-8">
//                     <h3 className="text-xl font-bold text-gray-800">Sizes</h3>
//                     <div className="flex flex-wrap gap-4 mt-2">
//                       {sizes.map((size) => (
//                         <label className="filter-label flex items-center gap-3">
//                           <input
//                             type="radio"
//                             name="category"
//                             value=""
//                             id=""
//                             className="filter-radio-select"
//                             required
//                             onChange={() => setSizeSelected(size)}
//                           />
//                           <div className="sizeSelect uppercase font-bold rounded-md">
//                             {size.size}
//                           </div>
//                         </label>
//                       ))}
//                     </div>
//                     {sizeSelected
//                       ? sizeSelected.quantity <= 0 && (
//                           <p className="mt-3 text-red-600">Out of Stock</p>
//                         )
//                       : ""}
//                     {sizeSelected
//                       ? sizeSelected.quantity === 1 && (
//                           <p className="mt-3 text-yellow-500">
//                             Only 1 left, Hurry Up
//                           </p>
//                         )
//                       : ""}
//                   </div>
//                   <button
//                     type="button"
//                     className="w-full mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-md disabled:opacity-60"
//                     disabled={
//                       sizeSelected === null || sizeSelected.quantity === 0
//                     }
//                     onClick={() => handleAddToCart(_id, 1)}
//                   >
//                     Add to cart
//                   </button>
//                 </form>
//                 <div className="mt-8">
//                   <h3 className="text-xl font-bold text-gray-800">
//                     About the item
//                   </h3>
//                   <p className="text-md text-gray-800 mt-4">
//                     {product.description}
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         <div className="mt-16 shadow-[0_2px_10px_-3px_rgba(6,81,237,0.3)] rounded-md p-6 mx-[60px] mb-10">
//           <h3 className="text-xl font-bold text-gray-800">Add your Review</h3>
//           <AddReview productId={id} onReviewSubmit={refreshReviewsHandler} />
//         </div>
//         <div>
//           <ReviewSection productId={id} refreshReviews={refreshReviews} />
//         </div>
//       </div>
//     </>
//   );
// };
