import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const MyOrders = () => {
  const navigate = useNavigate();
  const [lodding, setLodding] = useState(false);
  const [orderDetails, setOrderDetails] = useState([]);
  const { products } = useSelector((state) => state.products);

  const fetchOrderDetails = async () => {
    setLodding(true);
    try {
      const response = await axios.get(
        "http://localhost:5555/api/v1/my-orders",
        {
          withCredentials: true,
        }
      );
      console.log("response : ", response.data.orders);
      if (response.data.success) {
        setOrderDetails(response.data.orders);
        setLodding(fasle);
      } else {
        console.log("error : ", response.data.error);
        setLodding(false);
      }
    } catch (error) {
      console.log("error : ", error);
      false;
    }
  };

  useEffect(() => {
    fetchOrderDetails();
  }, []);

  const handleOrderDetails = (id) => {
    navigate(`/user/order-summary/${id}`);
  };

  console.log(orderDetails);

  return (
    <>
      {lodding ? (
        <div className="min-w-screen min-h-screen py-5 my-5 mx-5 mt-[50px]">
          <div className="px-5 shadow-md py-2">
            <div className="mb-2">
              <h1 className="text-3xl md:text-5xl font-bold text-gray-600">
                My Orders
              </h1>
            </div>
          </div>
          <div className="w-full bg-white px-5 py-10 text-gray-800 mt-5">
            <div className="w-full">
              {orderDetails.map((order) => (
                <div
                  key={order.orderId}
                  className="mb-6 pb-6 border-b border-t rounded-md border-gray-200 shadow-xl p-5 flex items-center justify-between flex-wrap"
                >
                  <div className="mb-3">
                    <span className="text-gray-600 font-semibold">
                      Order ID:
                    </span>
                    {order.orderId}
                  </div>
                  {/* <div className="mb-3">
                <span className="text-gray-600 font-semibold">Date:</span>
                {order.date}
              </div> */}
                  <div className="mb-3 flex flex-col gap">
                    <span className="text-gray-600 font-semibold">
                      Order Status: {order.orderStatus}
                    </span>
                    <span className="text-gray-600 font-semibold">
                      Payment Status: {order.paymentStatus}
                    </span>
                    <span className="text-gray-600 font-semibold ">
                      Payment Method: {order.paymentMethod}
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-semibold">Items:</span>
                    <ul className="pl-5">
                      {order.products.map((item, index) => {
                        let product = products.find(
                          (product) => product._id === item.product
                        ); // Find the corresponding product
                        if (!product) {
                          return null;
                        }
                        return (
                          <li key={index}>
                            {item.quantity} x {product.name} - $
                            {(product.offerPrice * item.quantity).toFixed(2)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-semibold">Total:</span>{" "}
                    ${order.totalAmount.toFixed(2)}
                  </div>
                  <div>
                    <button
                      className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
                      onClick={() => handleOrderDetails(order._id)}
                    >
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        "Lodding"
      )}
    </>
  );
};
