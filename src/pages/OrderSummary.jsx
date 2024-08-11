// import React, { useEffect, useState } from "react";
// import OrderTracking from "../components/orderTacking/OrderTracking";
// import { useSelector } from "react-redux";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// export const OrderSummary = () => {
//   const { id } = useParams();
//   const [lodding, setLodding] = useState(false);
//   const [orderDetails, setOrderDetails] = useState([]);
//   const [orderProducts , setOrderProducts] = useState([])
//   const { products } = useSelector((state) => state.products);

//   const fetchOrderDetails = async () => {
//     setLodding(true);
//     try {
//       const response = await axios.get(
//         `https://fashionoasis-backend.onrender.com/api/v1/order-summary/${id}`,
//         {
//           withCredentials: true,
//         }
//       );
//       console.log("response : ", response.data.order);
//       if (response.data.success) {
//         setOrderDetails(response.data.order);
//         handleProducts()
//         setLodding(false);
//       } else {
//         console.log("error : ", response.data.error);
//         setLodding(false);
//       }
//     } catch (error) {
//       console.log("error : ", error);
//       setLodding(false);
//     }
//   };

//   const handleProducts = () => {
//     setOrderProducts(orderDetails.products)
//   }

//   useEffect(() => {
//     fetchOrderDetails();
//   }, [id]);

//   console.log(orderDetails);
//   console.log(orderProducts)

//   // https://fashionoasis-backend.onrender.com/api/v1/order-summary/66a9e37d8fedca6519bd82fa
//   return (
//     <>
//       {lodding ? (
//         "Loadding"
//       ) : (
//         <section className="py-24 relative">
//           <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
//             <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
//               Payment Successful
//             </h2>
//             <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
//               Thanks for making a purchase you can check our order summary frm
//               below
//             </p>
//             <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full">
//               <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200">
//                 <div className="data">
//                   <p className="font-semibold text-base leading-7 text-black">
//                     Order Id:
//                     <span className="text-indigo-600 font-medium">
//                       #{orderDetails.orderId}
//                     </span>
//                   </p>
//                   <p className="font-semibold text-base leading-7 text-black mt-4">
//                     Order Payment :
//                     <span className="text-gray-400 font-medium">
//                       18th march 2021
//                     </span>
//                   </p>
//                 </div>
//                 <div className="w-full lg:w-[70%] mt-5 lg:mt-0">
//                   <OrderTracking orderStatus={orderDetails.orderStatus} />
//                 </div>
//               </div>
//               <div className="w-full px-3 min-[400px]:px-6">
//                 {orderDetails && orderDetails.products.map((item) => (
//                   <div className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full">
//                     <div className="img-box max-lg:w-full">
//                       <img
//                         src="https://pagedone.io/asset/uploads/1701167607.png"
//                         alt="Premium Watch image"
//                         className="aspect-square w-full lg:max-w-[140px] rounded-xl"
//                       />
//                     </div>
//                     <div className="flex flex-row items-center w-full ">
//                       <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
//                         <div className="flex items-center">
//                           <div className>
//                             <h2 className="font-semibold text-xl leading-8 text-black mb-3">
//                               Premium Quality Dust Watch
//                             </h2>
//                             <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
//                               By: Dust Studios
//                             </p>
//                             <div className="flex items-center ">
//                               <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
//                                 Size:
//                                 <span className="text-gray-500">100 ml</span>
//                               </p>
//                               <p className="font-medium text-base leading-7 text-black ">
//                                 Qty: <span className="text-gray-500">2</span>
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="grid grid-cols-5">
//                           <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
//                             <div className="flex gap-3 lg:block">
//                               <p className="font-medium text-sm leading-7 text-black">
//                                 price
//                               </p>
//                               <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
//                                 $100
//                               </p>
//                             </div>
//                           </div>
//                           <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
//                             <div className="flex gap-3 lg:block">
//                               <p className="font-medium text-sm leading-7 text-black">
//                                 Status
//                               </p>
//                               <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
//                                 Ready for Delivery
//                               </p>
//                             </div>
//                           </div>
//                           <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
//                             <div className="flex gap-3 lg:block">
//                               <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
//                                 Expected Delivery Time
//                               </p>
//                               <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
//                                 23rd March 2021
//                               </p>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//               <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
//                 <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
//                   <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
//                     <svg
//                       className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
//                       xmlns="http://www.w3.org/2000/svg"
//                       width={22}
//                       height={22}
//                       viewBox="0 0 22 22"
//                       fill="none"
//                     >
//                       <path
//                         d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
//                         stroke
//                         strokeWidth="1.6"
//                         strokeLinecap="round"
//                       />
//                     </svg>
//                     Cancel Order
//                   </button>
//                   <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
//                     Paid using Credit Card
//                     <span className="text-gray-500">ending with 8822</span>
//                   </p>
//                 </div>
//                 <p className="font-semibold text-lg text-black py-6">
//                   Total Price: <span className="text-indigo-600"> $200.00</span>
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       )}
//     </>
//   );
// };

