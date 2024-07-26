import React, { useState } from "react";

export const CheckoutPage = () => {
  const [delivery, setDelivery] = useState({
    type: "",
    charge: 0,
  });

  const handleDeliveryCharge = (e) => {
    setDelivery({
      ...delivery,
      type: e.target.value,
      charge: e.target.value === "fast" ? 10 : 0,
    });
  };

  const [paymentMethod, setPaymentMethod] = useState("razorpay");

  console.log(delivery.type, delivery.charge);
  return (
    <>
      <div>
        <div className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32">
          <div className="px-4 pt-8">
            <p className="text-xl font-medium">Order Summary</p>
            <p className="text-gray-400">
              Check your items. And select a suitable shipping method.
            </p>
            <div className="mt-8 mb-5 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/flagged/photo-1556637640-2c80d3201be8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    Nike Air Max Pro 8888 - Super Light
                  </span>
                  <span className="float-right text-gray-400">
                    42EU - 8.5US
                  </span>
                  <p className="text-lg font-bold">$138.99</p>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    Nike Air Max Pro 8888 - Super Light
                  </span>
                  <span className="float-right text-gray-400">
                    42EU - 8.5US
                  </span>
                  <p className="mt-auto text-lg font-bold">$238.99</p>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    Nike Air Max Pro 8888 - Super Light
                  </span>
                  <span className="float-right text-gray-400">
                    42EU - 8.5US
                  </span>
                  <p className="mt-auto text-lg font-bold">$238.99</p>
                </div>
              </div>
              <div className="flex flex-col rounded-lg bg-white sm:flex-row">
                <img
                  className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8OHx8c25lYWtlcnxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60"
                  alt
                />
                <div className="flex w-full flex-col px-4 py-4">
                  <span className="font-semibold">
                    Nike Air Max Pro 8888 - Super Light
                  </span>
                  <span className="float-right text-gray-400">
                    42EU - 8.5US
                  </span>
                  <p className="mt-auto text-lg font-bold">$238.99</p>
                </div>
              </div>
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
                    />
                  </div>
                </div>
                <div className="px-2">
                  <button className="block w-full max-w-xs mx-auto border border-transparent bg-gray-400 hover:bg-gray-500 focus:bg-gray-500 text-white rounded-md px-5 py-2 font-semibold">
                    APPLY
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
                    src="https://png.pngtree.com/png-clipart/20230120/ourmid/pngtree-free-delivery-truck-icon-png-image_6565580.png"
                    alt
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Free Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 5-7 Days
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
                    src="https://t3.ftcdn.net/jpg/04/73/02/64/360_F_473026422_k3XjtqTh0Br3Iw8IfhlB9c72n9dqi9n5.jpg"
                    alt
                  />
                  <div className="ml-5">
                    <span className="mt-2 font-semibold">Fast Delivery</span>
                    <p className="text-slate-500 text-sm leading-6">
                      Delivery: 2-4 Days
                    </p>
                  </div>
                </label>
              </div>
            </form>

            {/* payment Methods */}

            {/* <p className=" my-5 text-xl font-medium">Payment Methods</p>
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
        </div> */}

            <div className>
              <div className="mt-6 border-t border-b py-2">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Subtotal</p>
                  <p className="font-semibold text-gray-900">$399.00</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">Shipping</p>
                  <p className="font-semibold text-gray-900">
                    ${delivery.charge}
                  </p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Discount Coupon
                  </p>
                  <p className="font-semibold text-gray-900">$25</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-gray-900">
                    Total Discount
                  </p>
                  <p className="font-semibold text-gray-900">$49</p>
                </div>
              </div>
              <div className="mt-6 flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Total</p>
                <p className="text-2xl font-semibold text-gray-900">$408.00</p>
              </div>
            </div>
            {/* <p className="text-xl font-medium">Payment Methods</p>
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
            </form> */}
            <button className="mt-4 mb-8 w-full rounded-md bg-green-500 hover:bg-green-700 px-6 py-3 font-medium text-white">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

