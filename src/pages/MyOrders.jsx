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
        "https://fashionoasis-backend.onrender.com/api/v1/my-orders",
        {
          withCredentials: true,
        }
      );
      console.log("response : ", response.data.orders);
      if (response.data.success) {
        setOrderDetails(response.data.orders);
        setLodding(false);
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
        "Lodding"
      ) : (
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
                  className="mb-6 pb-6 border-b border-t rounded-md border-gray-200 shadow-xl p-5 flex flex-col items-center justify-center flex-wrap md:flex-row md:justify-between"
                >
                  <div className="mb-3">
                    <span className="text-gray-600 font-semibold">
                      Order ID:
                    </span>
                    <p className="text-blue-600">#{order.orderId}</p>
                  </div>
                  {/* <div className="mb-3">
                <span className="text-gray-600 font-semibold">Date:</span>
                {order.date}
              </div> */}
                  <div className="mb-3 flex flex-col gap">
                    <span className="text-gray-600 font-semibold my-1">
                      Order Status:
                      <span className="text-green-400 p-1 rounded capitalize">
                        {order.orderStatus}
                      </span>
                    </span>
                    <span className="text-gray-600 font-semibold my-1">
                      Payment Status:
                      <span className="text-green-400 p-1 rounded capitalize">
                        {order.paymentStatus}
                      </span>
                    </span>
                    <span className="text-gray-600 font-semibold my-1">
                      Payment Method:
                      <span className="text-yellow-400 p-1 rounded capitalize">
                        {order.paymentMethod}
                      </span>
                    </span>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-semibold">Items:</span>
                    <ul className="pl-5">
                      {order.products.map((item, index) => {
                        console.log(item)
                        let product = products.find(
                          (product) => product._id === item.product
                        ); // Find the corresponding product
                        if (!product) {
                          return null;
                        }
                        return (
                          <li key={index} className="p-1 text-rose-600">
                            {item.quantity} x {product.name} - {item.size} - $
                            {(product.offerPrice * item.quantity).toFixed(2)}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                  <div className="mb-3">
                    <span className="text-gray-600 font-semibold">Total:</span>
                   <span className="text-gray-600 text-lime-600 px-1">${order.totalAmount.toFixed(2)}</span> 
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
      )}
    </>
  );
};
