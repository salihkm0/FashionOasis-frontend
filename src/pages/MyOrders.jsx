import React from 'react';

const orders = [
  {
    id: '1',
    date: '2023-06-15',
    items: [
      { name: 'Ray Ban Sunglasses', quantity: 1, price: 210 },
    ],
    total: 210,
    status: 'Delivered',
  },
  {
    id: '2',
    date: '2023-06-20',
    items: [
      { name: 'Nike Running Shoes', quantity: 2, price: 150 },
    ],
    total: 300,
    status: 'Shipped',
  },
];

export const MyOrders = () => {
  return (
    <div className="min-w-screen min-h-screen bg-gray-50 py-5">
      <div className="px-5">
        <div className="mb-2">
          <a href="#" className="focus:outline-none hover:underline text-gray-500 text-sm">
            <i className="mdi mdi-arrow-left text-gray-400"></i> Back
          </a>
        </div>
        <div className="mb-2">
          <h1 className="text-3xl md:text-5xl font-bold text-gray-600">My Orders.</h1>
        </div>
        <div className="mb-5 text-gray-400">
          <a href="#" className="focus:outline-none hover:underline text-gray-500">Home</a> / 
          <a href="#" className="focus:outline-none hover:underline text-gray-500">Account</a> / 
          <span className="text-gray-600">Orders</span>
        </div>
      </div>
      <div className="w-full bg-white border-t border-b border-gray-200 px-5 py-10 text-gray-800">
        <div className="w-full">
          {orders.map(order => (
            <div key={order.id} className="mb-6 pb-6 border-b border-gray-200">
              <div className="mb-3">
                <span className="text-gray-600 font-semibold">Order ID:</span> {order.id}
              </div>
              <div className="mb-3">
                <span className="text-gray-600 font-semibold">Date:</span> {order.date}
              </div>
              <div className="mb-3">
                <span className="text-gray-600 font-semibold">Status:</span> {order.status}
              </div>
              <div className="mb-3">
                <span className="text-gray-600 font-semibold">Items:</span>
                <ul className="pl-5">
                  {order.items.map((item, index) => (
                    <li key={index}>
                      {item.quantity} x {item.name} - ${item.price.toFixed(2)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mb-3">
                <span className="text-gray-600 font-semibold">Total:</span> ${order.total.toFixed(2)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};


