import { Trash } from "lucide-react";
import {
  fetchCart,
  addToCart,
  removeFromCart,
  updateCart,
  clearCart,
} from "../redux/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";

export const CartPage = () => {
  // const [, set] = useState(second)
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { items, status, error } = useSelector((state) => state.cart);

let totalPrice = 0
let totalQuantity = 0
let totalOgPrice = 0
//   const [totalPrice, setTotalPrice] = useState(0)

  // const handleAddToCart = (productId, quantity) => {
  //   dispatch(addToCart({ productId, quantity }));
  // };

  const handleUpdateCart = (productId, quantity) => {
    dispatch(updateCart({ productId, quantity }));
  };

  const handleRemoveFromCart = (productId) => {
    dispatch(removeFromCart(productId));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  //   if (status === "loading") return <p>Loading...</p>;
  if (status === "failed") return <p>{error}</p>;

  return (
    <>
      <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
        <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Shopping Cart
          </h1>
          <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
            <section
              aria-labelledby="cart-heading"
              className="rounded-lg bg-white lg:col-span-8"
            >
              <h2 id="cart-heading" className="sr-only">
                Items in your shopping cart
              </h2>
              <ul role="list" className="divide-y divide-gray-200">
                {items.map((item) => {
                  let product = products.find(
                    (product) => product._id === item.product
                  ); // Find the corresponding product
                  if (!product) {
                    return null;
                  }
                  totalQuantity = totalQuantity + item.quantity
                  totalPrice = totalPrice + product.offerPrice * item.quantity
                  totalOgPrice = totalOgPrice + product.price * item.quantity
                  return (
                    <div key={Math.random()} className="">
                      <li className="flex py-6 sm:py-6 ">
                        <div className="flex-shrink-0">
                          <img
                            src={product.imageUrls[0]}
                            alt={product.name}
                            className="sm:h-38 sm:w-38 h-24 w-24 rounded-md object-contain object-center"
                          />
                        </div>

                        <div className="ml-4 flex flex-1 flex-col justify-between sm:ml-6">
                          <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
                            <div>
                              <div className="flex justify-between">
                                <h3 className="text-sm">
                                  <Link
                                    to={`/product/${product._id}`}
                                    className="font-semibold text-black"
                                  >
                                    {product.name}
                                  </Link>
                                </h3>
                              </div>
                              <div className="mt-1 flex text-sm">
                                <p className="text-sm uppercase text-gray-500">
                                  {product.color}
                                </p>
                                {item.size ? (
                                  <p className="ml-4 uppercase border-l border-gray-200 pl-4 text-sm text-gray-500">
                                    {item.size}
                                  </p>
                                ) : null}
                              </div>
                              <div className="mt-1 flex items-end">
                                <p className="text-xs font-medium text-gray-500 line-through">
                                  {product.price}
                                </p>
                                <p className="text-sm font-medium text-gray-900">
                                  &nbsp;&nbsp;{product.offerPrice.toFixed(2)}
                                </p>
                                &nbsp;&nbsp;
                                <p className="text-sm font-medium text-green-500">
                                  {product.offer.value}%
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                      <div className="mb-2 flex">
                        <div className="min-w-24 flex">
                          <button
                            type="button"
                            className="h-7 w-7"
                            onClick={() => handleUpdateCart(product._id, -1)}
                          >
                            -
                          </button>
                          <input
                            type="text"
                            className="mx-1 h-7 w-9 rounded-md border text-center"
                            value={item.quantity}
                            readOnly
                          />
                          <button
                            type="button"
                            className="flex h-7 w-7 items-center justify-center"
                            onClick={() => handleUpdateCart(product._id, 1)}
                          >
                            +
                          </button>
                        </div>
                        <div className="ml-6 flex text-sm">
                          <button
                            type="button"
                            className="flex items-center space-x-1 px-2 py-1 pl-0"
                            onClick={() => handleRemoveFromCart(product._id)}
                          >
                            <Trash size={12} className="text-red-500" />
                            <span className="text-xs font-medium text-red-500">
                              Remove
                            </span>
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </ul>
            </section>
            {/* Order summary */}
            <section
              aria-labelledby="summary-heading"
              className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
            >
              <h2
                id="summary-heading"
                className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
              >
                Price Details
              </h2>
              <div>
                <dl className=" space-y-1 px-2 py-4">
                  <div className="flex items-center justify-between">
                    <dt className="text-sm text-gray-800">
                      Price ({totalQuantity} item)
                    </dt>
                    <dd className="text-sm font-medium text-gray-900">
                      ₹ {totalPrice.toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between pt-4">
                    <dt className="flex items-center text-sm text-gray-800">
                      <span>Discount</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">
                      - ₹ {(totalOgPrice-totalPrice).toFixed(2)}
                    </dd>
                  </div>
                  <div className="flex items-center justify-between py-4">
                    <dt className="flex text-sm text-gray-800">
                      <span>Delivery Charges</span>
                    </dt>
                    <dd className="text-sm font-medium text-green-700">Free</dd>
                  </div>
                  <div className="flex items-center justify-between border-y border-dashed py-4 ">
                    <dt className="text-base font-medium text-gray-900">
                      Total Amount
                    </dt>
                    <dd className="text-base font-medium text-gray-900">
                      {totalPrice.toFixed(2)}
                    </dd>
                  </div>
                </dl>
                <div className="px-2 pb-4 font-medium text-green-700">
                  <div className="flex gap-4 mb-6">
                    <button className="w-full px-4 py-3 text-center text-white bg-green-600 border border-transparent dark:border-green-500 hover:border-green-900 hover:text-green-700 hover:bg-green-100 rounded-xl">
                      Buy now
                    </button>
                  </div>
                </div>
              </div>
            </section>
          </form>
        </div>
      </div>
    </>
  );
};

// import { Trash } from "lucide-react";
// import {
//   fetchCart,
//   addToCart,
//   removeFromCart,
//   updateCart,
//   clearCart,
// } from "../redux/cartSlice";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// export const CartPage = () => {
//   const dispatch = useDispatch();
//   const { products } = useSelector((state) => state.products); // Access the products state
//   const { items, totalQuantity, totalPrice, status, error } = useSelector(
//     (state) => state.cart
//   );

//   useEffect(() => {
//     dispatch(fetchCart());
//   }, [dispatch]);

//   const handleUpdateCart = (productId, quantity) => {
//     dispatch(updateCart({ productId, quantity }));
//   };

//   const handleRemoveFromCart = (productId) => {
//     dispatch(removeFromCart(productId));
//   };

//   const handleClearCart = () => {
//     dispatch(clearCart());
//   };

//   if (status === "loading") return <p>Loading...</p>;
//   if (status === "failed") return <p>{error}</p>;

//   console.log(items)

//   return (
//     <>
//       <div className="container mx-auto px-4 max-w-7xl px-2 lg:px-0">
//         <div className="mx-auto max-w-2xl py-8 lg:max-w-7xl">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
//             Shopping Cart
//           </h1>
//           <form className="mt-12 lg:grid lg:grid-cols-12 lg:items-start lg:gap-x-12 xl:gap-x-16">
//             <section
//               aria-labelledby="cart-heading"
//               className="rounded-lg bg-white lg:col-span-8"
//             >
//               <h2 id="cart-heading" className="sr-only">
//                 Items in your shopping cart
//               </h2>
//               <ul role="list" className="divide-y divide-gray-200">

//               </ul>
//             </section>
//             {/* Order summary */}
//             <section
//               aria-labelledby="summary-heading"
//               className="mt-16 rounded-md bg-white lg:col-span-4 lg:mt-0 lg:p-0"
//             >
//               <h2
//                 id="summary-heading"
//                 className=" border-b border-gray-200 px-4 py-3 text-lg font-medium text-gray-900 sm:p-4"
//               >
//                 Price Details
//               </h2>
//               <div>
//                 <dl className=" space-y-1 px-2 py-4">
//                   <div className="flex items-center justify-between">
//                     <dt className="text-sm text-gray-800">
//                       Price ({totalQuantity} items)
//                     </dt>
//                     <dd className="text-sm font-medium text-gray-900">
//                       ₹ {totalPrice}
//                     </dd>
//                   </div>
//                   <div className="flex items-center justify-between pt-4">
//                     <dt className="flex items-center text-sm text-gray-800">
//                       <span>Discount</span>
//                     </dt>
//                     <dd className="text-sm font-medium text-green-700">
//                       - ₹ 3,431
//                     </dd>
//                   </div>
//                   <div className="flex items-center justify-between py-4">
//                     <dt className="flex text-sm text-gray-800">
//                       <span>Delivery Charges</span>
//                     </dt>
//                     <dd className="text-sm font-medium text-green-700">Free</dd>
//                   </div>
//                   <div className="flex items-center justify-between border-y border-dashed py-4 ">
//                     <dt className="text-base font-medium text-gray-900">
//                       Total Amount
//                     </dt>
//                     <dd className="text-base font-medium text-gray-900">
//                       ₹ {totalPrice}
//                     </dd>
//                   </div>
//                 </dl>
//                 <div className="px-2 pb-4 font-medium text-green-700">
//                   <div className="flex gap-4 mb-6">
//                     <button className="w-full px-4 py-3 text-center text-white bg-green-600 border border-transparent dark:border-green-500 hover:border-green-900 hover:text-green-700 hover:bg-green-100 rounded-xl">
//                       Buy now
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             </section>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// };
