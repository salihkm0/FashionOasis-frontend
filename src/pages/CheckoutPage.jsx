// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

// export const CheckoutPage = () => {
//   const navigate = useNavigate();
//   const [lodding, setLodding] = useState(false);
//   const { user } = useSelector((state) => state.auth);

//   const { products } = useSelector((state) => state.products);
//   const { items } = useSelector((state) => state.cart);

//   let totalQuantity = 0;
//   let totalPrice = 0;
//   let totalOgPrice = 0;
//   let totalDiscount = totalOgPrice - totalPrice;
//   let checkoutPrice = 0;
//   let totalTax = 0;

//   const [delivery, setDelivery] = useState({
//     type: "free",
//     charge: 0,
//   });

//   const handleDeliveryCharge = (e) => {
//     setDelivery({
//       ...delivery,
//       type: e.target.value,
//       charge: e.target.value === "fast" ? 10 : 0,
//     });
//   };

//   const paymentHandler = async (e) => {
//     setLodding(true);
//     try {
//       const response = await axios.post(
//         "http://localhost:5555/api/v1/payment",
//         { amount: Math.floor(checkoutPrice) },
//         {
//           withCredentials: true,
//         }
//       );

//       const order = response.data.data;

//       const key = import.meta.env.VITE_SOME_KEY;
//       console.log("Razorpay Key:", key); // Log the key to check if it's defined

//       const options = {
//         key,
//         amount: order.amount,
//         currency: order.currency,
//         name: "Test",
//         description: "Test Payment",
//         order_id: order.id,
//         handler: async (response) => {
//           try {
//             const body = {
//               razorpay_order_id: response.razorpay_order_id,
//               razorpay_payment_id: response.razorpay_payment_id,
//               razorpay_signature: response.razorpay_signature,
//               totalPrice: totalPrice,
//               totalQuantity: totalQuantity,
//               totalDiscount: totalDiscount,
//               totalTax: totalTax,
//               shippingAddress: "66a36fc31b88fc74ed029534",
//               paymentMethod: "razorpay",
//               shippingMethod: delivery.type,
//               userFrontend: user,
//             };
//             const validateResponse = await axios.post(
//               "http://localhost:5555/api/v1/payment/verify",
//               body,
//               {
//                 withCredentials: true,
//               }
//             );
//             console.log("Payment verified. Response:", validateResponse);
//             navigate("/user/my-orders");
//             setLodding(false);
//           } catch (error) {
//             console.error("Payment verification failed. Error:", error);
//             setLodding(false);
//           }
//         },
//         prefill: {
//           name: "Salih",
//           email: "salih@gmail.com",
//         },
//         notes: {
//           address: "some address",
//         },
//         theme: {
//           color: "#3399cc",
//         },
//       };

//       const rzp1 = new window.Razorpay(options);
//       setLodding(false);
//       rzp1.on("payment.failed", (response) => {
//         alert(response.error.code);
//         setLodding(false);
//       });

//       rzp1.open();
//     } catch (error) {
//       console.error("Payment handler failed. Error:", error);
//       setLodding(false);
//     }
//     setLodding(false);
//     e.preventDefault();
//   };