import React, { useEffect, useState } from "react";
import OrderTracking from "../components/orderTacking/OrderTracking";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

export const OrderSummary = () => {
  const { id } = useParams();
  const [lodding, setLodding] = useState(false);
  const [orderDetails, setOrderDetails] = useState({});
  const { products } = useSelector((state) => state.products);

  const fetchOrderDetails = async () => {
    setLodding(true);
    try {
      const response = await axios.get(
        `https://fashionoasis-backend.onrender.com/api/v1/order-summary/${id}`,
        {
          withCredentials: true,
        }
      );
      console.log("response : ", response.data.order);
      if (response.data.success) {
        setOrderDetails(response.data.order);
      } else {
        console.log("error : ", response.data.error);
      }
    } catch (error) {
      console.log("error : ", error);
    } finally {
      setLodding(false);
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, [id]);

  console.log(orderDetails);

  return (
    <>
      {lodding ? (
        "Loading..."
      ) : (
        <section className="py-24 relative">
          <div className="w-full max-w-7xl px-4 md:px-5 lg-6 mx-auto">
            <h2 className="font-manrope font-bold text-4xl leading-10 text-black text-center">
              Payment Successful
            </h2>
            <p className="mt-4 font-normal text-lg leading-8 text-gray-500 mb-11 text-center">
              Thanks for making a purchase you can check our order summary from
              below
            </p>
            <div className="main-box border border-gray-200 rounded-xl pt-6 max-w-xl max-lg:mx-auto lg:max-w-full shadow-xl">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between px-6 pb-6 border-b border-gray-200 shadow-xl">
                <div className="data">
                  <p className="font-semibold text-base leading-7 text-black">
                    Order Id:
                    <span className="text-indigo-600 font-medium">
                      #{orderDetails.orderId}
                    </span>
                  </p>
                  <p className="font-semibold text-base leading-7 text-black mt-4">
                    Order Payment :
                    <span className="text-gray-400 font-medium">
                      18th March 2021
                    </span>
                  </p>
                </div>
                <div className="w-full lg:w-[70%] mt-5 lg:mt-0">
                  <OrderTracking orderStatus={orderDetails.orderStatus} />
                </div>
              </div>
              <div className="w-full px-3 min-[400px]:px-6">
                {orderDetails.products &&
                  orderDetails.products.map((item) => {
                    let product = products.find(
                      (product) => product._id === item.product
                    ); // Find the corresponding product
                    if (!product) {
                      return null;
                    }
                    return (
                      <div
                        key={item._id}
                        className="flex flex-col lg:flex-row items-center py-6 border-b border-gray-200 gap-6 w-full"
                      >
                        <div className="img-box max-lg:w-full">
                          <img
                            src={product.imageUrls[0]}
                            alt="Product image"
                            className="aspect-square w-full lg:max-w-[140px] rounded-xl"
                          />
                        </div>
                        <div className="flex flex-row items-center w-full ">
                          <div className="grid grid-cols-1 lg:grid-cols-2 w-full">
                            <div className="flex items-center">
                              <div>
                                <h2 className="font-semibold text-xl leading-8 text-black mb-3">
                                  {product.name}
                                </h2>
                                <p className="font-normal text-lg leading-8 text-gray-500 mb-3 ">
                                  By: {product.brand}
                                </p>
                                <div className="flex items-center ">
                                  <p className="font-medium text-base leading-7 text-black pr-4 mr-4 border-r border-gray-200">
                                    Size:
                                    <span className="text-gray-500">
                                      {item.size}
                                    </span>
                                  </p>
                                  <p className="font-medium text-base leading-7 text-black ">
                                    Qty:
                                    <span className="text-gray-500">
                                      {item.quantity}
                                    </span>
                                  </p>
                                </div>
                              </div>
                            </div>
                            <div className="grid grid-cols-5">
                              <div className="col-span-5 lg:col-span-1 flex items-center max-lg:mt-3">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    Price
                                  </p>
                                  <p className="lg:mt-4 font-medium text-sm leading-7 text-indigo-600">
                                    {product.offerPrice.toFixed(2)}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3 ">
                                <div className="flex gap-3 lg:block">
                                  <p className="font-medium text-sm leading-7 text-black">
                                    Status
                                  </p>
                                  <p className="font-medium text-sm leading-6 whitespace-nowrap py-0.5 px-3 rounded-full lg:mt-3 bg-emerald-50 text-emerald-600">
                                    {orderDetails.orderStatus}
                                  </p>
                                </div>
                              </div>
                              <div className="col-span-5 lg:col-span-2 flex items-center max-lg:mt-3">
                                {orderDetails.orderStatus !== "delivered" ? (
                                  <div className="flex gap-3 lg:block">
                                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                      Expected Delivery Time
                                    </p>
                                    <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                      23rd March 2021
                                    </p>
                                  </div>
                                ) : (
                                  <div className="flex gap-3 lg:block">
                                    <p className="font-medium text-sm whitespace-nowrap leading-6 text-black">
                                      Delivered Time
                                    </p>
                                    <p className="font-medium text-base whitespace-nowrap leading-7 lg:mt-3 text-emerald-500">
                                      23rd March 2021
                                    </p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="w-full border-t border-gray-200 px-6 flex flex-col lg:flex-row items-center justify-between ">
                <div className="flex flex-col sm:flex-row items-center max-lg:border-b border-gray-200">
                  {orderDetails.orderStatus !== "delivered" ? (
                    <button className="flex outline-0 py-6 sm:pr-6  sm:border-r border-gray-200 whitespace-nowrap gap-2 items-center justify-center font-semibold group text-lg text-black bg-white transition-all duration-500 hover:text-indigo-600">
                      <svg
                        className="stroke-black transition-all duration-500 group-hover:stroke-indigo-600"
                        xmlns="http://www.w3.org/2000/svg"
                        width={22}
                        height={22}
                        viewBox="0 0 22 22"
                        fill="none"
                      >
                        <path
                          d="M5.5 5.5L16.5 16.5M16.5 5.5L5.5 16.5"
                          stroke
                          strokeWidth="1.6"
                          strokeLinecap="round"
                        />
                      </svg>
                      Cancel Order
                    </button>
                  ) : (
                    ""
                  )}
                  <p className="font-medium text-lg text-gray-900 pl-6 py-3 max-lg:text-center">
                    Paid using {orderDetails.paymentMethod}
                    <span className="text-gray-500"> ending with 8822</span>
                  </p>
                </div>
                <p className="font-semibold text-lg text-black py-6">
                  Total Price:
                  <span className="text-indigo-600">
                    $
                    {orderDetails.totalAmount &&
                      orderDetails.totalAmount.toFixed(2)}
                  </span>
                </p>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};