//   console.log(delivery.type, delivery.charge);
//   return (
//     <>
//       <div>
//         <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
//           <div className="px-4 pt-8">
//             <p className="text-xl font-medium">Order Summary</p>
//             <p className="text-gray-400">
//               Check your items. And select a suitable shipping method.
//             </p>
//             <div className="mt-8 mb-5 space-y-3 rounded-lg shadow-lg border bg-white px-2 py-4 sm:px-6">
//               {items.map((item) => {
//                 let product = products.find(
//                   (product) => product._id === item.product
//                 );
//                 if (!product) {
//                   return null;
//                 }
//                 totalQuantity = totalQuantity + item.quantity;
//                 totalPrice = totalPrice + product.offerPrice * item.quantity;
//                 totalOgPrice = totalOgPrice + product.price * item.quantity;
//                 return (
//                   <div
//                     key={Math.random()}
//                     className="flex flex-col rounded-lg bg-white sm:flex-row border shadow-xl"
//                   >
//                     <img
//                       className="m-2 h-24 w-28 rounded-md border object-cover object-center"
//                       src={product.imageUrls[0]}
//                       alt
//                     />
//                     <div className="flex w-full flex-col px-4 py-4">
//                       <span className="font-semibold">
//                         {product.name} x {item.quantity}
//                       </span>
//                       <span className="float-right text-gray-400 uppercase">
//                         {product.color} - {item.size}
//                       </span>
//                       <p className="text-lg font-bold">
//                         {(product.offerPrice * item.quantity).toFixed(2)}
//                       </p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//             <div className="mb-6 pb-6 border-b border-gray-200">
//               <div className="-mx-2 flex items-end justify-end">
//                 <div className="flex-grow px-2 lg:max-w-xs">
//                   <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
//                     Discount code
//                   </label>
//                   <div>
//                     <input
//                       className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
//                       placeholder="XXXXXX"
//                       type="text"
//                     />
//                   </div>
//                 </div>
//                 <div className="px-2">
//                   <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
//                     APPLY
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="mt-5 bg-gray-50 px-4 pt-8 lg:mt-0">
//             <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
//               <div className="w-full flex mb-3 items-center">
//                 <div className="w-32">
//                   <span className="text-gray-600 font-semibold">Contact</span>
//                 </div>
//                 <div className="flex-grow pl-3">
//                   <span>Scott Windon</span>
//                 </div>
//               </div>
//               <div className="w-full flex items-center">
//                 <div className="w-32">
//                   <span className="text-gray-600 font-semibold">
//                     Billing Address
//                   </span>
//                 </div>
//                 <div className="flex-grow pl-3">
//                   <span>123 George Street, Sydney, NSW 2000 Australia</span>
//                 </div>
//               </div>
//             </div>
//             <p className="text-xl font-medium">Shipping Methods</p>
//             <form className="mt-5 grid gap-6">
//               <div className="relativ">
//                 <input
//                   className="peer hidden"
//                   id="radio_1"
//                   type="radio"
//                   name="radio"
//                   value={"free"}
//                   defaultChecked
//                   onChange={handleDeliveryCharge}
//                 />
//                 <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
//                 <label
//                   className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 shadow-xl"
//                   htmlFor="radio_1"
//                 >
//                   <img
//                     className="w-14 object-contain"
//                     src="https://png.pngtree.com/png-clipart/20230120/ourmid/pngtree-free-delivery-truck-icon-png-image_6565580.png"
//                     alt
//                   />
//                   <div className="ml-5">
//                     <span className="mt-2 font-semibold">Free Delivery</span>
//                     <p className="text-slate-500 text-sm leading-6">
//                       Delivery: 5-7 Days
//                     </p>
//                   </div>
//                 </label>
//               </div>
//               <div className="relative ">
//                 <input
//                   className="peer hidden"
//                   id="radio_2"
//                   type="radio"
//                   name="radio"
//                   value={"fast"}
//                   onChange={handleDeliveryCharge}
//                 />
//                 <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white " />
//                 <label
//                   className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4 shadow-xl"
//                   htmlFor="radio_2"
//                 >
//                   <img
//                     className="w-14 object-contain"
//                     src="https://t3.ftcdn.net/jpg/04/73/02/64/360_F_473026422_k3XjtqTh0Br3Iw8IfhlB9c72n9dqi9n5.jpg"
//                     alt
//                   />
//                   <div className="ml-5">
//                     <span className="mt-2 font-semibold">Fast Delivery</span>
//                     <p className="text-slate-500 text-sm leading-6">
//                       Delivery: 2-4 Days
//                     </p>
//                   </div>
//                 </label>
//               </div>
//             </form>

//             <div className>
//               <div className="mt-6 border-t border-b py-2">
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-gray-900">Subtotal</p>
//                   <p className="font-semibold text-gray-900">
//                     {totalPrice.toFixed(2)}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-gray-900">Shipping</p>
//                   <p className="font-semibold text-gray-900">
//                     {delivery.charge}
//                   </p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-gray-900">
//                     Discount Coupon
//                   </p>
//                   <p className="font-semibold text-gray-900">0</p>
//                 </div>
//                 <div className="flex items-center justify-between">
//                   <p className="text-sm font-medium text-gray-900">
//                     Total Discount
//                   </p>
//                   <p className="font-semibold text-green-600">
//                     {totalDiscount.toFixed(2)}
//                   </p>
//                 </div>
//               </div>
//               <div className="mt-6 flex items-center justify-between">
//                 <p className="text-sm font-medium text-gray-900">Total</p>
//                 <p className="text-2xl font-semibold text-gray-900">
//                   {(checkoutPrice = totalPrice + delivery.charge).toFixed(2)}
//                 </p>
//               </div>
//             </div>

//             <button
//               className="mt-4 mb-8 w-full rounded-md bg-green-500 hover:bg-green-700 px-6 py-3 font-medium text-white"
//               onClick={paymentHandler}
//             >
//               {lodding ? "Placing Order..." : "Place Order"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchCart } from "../redux/cartSlice";
import toast from "react-hot-toast";

export const CheckoutPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state) => state.auth);
  const { products } = useSelector((state) => state.products);
  const { items } = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const [couponCode, setCouponCode] = useState("");
  const [discountAmount, setDiscountAmount] = useState(0);
  const [appliedCoupon, setAppliedCoupon] = useState(false);
  // const [totalPrice, setTotalPrice] = useState(0);
  

  let totalQuantity = 0;
  let totalPrice = 0;
  let totalOgPrice = 0;
  let totalDiscount = totalOgPrice - totalPrice;
  let checkoutPrice = 0;
  let totalTax = 0;


  const [delivery, setDelivery] = useState({
    type: "free",
    charge: 0,
  });
  // const [checkoutPrice, setCheckoutPrice] = useState(
  //   totalPrice + delivery.charge
  // );

  const handleDeliveryCharge = (e) => {
    setDelivery({
      ...delivery,
      type: e.target.value,
      charge: e.target.value === "fast" ? 10 : 0,
    });
  };

  // Apply coupon handler
  const handleApplyCoupon = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/apply-coupon",
        {
          code: couponCode,
          cartTotal: checkoutPrice,
        },
        {
          withCredentials: true,
        }
      );
      const { discountAmount, newTotal } = response.data;
      setDiscountAmount(discountAmount);
      setAppliedCoupon(true);
      // Update the total price
      setCheckoutPrice(newTotal);
    } catch (error) {
      console.error("Error applying coupon:", error);
    }
  };

  // Clear coupon handler
  const handleClearCoupon = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/clear-coupon",{
          code: couponCode,
        },
        {
          withCredentials: true,
        }
      );
      setDiscountAmount(0);
      setAppliedCoupon(false);
    } catch (error) {
      console.error("Error clearing coupon:", error);
    }
  };

  const paymentHandler = async (e) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5555/api/v1/payment",
        { amount: Math.floor(checkoutPrice) },
        {
          withCredentials: true,
        }
      );

      const order = response.data.data;

      const key = import.meta.env.VITE_SOME_KEY;

      const options = {
        key,
        amount: order.amount,
        currency: order.currency,
        name: "Test",
        description: "Test Payment",
        order_id: order.id,
        handler: async (response) => {
          try {
            const body = {
              razorpay_order_id: response.razorpay_order_id,
              razorpay_payment_id: response.razorpay_payment_id,
              razorpay_signature: response.razorpay_signature,
              totalPrice: totalPrice,
              totalQuantity: totalQuantity,
              totalDiscount: totalDiscount,
              totalTax: totalTax,
              shippingAddress: "66a36fc31b88fc74ed029534",
              paymentMethod: "razorpay",
              shippingMethod: delivery.type,
              userFrontend: user,
              appliedCoupon :appliedCoupon,
              code : couponCode
            };
            const validateResponse = await axios.post(
              "http://localhost:5555/api/v1/payment/verify",
              body,
              {
                withCredentials: true,
              }
            );
            if(!validateResponse){
              toast.error("Some Err")
            }
            navigate("/user/my-orders");
            setLoading(false);
          } catch (error) {
            setLoading(false);
          }
        },
        prefill: {
          name: "Salih",
          email: "salih@gmail.com",
        },
        notes: {
          address: "some address",
        },
        theme: {
          color: "#3399cc",
        },
      };

      const rzp1 = new window.Razorpay(options);
      setLoading(false);
      rzp1.on("payment.failed", (response) => {
        alert(response.error.code);
        setLoading(false);
      });

      rzp1.open();
    } catch (error) {
      setLoading(false);
    }
    setLoading(false);
    e.preventDefault();
  };

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  return (
    <>
      <div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 mb-5 space-y-3 rounded-lg shadow-lg border bg-white px-2 py-4 sm:px-6">
              {items.map((item) => {
                let product = products.find(
                  (product) => product._id === item.product
                );
                if (!product) {
                  return null;
                }
                totalQuantity = totalQuantity + item.quantity;
                totalPrice = totalPrice + product.offerPrice * item.quantity;
                totalOgPrice = totalOgPrice + product.price * item.quantity;
                return (
                  <div
                    key={Math.random()}
                    className="flex flex-col rounded-lg bg-white sm:flex-row border shadow-xl"
                  >
                    <img
                      className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                      src={product.imageUrls[0]}
                      alt
                    />
                    <div className="flex w-full flex-col px-4 py-4">
                      <span className="font-semibold">
                        {product.name} x {item.quantity}
                      </span>
                      <span className="float-right text-gray-400 uppercase">
                        {product.color} - {item.size}
                      </span>
                      <p className="text-lg font-bold">
                        {(product.offerPrice * item.quantity).toFixed(2)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mb-6 pb-6 border-b border-gray-200">
              <div className="-mx-2 flex items-end justify-end">
                <div className="flex-grow px-2 lg:max-w-xs">
                  <label className="text-gray-600 font-semibold text-sm mb-2 ml-1">
                    Discount code
                  </label>
                  <div>
                    <input
                      className="w-full px-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:border-indigo-500 transition-colors"
                      placeholder="XXXXXX"
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      disabled={appliedCoupon}
                    />
                  </div>
                </div>
                <div className="px-2">
                  <button
                    className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold"
                    onClick={
                      appliedCoupon ? handleClearCoupon : handleApplyCoupon
                    }
                  >
                    {appliedCoupon ? "CLEAR" : "APPLY"}
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 bg-gray-50 px-4 pt-8 lg:mt-0">
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 p-3 text-gray-800 font-light mb-6">
              <div className="w-full flex mb-3 items-center">
                <div className="w-32">
                  <span className="text-gray-600 font-semibold">Contact</span>
                </div>
                <div className="flex-grow pl-3">
                  <span>Scott Windon</span>
                </div>
              </div>
              <div className="w-full flex items-center">
                <div className="w-32">
                  <span className="text-gray-600 font-semibold">
                    Billing Address
                  </span>
                </div>
                <div className="flex-grow pl-3">
                  <span>123 George Street, Sydney, NSW 2000 Australia</span>
                </div>
              </div>
            </div>
            <p className="text-xl font-medium">Shipping Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_1"
                  type="radio"
                  name="radio"
                  value={"free"}
                  defaultChecked
                  onChange={handleDeliveryCharge}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_1"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://images.unsplash.com/photo-1595174106934-2d7767a09a2f?auto=format&q=75&fit=crop&w=128"
                    alt
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Free</span>
                    <p className="text-sm leading-6 text-slate-500">
                      Regular shipping: 3-4 business days.
                    </p>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_2"
                  type="radio"
                  name="radio"
                  value={"fast"}
                  onChange={handleDeliveryCharge}
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_2"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://images.unsplash.com/photo-1595174106934-2d7767a09a2f?auto=format&q=75&fit=crop&w=128"
                    alt
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fast</span>
                    <p className="text-sm leading-6 text-slate-500">
                      Regular shipping: 1-2 business days.
                    </p>
                  </div>
                </label>
              </div>
            </form>
            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">{totalPrice.toFixed(2)}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Discount</p>
                <p className="font-semibold text-gray-900">{totalDiscount.toFixed(2)}</p>
              </div>
              <div className="py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Coupon Discount
                  </p>
                  <p className="font-semibold text-green-600">
                    {discountAmount > 0
                      ? `-${discountAmount.toFixed(2)}`
                      : "$0.00"}
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">{delivery.charge}</p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
              {(checkoutPrice = totalPrice + delivery.charge - discountAmount).toFixed(2)}
              </p>
            </div>
            <button
              className="mt-4 mb-8 w-full rounded-md bg-gray-900 hover:bg-gray-700 border border-transparent px-6 py-3 font-medium text-white"
              onClick={paymentHandler}
              disabled={loading}
            >
              {loading ? "Loading..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

{
  /* payment Methods */
}

{
  /* <p className=" my-5 text-xl font-medium">Payment Methods</p>
            <div className="w-full mx-auto rounded-lg bg-white border border-gray-200 text-gray-800 font-light mb-6">
          <div className="w-full p-3">
            <label
              htmlFor="type2"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-500"
                name="type"
                id="type2"
                checked={paymentMethod === "cod"}
                onChange={() => setPaymentMethod("cod")}
              />
              <p className="ml-2 text-gray-800 font-bold">
                Cash on Delivery
              </p>
            </label>
          </div>
          <div className="w-full p-3">
            <label
              htmlFor="type2"
              className="flex items-center cursor-pointer"
            >
              <input
                type="radio"
                className="form-radio h-5 w-5 text-indigo-500"
                name="type"
                id="type2"
                checked={paymentMethod === "razorpay"}
                onChange={() => setPaymentMethod("razorpay")}
                defaultChecked
              />
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/8/89/Razorpay_logo.svg"
                className="h-6 ml-3"
                alt="razorpay"
              />
            </label>
          </div>
        </div> */
}

{
  /* <p className="text-xl font-medium">Payment Methods</p>
            <form className="mt-5 grid gap-6">
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_3"
                  type="radio"
                  name="radio"
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_3"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://i.pinimg.com/736x/97/89/bd/9789bd10c4ecbde7b61e5f6024c408cc.jpg"
                    alt
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Cash on Delivery</span>
                  </div>
                </label>
              </div>
              <div className="relative">
                <input
                  className="peer hidden"
                  id="radio_4"
                  type="radio"
                  name="radio"
                />
                <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white" />
                <label
                  className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                  htmlFor="radio_4"
                >
                  <img
                    className="w-14 object-contain"
                    src="https://images.jdmagicbox.com/comp/hyderabad/d7/040pxx40.xx40.190619141123.i8d7/catalogue/razorpay-software-private-limited-hyderabad-corporate-companies-fdvg7wom4s.jpg"
                    alt
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Online Payment</span>
                  </div>
                </label>
              </div>
            </form> */
}
